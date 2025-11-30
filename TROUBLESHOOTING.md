# 🔧 File Coin Troubleshooting Guide

Common issues and how to fix them.

## Installation Issues

### "npm install" fails
**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use yarn
yarn install
```

### TypeScript errors during build
**Problem**: Type errors prevent compilation

**Solutions**:
- Check Node.js version: `node -v` (need 18+)
- Update TypeScript: `npm install typescript@latest`
- Clear `.next` folder: `rm -rf .next`

## Supabase Issues

### "Failed to fetch" or "Network error"
**Problem**: Can't connect to Supabase

**Check**:
1. Is `NEXT_PUBLIC_SUPABASE_URL` correct?
2. Is `NEXT_PUBLIC_SUPABASE_ANON_KEY` correct?
3. Is your Supabase project active?
4. Check browser console for exact error

**Fix**:
```bash
# Verify environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL

# Restart dev server
npm run dev
```

### "Storage bucket not found"
**Problem**: Files bucket doesn't exist

**Fix**:
1. Go to Supabase Dashboard → Storage
2. Click "New Bucket"
3. Name: `files`
4. Make it **Public**
5. Click "Create"

### "Row Level Security policy violation"
**Problem**: RLS is blocking operations

**Fix Option 1** (Quick - for development):
```sql
-- Disable RLS temporarily
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE files DISABLE ROW LEVEL SECURITY;
```

**Fix Option 2** (Proper - for production):
```sql
-- Create proper policies
CREATE POLICY "Allow all operations" ON files
  FOR ALL USING (true) WITH CHECK (true);
```

### Database tables don't exist
**Problem**: Schema not created

**Fix**:
1. Go to Supabase SQL Editor
2. Copy contents of `supabase-schema.sql`
3. Paste and click "Run"
4. Should see "Success. No rows returned"

## Wallet Connection Issues

### Wallet button doesn't appear
**Problem**: Wallet adapter not loading

**Check**:
- Is wallet extension installed? (Phantom, Backpack, Solflare)
- Check browser console for errors
- Try different browser

**Fix**:
```bash
# Reinstall wallet adapter
npm uninstall @solana/wallet-adapter-react @solana/wallet-adapter-react-ui
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui
```

### "Wallet not found" error
**Problem**: No wallet extension detected

**Fix**:
1. Install a Solana wallet:
   - [Phantom](https://phantom.app/)
   - [Backpack](https://backpack.app/)
   - [Solflare](https://solflare.com/)
2. Refresh the page
3. Click "Select Wallet"

### Wallet connects but nothing happens
**Problem**: User not created in database

**Check**:
1. Open browser console
2. Look for API errors
3. Check Supabase logs

**Fix**:
- Verify database schema is correct
- Check RLS policies
- Try disconnecting and reconnecting

## File Upload Issues

### "File too large" error
**Problem**: File exceeds tier limit

**Limits**:
- Free: 50MB per file
- Holder: 200MB per file
- Whale: 500MB per file

**Fix**:
- Compress the file
- Hold $FILE tokens to upgrade tier
- Split into smaller files

### "Storage limit exceeded"
**Problem**: Total storage used up

**Fix**:
1. Delete old files from dashboard
2. Hold $FILE tokens to upgrade tier
3. Check storage usage in dashboard

### Upload hangs or fails
**Problem**: Upload doesn't complete

**Check**:
1. File size (must be under limit)
2. Internet connection
3. Supabase storage bucket exists
4. Browser console for errors

**Fix**:
```bash
# Check Supabase storage bucket
# Go to Supabase → Storage → files bucket should exist

# Try smaller file first
# Test with a 1MB file
```

### "Upload failed" with no error
**Problem**: Generic upload failure

**Debug**:
1. Open browser DevTools → Network tab
2. Try upload again
3. Look for failed request
4. Check response for error message

**Common causes**:
- Supabase storage bucket not public
- File name has special characters
- CORS issue (check Supabase settings)

## Token Balance Issues

### Token balance not detected
**Problem**: Tier stays at "free" despite holding tokens

**Check**:
1. Is `NEXT_PUBLIC_FILE_TOKEN_MINT` set?
2. Is the mint address correct?
3. Do you actually hold the tokens?
4. Is RPC endpoint working?

**Fix**:
```bash
# Verify token mint address
# Should be a valid Solana address

