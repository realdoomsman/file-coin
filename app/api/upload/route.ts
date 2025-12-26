import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Storage limits
const LIMITS = {
  perFile: 50 * 1024 * 1024, // 50MB
  onchainPerFile: 1 * 1024 * 1024, // 1MB for on-chain (expensive)
};

// Generate a short, URL-friendly ID
function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const storageType = formData.get('storageType') as string || 'cloud';
    const txSignature = formData.get('txSignature') as string | null;
    const paymentId = formData.get('paymentId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size based on storage type
    const maxSize = storageType === 'onchain' ? LIMITS.onchainPerFile : LIMITS.perFile;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `File too large. Max size for ${storageType}: ${maxMB}MB` },
        { status: 400 }
      );
    }

    // For on-chain storage, verify payment was made
    if (storageType === 'onchain') {
      if (!txSignature) {
        return NextResponse.json(
          { error: 'Payment required for on-chain storage' },
          { status: 400 }
        );
      }
      // In production, you'd verify the transaction signature here
    }

    // Generate short ID for the file
    const shortId = generateShortId();

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop() || 'bin';
    const fileName = `public/${shortId}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, fileBuffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('files').getPublicUrl(fileName);

    // Save file metadata to database
    const { data: fileRecord, error: fileError } = await supabase
      .from('files')
      .insert({
        owner_wallet: 'anonymous',
        original_filename: file.name,
        size_bytes: file.size,
        storage_provider: storageType === 'onchain' ? 'solana' : 'supabase',
        url: urlData.publicUrl,
        is_public: true,
        short_id: shortId,
        tx_signature: txSignature || null,
      })
      .select()
      .single();

    if (fileError) {
      console.error('Database insert error:', fileError);
      return NextResponse.json({ error: `Database error: ${fileError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      id: fileRecord.id,
      shortId: shortId,
      url: urlData.publicUrl,
      message: 'File uploaded successfully',
      storageType,
      txSignature: txSignature || null,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
