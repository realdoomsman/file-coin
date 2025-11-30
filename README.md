# 💾 File Coin

**The Dumbest Storage Network That Accidentally Works.**

Inspired by the 3 hidden Filecoin references inside the Solana whitepaper. Real file storage on Solana.

## Features

- 🔐 Solana wallet authentication (Phantom, Backpack, Solflare)
- 📁 File upload and storage via Supabase
- 🔒 Public/private file visibility controls
- 💾 Storage tiers based on $FILE token holdings
- 🌐 Public file explorer
- 📊 Real-time storage usage tracking
- 🔗 Direct file URLs for sharing

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Wallet**: Solana Wallet Adapter
- **Backend**: Next.js API Routes
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Blockchain**: Solana (for token balance checks)

## Setup Instructions

### 1. Clone and Install

```bash
cd file-coin
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your URL and anon key
3. Run the SQL schema (see below)
4. Create a storage bucket named `files` and make it public

### 3. Configure Environment Variables

Copy `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Solana RPC
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# File Coin Token (replace with your SPL token mint address)
NEXT_PUBLIC_FILE_TOKEN_MINT=YourTokenMintAddressHere

# Storage Tiers (in tokens)
HOLDER_TIER_MIN=1000
WHALE_TIER_MIN=10000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  total_storage_used BIGINT DEFAULT 0,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'holder', 'whale'))
);

-- Files table
CREATE TABLE files (
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
CREATE INDEX idx_files_owner ON files(owner_wallet);
CREATE INDEX idx_files_public ON files(is_public);
CREATE INDEX idx_files_created ON files(created_at DESC);
```

### Supabase Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `files`
3. Make it public (or configure RLS policies as needed)

## Storage Tiers

| Tier | Requirements | Total Storage | Max File Size |
|------|-------------|---------------|---------------|
| Free | None | 200MB | 50MB |
| Holder | Hold $FILE tokens | 1GB | 200MB |
| Whale | Hold more $FILE | 5GB | 500MB |

## Routes

- `/` - Landing page
- `/lore` - The story behind File Coin
- `/docs` - Documentation
- `/app` - Dashboard (wallet required)
- `/upload` - Upload files (wallet required)
- `/file/[id]` - File detail page
- `/explorer` - Browse public files
- `/settings` - User settings (wallet required)

## API Endpoints

- `POST /api/upload` - Upload a file
- `GET /api/files?wallet=<address>` - Get user's files
- `GET /api/file/[id]` - Get file details
- `DELETE /api/file/[id]` - Delete a file
- `POST /api/update-public` - Toggle file visibility
- `GET /api/explorer` - Get public files

## Deployment

### Deploy to Vercel

```bash
npm run build
vercel deploy
```

Make sure to add all environment variables in your Vercel project settings.

## The Lore

Filecoin is mentioned exactly **3 times** in the Solana whitepaper. Most people missed it. But those who paid attention realized Anatoly Yakovenko was thinking about decentralized storage from day one.

Years later, Toly tweeted a single word: **"filecoin"**

No context. No explanation. Just the word.

File Coin is a tribute to that forgotten reference. A meme that became real. A joke that actually works.

## License

MIT

---

Built on Solana. Inspired by memes. Actually works.

💾 File Coin 2024
