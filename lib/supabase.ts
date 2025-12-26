import { createClient } from '@supabase/supabase-js';

// Use placeholder values if env vars not set (for build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON && process.env.NEXT_PUBLIC_SUPABASE_ANON !== 'your_supabase_anon_key_here'
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.M9FigBNGRnmRxWP4KhfJWpSjnBohzVPH_vR6Yt8ZR3g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  wallet_address: string;
  created_at: string;
  total_storage_used: number;
  tier: 'free' | 'holder' | 'whale';
};

export type FileRecord = {
  id: string;
  owner_wallet: string;
  original_filename: string;
  size_bytes: number;
  storage_provider: 'supabase' | 'ipfs';
  url: string;
  cid?: string;
  is_public: boolean;
  created_at: string;
};
