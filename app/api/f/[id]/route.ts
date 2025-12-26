import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to find by short_id first
    let { data: file, error } = await supabase
      .from('files')
      .select('*')
      .eq('short_id', params.id)
      .single();

    // If not found by short_id, try by regular id (for backwards compatibility)
    if (!file) {
      const result = await supabase
        .from('files')
        .select('*')
        .eq('id', params.id)
        .single();
      
      file = result.data;
      error = result.error;
    }

    if (error || !file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
