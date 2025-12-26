import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Storage limits for anonymous users
const LIMITS = {
  perFile: 50 * 1024 * 1024, // 50MB
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

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size
    if (file.size > LIMITS.perFile) {
      return NextResponse.json(
        { error: 'File too large. Max size: 50MB' },
        { status: 400 }
      );
    }

    // On-chain storage coming soon
    if (storageType === 'onchain') {
      return NextResponse.json(
        { error: 'On-chain storage coming soon' },
        { status: 400 }
      );
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
        storage_provider: 'supabase',
        url: urlData.publicUrl,
        is_public: true,
        short_id: shortId,
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
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
