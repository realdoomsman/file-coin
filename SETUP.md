# File Coin Setup Guide

Complete step-by-step guide to get File Coin running.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Solana wallet (Phantom, Backpack, or Solflare)
- (Optional) A Helius or QuickNode RPC endpoint for better performance

## Step 1: Install Dependencies

```bash
cd file-coin
npm install
```

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose a name (e.g., "file-coin")
4. Set a strong database password
5. Choose a region close to you
6. Wait for the project to be created (~2 minutes)

### 2.2 Get Your API Credentials

1. Go to Project Settings (gear icon)
2. Click "API" in the sidebar
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 2.3 Run the Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Click "New Query"
3. Copy the contents of `supabase-schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### 2.4 Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Click "New Bucket"
3. Name it: `files`
4. Make it **Public** (or configure RLS policies)
5. Click "Create Bucket"

## Step 3: Environment Variables

1. Copy the `.env.local` file (it's already created)
2. Fill in your values:

```env
# From Supabase (Step 2.2)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here

# Solana RPC (use default or your own)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Your $FILE SPL Token Mint Address
# If you don't have a token yet, leave this empty - the app will work without token gating
NEXT_PUBLIC_FILE_TOKEN_MINT=

# Storage tier thresholds (in tokens)
HOLDER_TIER_MIN=1000
WHALE_TIER_MIN=10000
```

### Getting a Better RPC (Optional)

For production, use a dedicated RPC:

**Helius** (recommended):
1. Sign up at [helius.dev](https://helius.dev)
2. Create an API key
3. Use: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`

**QuickNode**:
1. Sign up at [quicknode.com](https://quicknode.com)
2. Create a Solana endpoint
3. Copy the HTTP URL

## Step 4: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test the App

1. **Connect Wallet**: Click "Select Wallet" in the top right
2. **Go to Dashboard**: Click "Launch App" or navigate to `/app`
3. **Upload a File**: Click "Upload File" and select a test file
4. **View Your File**: You should see it in your dashboard
5. **Make it Public**: Click on the file, then "Make Public"
6. **Check Explorer**: Go to `/explorer` to see your public file

## Troubleshooting

### "Failed to fetch" errors

- Check that your Supabase URL and key are correct
- Make sure the `files` storage bucket exists and is public
- Check browser console for detailed errors

### "Storage limit exceeded"

- Default free tier is 200MB total
- Check your storage usage in the dashboard
- Delete old files or upgrade tier by holding tokens

### Wallet won't connect

- Make sure you have a Solana wallet extension installed
- Try refreshing the page
- Check that you're on the correct network (mainnet)

### Files won't upload

- Check file size (max 50MB for free tier)
- Verify Supabase storage bucket is created
- Check browser console for errors
- Make sure RLS policies allow inserts (or disable RLS for testing)

### Token balance not detected

- Verify `NEXT_PUBLIC_FILE_TOKEN_MINT` is set correctly
- Check that your RPC endpoint is working
- Token balance is checked on wallet connect

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add all environment variables from `.env.local`
6. Click "Deploy"

### Environment Variables for Production

Make sure to add these in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `NEXT_PUBLIC_FILE_TOKEN_MINT`
- `HOLDER_TIER_MIN`
- `WHALE_TIER_MIN`

## Creating Your $FILE Token (Optional)

If you want to create an actual SPL token:

1. Use [Solana Token Creator](https://www.solana-token-creator.com/)
2. Or use the Solana CLI:
   ```bash
   spl-token create-token
   spl-token create-account <TOKEN_ADDRESS>
   spl-token mint <TOKEN_ADDRESS> <AMOUNT>
   ```
3. Copy the token mint address
4. Add it to `NEXT_PUBLIC_FILE_TOKEN_MINT`

## Next Steps

- Customize the branding and colors
- Add your own token mint address
- Configure storage tier thresholds
- Add custom domain in Vercel
- Set up analytics
- Add more features (IPFS, batch upload, etc.)

## Support

- Check the [README.md](./README.md) for more info
- Read the [/docs](http://localhost:3000/docs) page
- Check Supabase logs for backend errors
- Check browser console for frontend errors

---

Need help? The app is fully functional out of the box - just follow these steps!
