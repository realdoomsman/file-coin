import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: file, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get file info
    const { data: file } = await supabase
      .from('files')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete from storage
    const fileName = file.url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('files').remove([`${file.owner_wallet}/${fileName}`]);
    }

    // Delete from database
    await supabase.from('files').delete().eq('id', params.id);

    // Update user's storage usage
    const { data: user } = await supabase
      .from('users')
      .select('total_storage_used')
      .eq('wallet_address', file.owner_wallet)
      .single();

    if (user) {
      await supabase
        .from('users')
        .update({ total_storage_used: Math.max(0, user.total_storage_used - file.size_bytes) })
        .eq('wallet_address', file.owner_wallet);
    }

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
