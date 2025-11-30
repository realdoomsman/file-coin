import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, isPublic, walletAddress } = body;

    if (!fileId || typeof isPublic !== 'boolean' || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify ownership
    const { data: file } = await supabase
      .from('files')
      .select('owner_wallet')
      .eq('id', fileId)
      .single();

    if (!file || file.owner_wallet !== walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update visibility
    const { error } = await supabase
      .from('files')
      .update({ is_public: isPublic })
      .eq('id', fileId);

    if (error) throw error;

    return NextResponse.json({ message: 'File visibility updated' });
  } catch (error) {
    console.error('Error updating file:', error);
    const message = error instanceof Error ? error.message : 'Failed to update file';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
