# 💾 File Coin - Quick Start

Get File Coin running in 5 minutes!

## 1. Install Dependencies
```bash
cd file-coin
npm install
```

## 2. Set Up Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Settings → API

### Run SQL Schema
1. Go to SQL Editor
2. Copy/paste contents of `supabase-schema.sql`
3. Click Run

### Create Storage Bucket
1. Go to Storage → New Bucket
2. Name: `files`
3. Make it **Public**

## 3. Configure Environment
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_FILE_TOKEN_MINT=
```

## 4. Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Test It
1. Click "Launch App"
2. Connect your Solana wallet
3. Upload a test file
4. View it in your dashboard

## That's It! 🎉

### Next Steps
- Read [SETUP.md](./SETUP.md) for detailed instructions
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) to go live
- Customize the branding and add your token

### Common Issues

**"Failed to fetch"**
→ Check Supabase URL and key in `.env.local`

**"Storage bucket not found"**
→ Create the `files` bucket in Supabase Storage

**Wallet won't connect**
→ Install Phantom, Backpack, or Solflare extension

### File Structure
```
file-coin/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── lore/              # Lore page
│   ├── docs/              # Documentation
│   ├── app/               # Dashboard
│   ├── upload/            # Upload page
│   ├── file/[id]/         # File detail
│   ├── explorer/          # Public files
│   ├── settings/          # User settings
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── solana.ts         # Solana utilities
│   └── utils.ts          # Helper functions
└── .env.local            # Environment variables
```

### Key Features
✅ Wallet authentication
✅ File upload/download
✅ Public/private files
✅ Storage tiers
✅ Token gating
✅ File explorer
✅ Dark mode UI

### Storage Tiers
- **Free**: 200MB total, 50MB per file
- **Holder**: 1GB total, 200MB per file (hold $FILE)
- **Whale**: 5GB total, 500MB per file (hold more $FILE)

### Tech Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Solana Wallet Adapter
- Supabase (DB + Storage)
- Solana Web3.js

---

Need help? Check the full [README.md](./README.md) or [SETUP.md](./SETUP.md)
