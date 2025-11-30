import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: files, error } = await supabase
      .from('files')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ files: files || [] });
  } catch (error) {
    console.error('Error fetching public files:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}
