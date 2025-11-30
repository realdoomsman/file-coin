# 🗄️ Supabase Setup Guide for File Coin

Complete guide to setting up Supabase for File Coin.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

## Step 2: Create New Project

1. Click "New Project" in your dashboard
2. Fill in project details:
   - **Name**: `file-coin` (or any name you like)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (perfect for getting started)
3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

## Step 3: Get API Credentials

1. Once project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this - you'll need it for `NEXT_PUBLIC_SUPABASE_URL`

### API Keys
You'll see two keys:
- **anon/public** - This is what you need
- **service_role** - Don't use this in your app

Copy the **anon public** key - you'll need it for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 4: Create Database Tables

1. Go to **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see: "Success. No rows returned"

### What this creates:
- `users` table - Stores wallet addresses and storage usage
- `files` table - Stores file metadata
- Indexes for performance
- Row Level Security policies (optional)

### Verify tables were created:
1. Go to **Table Editor** in sidebar
2. You should see two tables: `users` and `files`

## Step 5: Create Storage Bucket

1. Go to **Storage** in the sidebar
2. Click **New Bucket**
3. Fill in bucket details:
   - **Name**: `files` (must be exactly this)
   - **Public bucket**: Toggle **ON** (important!)
   - **File size limit**: Leave default or set to 500MB
   - **Allowed MIME types**: Leave empty (allow all)
4. Click **Create Bucket**

### Verify bucket was created:
- You should see "files" bucket in the storage list
- It should show as "Public"

## Step 6: Configure Environment Variables

1. Open `.env.local` in your File Coin project
2. Replace the placeholder values:

```env
# Replace with your Project URL from Step 3
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Replace with your anon/public key from Step 3
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...

# These can stay as default
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_FILE_TOKEN_MINT=
HOLDER_TIER_MIN=1000
WHALE_TIER_MIN=10000
```

## Step 7: Test the Connection

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Click "Launch App"

4. Connect your wallet

5. Try uploading a test file

6. If it works, you're all set! 🎉

## Troubleshooting

### "Failed to fetch" error
**Problem**: Can't connect to Supabase

**Check**:
- Is your Project URL correct?
- Is your anon key correct?
- Did you copy the full key (it's very long)?
- Is your Supabase project active?

### "Storage bucket not found"
**Problem**: Files bucket doesn't exist or isn't configured

**Fix**:
1. Go to Storage in Supabase
2. Make sure bucket is named exactly `files`
3. Make sure it's set to **Public**
4. Try creating it again if needed

### "Row Level Security policy violation"
**Problem**: RLS is blocking database operations

**Quick Fix** (for development):
```sql
-- Run this in SQL Editor
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE files DISABLE ROW LEVEL SECURITY;
```

**Proper Fix** (for production):
The schema already includes RLS policies. If you're having issues:
1. Go to Authentication → Policies
2. Make sure policies are enabled for both tables
3. Or disable RLS for testing

### Tables not created
**Problem**: SQL didn't run properly

**Fix**:
1. Go to SQL Editor
2. Run this to check if tables exist:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
3. If you don't see `users` and `files`, run the schema again
4. Check for error messages in the SQL Editor

## Optional: Configure RLS Policies

If you want proper security (recommended for production):

### For Users Table
```sql
-- Allow anyone to read user data
CREATE POLICY "Allow read access" ON users
  FOR SELECT USING (true);

-- Allow anyone to insert (for new users)
CREATE POLICY "Allow insert" ON users
  FOR INSERT WITH CHECK (true);

-- Allow users to update their own data
CREATE POLICY "Allow update own data" ON users
  FOR UPDATE USING (true);
```

### For Files Table
```sql
-- Allow anyone to read public files
CREATE POLICY "Allow read public files" ON files
  FOR SELECT USING (is_public = true OR true);

-- Allow anyone to insert files
CREATE POLICY "Allow insert files" ON files
  FOR INSERT WITH CHECK (true);

-- Allow users to update their own files
CREATE POLICY "Allow update own files" ON files
  FOR UPDATE USING (true);

-- Allow users to delete their own files
CREATE POLICY "Allow delete own files" ON files
  FOR DELETE USING (true);
```

## Optional: Set Up Storage Policies

For more control over file uploads:

1. Go to Storage → Policies
2. Click on `files` bucket
3. Add policies:

### Allow Public Read
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'files' );
```

### Allow Authenticated Upload
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'files' );
```

### Allow Owner Delete
```sql
CREATE POLICY "Owner Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'files' );
```

## Supabase Dashboard Overview

### Key Sections:
- **Table Editor**: View and edit database records
- **SQL Editor**: Run SQL queries
- **Storage**: Manage file buckets
- **Authentication**: User management (not used in File Coin)
- **API**: Get your credentials
- **Logs**: View database and storage logs

### Useful for Debugging:
- **Logs → Postgres Logs**: See database queries
- **Logs → Storage Logs**: See file upload/download activity
- **API Docs**: Auto-generated API documentation

## Monitoring Usage

### Free Tier Limits:
- **Database**: 500MB
- **Storage**: 1GB
- **Bandwidth**: 2GB/month
- **API Requests**: Unlimited

### Check Usage:
1. Go to **Settings → Usage**
2. Monitor:
   - Database size
   - Storage size
   - Bandwidth used
   - API requests

### When to Upgrade:
- If you hit storage limits
- If you need more bandwidth
- If you want better performance
- Pro plan is $25/month

## Security Best Practices

### For Development:
- ✅ Use anon/public key (not service_role)
- ✅ Keep RLS disabled for easier testing
- ✅ Use public storage bucket

### For Production:
- ✅ Enable RLS policies
- ✅ Configure proper storage policies
- ✅ Set up CORS if needed
- ✅ Monitor logs regularly
- ✅ Use environment variables (never commit keys)

## Next Steps

Once Supabase is set up:

1. ✅ Verify connection works
2. ✅ Test file upload
3. ✅ Check database records in Table Editor
4. ✅ View uploaded files in Storage
5. ✅ Deploy to production

## Quick Reference

### Essential URLs:
- **Dashboard**: https://app.supabase.com
- **Docs**: https://supabase.com/docs
- **Status**: https://status.supabase.com

### Essential Commands:
```bash
# Test connection
curl -X GET "YOUR_SUPABASE_URL/rest/v1/" \
  -H "apikey: YOUR_ANON_KEY"

# Check tables
# Run in SQL Editor:
SELECT * FROM users;
SELECT * FROM files;
```

---

**All set?** Head back to [START-HERE.md](./START-HERE.md) to continue setup!

Need help? Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
