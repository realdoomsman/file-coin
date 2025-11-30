# File Coin Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase project set up (see SETUP.md)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - File Coin"
   git branch -M main
   git remote add origin https://github.com/yourusername/file-coin.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   
   In Vercel project settings, add these:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   NEXT_PUBLIC_FILE_TOKEN_MINT=YourTokenMintAddress
   HOLDER_TIER_MIN=1000
   WHALE_TIER_MIN=10000
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Alternative: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repo

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables in Site Settings

## Self-Hosting (VPS/Docker)

### Using Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t file-coin .
   docker run -p 3000:3000 --env-file .env.local file-coin
   ```

### Using PM2 (Node.js Process Manager)

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Build the app**
   ```bash
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "file-coin" -- start
   pm2 save
   pm2 startup
   ```

## Production Checklist

### Security
- [ ] Enable Supabase RLS policies
- [ ] Use environment variables for all secrets
- [ ] Set up CORS policies in Supabase
- [ ] Use a dedicated RPC endpoint (Helius/QuickNode)
- [ ] Enable rate limiting on API routes

### Performance
- [ ] Use a CDN (Vercel Edge Network or Cloudflare)
- [ ] Enable Next.js image optimization
- [ ] Set up caching headers
- [ ] Monitor with Vercel Analytics or similar

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor Supabase usage
- [ ] Track RPC request limits
- [ ] Set up uptime monitoring

### SEO
- [ ] Add proper meta tags (already included)
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics
- [ ] Add Open Graph images

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Yes | Solana RPC endpoint |
| `NEXT_PUBLIC_FILE_TOKEN_MINT` | No | $FILE token mint address |
| `HOLDER_TIER_MIN` | No | Min tokens for holder tier (default: 1000) |
| `WHALE_TIER_MIN` | No | Min tokens for whale tier (default: 10000) |

## Post-Deployment

1. **Test all features**
   - Wallet connection
   - File upload
   - File download
   - Public/private toggle
   - Explorer page

2. **Monitor logs**
   - Check Vercel logs for errors
   - Monitor Supabase logs
   - Watch RPC usage

3. **Set up analytics**
   - Vercel Analytics
   - Google Analytics
   - Supabase Analytics

## Troubleshooting

### Build fails
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### API routes not working
- Verify environment variables are set
- Check Supabase connection
- Review API route logs

### Wallet connection issues
- Ensure HTTPS in production
- Check wallet adapter configuration
- Verify RPC endpoint is accessible

## Scaling Considerations

### When you grow
- Upgrade Supabase plan for more storage
- Use dedicated RPC with higher limits
- Consider IPFS for file storage
- Implement caching layer (Redis)
- Add CDN for file delivery

### Cost estimates (monthly)
- Supabase Free: $0 (500MB storage, 2GB bandwidth)
- Supabase Pro: $25 (8GB storage, 50GB bandwidth)
- Vercel Hobby: $0 (100GB bandwidth)
- Vercel Pro: $20 (1TB bandwidth)
- Helius Free: $0 (limited requests)
- Helius Developer: $49 (higher limits)

## Support

For deployment issues:
1. Check Vercel/Netlify logs
2. Review Supabase logs
3. Test locally first
4. Check environment variables

---

Your File Coin app is production-ready! 🚀
