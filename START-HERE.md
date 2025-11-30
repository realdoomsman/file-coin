# 💾 FILE COIN - START HERE

Welcome to File Coin! This is your complete guide to getting started.

## 🎯 What is File Coin?

File Coin is a **fully functional** file storage and sharing platform built on Solana. It's inspired by the 3 Filecoin references in the Solana whitepaper. The branding is meme-like and fun, but the app actually works as a real storage platform.

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
- Create account at [supabase.com](https://supabase.com)
- Create new project
- Run the SQL from `supabase-schema.sql` in SQL Editor
- Create storage bucket named `files` (make it public)
- Get your URL and anon key from Settings → API

### 3. Configure Environment
Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test It
- Click "Launch App"
- Connect your Solana wallet (Phantom, Backpack, or Solflare)
- Upload a test file
- View it in your dashboard

## 📚 Documentation

Choose your path:

### For Quick Setup
→ **[QUICK-START.md](./QUICK-START.md)** - Get running in 5 minutes

### For Detailed Setup
→ **[SETUP.md](./SETUP.md)** - Complete step-by-step guide

### For Deployment
→ **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production

### For Troubleshooting
→ **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Fix common issues

### For Project Overview
→ **[README.md](./README.md)** - Full project documentation
→ **[PROJECT-CHECKLIST.md](./PROJECT-CHECKLIST.md)** - What's included

## 🎨 What's Included

### Pages (All Working)
- `/` - Landing page
- `/lore` - The story behind File Coin
- `/docs` - Documentation
- `/app` - User dashboard
- `/upload` - File upload
- `/file/[id]` - File details
- `/explorer` - Public files
- `/settings` - User settings

### Features (All Functional)
✅ Solana wallet authentication
✅ File upload/download
✅ Public/private files
✅ Storage tiers (Free, Holder, Whale)
✅ Token gating with $FILE
✅ File explorer
✅ Dark mode UI
✅ Responsive design

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Solana Wallet Adapter
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage

## 💾 Storage Tiers

| Tier | Requirements | Total Storage | Max File Size |
|------|-------------|---------------|---------------|
| **Free** | None | 200MB | 50MB |
| **Holder** | Hold $FILE tokens | 1GB | 200MB |
| **Whale** | Hold more $FILE | 5GB | 500MB |

## 🔧 Project Structure

```
file-coin/
├── app/                    # Next.js pages & API routes
│   ├── page.tsx           # Landing page
│   ├── lore/              # Lore page
│   ├── docs/              # Documentation
│   ├── app/               # Dashboard
│   ├── upload/            # Upload page
│   ├── file/[id]/         # File detail
│   ├── explorer/          # Public files
│   ├── settings/          # Settings
│   └── api/               # API routes
│       ├── upload/        # File upload
│       ├── files/         # Get files
│       ├── file/[id]/     # File operations
│       ├── update-public/ # Toggle visibility
│       └── explorer/      # Public files
├── components/            # React components
│   ├── Navbar.tsx        # Navigation
│   └── WalletProvider.tsx # Wallet integration
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── solana.ts         # Solana utilities
│   └── utils.ts          # Helper functions
├── .env.local            # Environment variables
└── supabase-schema.sql   # Database schema
```

## 📋 Before You Start

Make sure you have:
- [ ] Node.js 18+ installed
- [ ] A Solana wallet extension (Phantom, Backpack, or Solflare)
- [ ] A Supabase account (free tier works)
- [ ] 10 minutes to set up

## 🎯 Next Steps

1. **Set up Supabase** (5 minutes)
   - Follow [SETUP.md](./SETUP.md) for detailed instructions

2. **Configure environment variables**
   - Edit `.env.local` with your credentials

3. **Run the app**
   - `npm run dev`

4. **Test all features**
   - Connect wallet
   - Upload file
   - Make it public
   - View in explorer

5. **Deploy to production** (optional)
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🐛 Having Issues?

Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions to common problems.

Most issues are solved by:
1. Verifying Supabase credentials
2. Checking environment variables
3. Restarting dev server
4. Clearing browser cache

## 💡 Tips

- **Start simple**: Use the free tier first, add token gating later
- **Test locally**: Make sure everything works before deploying
- **Read the docs**: Each page has inline comments explaining the code
- **Check console**: Browser console shows helpful error messages

## 🎉 You're Ready!

This is a **complete, production-ready application**. Everything works out of the box. Just:

1. Set up Supabase
2. Configure `.env.local`
3. Run `npm run dev`
4. Start uploading files!

## 📞 Need Help?

- Check browser console for errors
- Review Supabase logs
- Read [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Verify all setup steps in [SETUP.md](./SETUP.md)

---

**Ready to build?** Start with [QUICK-START.md](./QUICK-START.md) →

Built with ❤️ for the Solana community
💾 File Coin - The storage network that shouldn't exist, but does.
