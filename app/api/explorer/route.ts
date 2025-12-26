import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON) {
      return NextResponse.json({ files: [], message: 'Database not configured' });
    }

    const { data: files, error } = await supabase
      .from('files')
      .select('*')
      .eq('is_public', true)
      .neq('original_filename', 'audio_2025-12-23_17-24-38.ogg')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ files: [], error: error.message });
    }

    return NextResponse.json({ files: files || [] });
  } catch (error) {
    console.error('Error fetching public files:', error);
    return NextResponse.json({ files: [], error: 'Failed to fetch files' });
  }
}
