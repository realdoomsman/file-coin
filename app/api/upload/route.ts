import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTokenBalance, getTierFromBalance, getStorageLimits } from '@/lib/solana';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const walletAddress = formData.get('walletAddress') as string;

    if (!file || !walletAddress) {
      return NextResponse.json({ error: 'Missing file or wallet address' }, { status: 400 });
    }

    // Get or create user
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({ wallet_address: walletAddress, total_storage_used: 0, tier: 'free' })
        .select()
        .single();

      if (userError) throw userError;
      user = newUser;
    }

    // Check token balance and determine tier
    const tokenMint = process.env.NEXT_PUBLIC_FILE_TOKEN_MINT || '';
    const balance = tokenMint ? await getTokenBalance(walletAddress, tokenMint) : 0;
    const tier = getTierFromBalance(balance);
    const limits = getStorageLimits(tier);

    // Check file size limits
    if (file.size > limits.perFile) {
      return NextResponse.json(
        { error: `File too large. Max size for ${tier} tier: ${limits.perFile / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Check total storage limit
    if (user.total_storage_used + file.size > limits.total) {
      return NextResponse.json(
        { error: `Storage limit exceeded. Upgrade your tier by holding more $FILE tokens.` },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${walletAddress}/${Date.now()}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage.from('files').getPublicUrl(fileName);

    // Save file metadata to database
    const { data: fileRecord, error: fileError } = await supabase
      .from('files')
      .insert({
        owner_wallet: walletAddress,
        original_filename: file.name,
        size_bytes: file.size,
        storage_provider: 'supabase',
        url: urlData.publicUrl,
        is_public: false,
      })
      .select()
      .single();

    if (fileError) throw fileError;

    // Update user's total storage used
    await supabase
      .from('users')
      .update({
        total_storage_used: user.total_storage_used + file.size,
        tier: tier,
      })
      .eq('wallet_address', walletAddress);

    return NextResponse.json({
      id: fileRecord.id,
      url: urlData.publicUrl,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
