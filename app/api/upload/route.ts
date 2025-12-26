import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTokenBalance, getTierFromBalance, getStorageLimits } from '@/lib/solana';
import { v4 as uuidv4 } from 'uuid';

// Anonymous user storage limits
const ANON_LIMITS = {
  perFile: 50 * 1024 * 1024, // 50MB
  total: 200 * 1024 * 1024,  // 200MB
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const walletAddress = formData.get('walletAddress') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let user = null;
    let tier: 'free' | 'holder' | 'whale' = 'free';
    let limits = ANON_LIMITS;
    let ownerIdentifier: string;

    if (walletAddress) {
      // Wallet connected - use wallet-based storage
      ownerIdentifier = walletAddress;

      // Get or create user
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (!existingUser) {
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert({ wallet_address: walletAddress, total_storage_used: 0, tier: 'free' })
          .select()
          .single();

        if (userError) throw userError;
        user = newUser;
      } else {
        user = existingUser;
      }

      // Check token balance and determine tier
      const tokenMint = process.env.NEXT_PUBLIC_FILE_TOKEN_MINT || '';
      const balance = tokenMint ? await getTokenBalance(walletAddress, tokenMint) : 0;
      tier = getTierFromBalance(balance);
      limits = getStorageLimits(tier);

      // Check total storage limit for wallet users
      if (user.total_storage_used + file.size > limits.total) {
        return NextResponse.json(
          { error: `Storage limit exceeded. Hold more $FILE tokens to upgrade.` },
          { status: 400 }
        );
      }
    } else {
      // Anonymous upload - generate a unique identifier
      ownerIdentifier = `anon_${uuidv4()}`;
    }

    // Check file size limits
    if (file.size > limits.perFile) {
      const maxMB = limits.perFile / (1024 * 1024);
      return NextResponse.json(
        { error: `File too large. Max size: ${maxMB}MB. Connect wallet for larger uploads.` },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop() || 'bin';
    const fileName = `${ownerIdentifier}/${Date.now()}_${uuidv4().slice(0, 8)}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, fileBuffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage.from('files').getPublicUrl(fileName);

    // Save file metadata to database
    const { data: fileRecord, error: fileError } = await supabase
      .from('files')
      .insert({
        owner_wallet: walletAddress || ownerIdentifier,
        original_filename: file.name,
        size_bytes: file.size,
        storage_provider: 'supabase',
        url: urlData.publicUrl,
        is_public: !walletAddress, // Anonymous uploads are public by default
      })
      .select()
      .single();

    if (fileError) throw fileError;

    // Update user's total storage used (only for wallet users)
    if (walletAddress && user) {
      await supabase
        .from('users')
        .update({
          total_storage_used: user.total_storage_used + file.size,
          tier: tier,
        })
        .eq('wallet_address', walletAddress);
    }

    return NextResponse.json({
      id: fileRecord.id,
      url: urlData.publicUrl,
      message: 'File uploaded successfully',
      isAnonymous: !walletAddress,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