# Test RPC connection
curl https://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'

# Disconnect and reconnect wallet to refresh
```

### Tier doesn't update
**Problem**: Bought tokens but tier unchanged

**Fix**:
1. Disconnect wallet
2. Reconnect wallet
3. Tier is checked on connection
4. Check browser console for errors

## UI/Display Issues

### Page is blank or white
**Problem**: React rendering error

**Check**:
1. Browser console for errors
2. Is dev server running?
3. Any TypeScript errors?

**Fix**:
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### Styles not loading
**Problem**: Tailwind CSS not working

**Fix**:
```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer

# Restart dev server
npm run dev
```

### Wallet button looks wrong
**Problem**: Wallet adapter styles not loading

**Fix**:
- Check that `WalletProvider.tsx` has: `require('@solana/wallet-adapter-react-ui/styles.css')`
- Clear browser cache
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

## API Route Issues

### API routes return 404
**Problem**: Routes not found

**Check**:
- Are you using correct URL? (`/api/upload`, not `/upload`)
- Is dev server running?
- Check file structure in `app/api/`

**Fix**:
```bash
# Verify API route files exist
ls -la app/api/upload/
ls -la app/api/files/

# Should see route.ts files
```

### API returns 500 error
**Problem**: Server error

**Debug**:
1. Check terminal where dev server is running
2. Look for error stack trace
3. Common causes:
   - Supabase connection failed
   - Environment variables missing
   - Database query error

**Fix**:
- Check all environment variables are set
- Verify Supabase credentials
- Check database schema is correct

## Development Issues

### Hot reload not working
**Problem**: Changes don't appear

**Fix**:
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

### Port 3000 already in use
**Problem**: Another process using port

**Fix**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## Production/Deployment Issues

### Build fails on Vercel
**Problem**: Deployment fails

**Check**:
1. Does it build locally? `npm run build`
2. Are environment variables set in Vercel?
3. Check build logs for specific error

**Fix**:
- Add all env vars in Vercel project settings
- Ensure Node.js version is 18+
- Check for TypeScript errors

### Environment variables not working in production
**Problem**: App can't connect to Supabase in production

**Fix**:
1. Go to Vercel → Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

### Files upload locally but not in production
**Problem**: Production uploads fail

**Check**:
1. Supabase storage bucket is public
2. CORS settings in Supabase
3. Environment variables are correct
4. Check Vercel function logs

## Performance Issues

### Slow file uploads
**Problem**: Uploads take too long

**Causes**:
- Large file size
- Slow internet connection
- Supabase region far from user

**Fix**:
- Compress files before upload
- Choose Supabase region closer to users
- Upgrade internet connection

### Slow page loads
**Problem**: App is sluggish

**Fix**:
- Use dedicated RPC (Helius/QuickNode)
- Enable Vercel Edge Network
- Optimize images
- Check Supabase query performance

## Getting Help

### Still stuck?

1. **Check browser console**: Most errors show here
2. **Check terminal**: Server errors appear here
3. **Check Supabase logs**: Database/storage errors
4. **Review setup**: Follow SETUP.md step by step

### Useful commands

```bash
# Check if everything is installed
npm list

# Verify environment variables
cat .env.local

# Test Supabase connection
curl -X GET "YOUR_SUPABASE_URL/rest/v1/" \
  -H "apikey: YOUR_ANON_KEY"

# Check Node version
node -v  # Should be 18+

# Check npm version
npm -v

# Clear everything and start fresh
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### Debug checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Database schema run
- [ ] Storage bucket created
- [ ] Environment variables set
- [ ] Wallet extension installed
- [ ] Dev server running
- [ ] No console errors

---

Most issues are solved by:
1. Checking environment variables
2. Verifying Supabase setup
3. Restarting dev server
4. Clearing cache

Still need help? Review the setup guides or check the code comments!
