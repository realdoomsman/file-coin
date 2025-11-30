-- File Coin Database Schema
-- Run this in your Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  total_storage_used BIGINT DEFAULT 0,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'holder', 'whale'))
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_wallet TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  storage_provider TEXT DEFAULT 'supabase' CHECK (storage_provider IN ('supabase', 'ipfs')),
  url TEXT NOT NULL,
  cid TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (owner_wallet) REFERENCES users(wallet_address) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_files_owner ON files(owner_wallet);
CREATE INDEX IF NOT EXISTS idx_files_public ON files(is_public);
CREATE INDEX IF NOT EXISTS idx_files_created ON files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- RLS Policies (optional - adjust based on your security needs)
-- Allow users to read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (true);

-- Allow users to view their own files
CREATE POLICY "Users can view own files" ON files
  FOR SELECT USING (true);

-- Allow users to insert their own files
CREATE POLICY "Users can insert own files" ON files
  FOR INSERT WITH CHECK (true);

-- Allow users to update their own files
CREATE POLICY "Users can update own files" ON files
  FOR UPDATE USING (true);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files" ON files
  FOR DELETE USING (true);

-- Comments for documentation
COMMENT ON TABLE users IS 'Stores user wallet addresses and storage usage';
COMMENT ON TABLE files IS 'Stores file metadata and references';
COMMENT ON COLUMN users.tier IS 'Storage tier: free, holder, or whale';
COMMENT ON COLUMN files.storage_provider IS 'Where the file is stored: supabase or ipfs';
COMMENT ON COLUMN files.is_public IS 'Whether the file is publicly visible in explorer';
