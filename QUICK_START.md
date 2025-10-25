# 🚀 Quick Start Guide

## What I've Done For You

✅ Updated backend to work with Vercel (serverless)
✅ Configured Supabase as database (PostgreSQL)
✅ Set up Supabase Storage for file uploads (instead of local storage)
✅ Added SSL support for database connection
✅ Created database schema file
✅ Installed all required dependencies

## 📋 Next Steps (Follow in Order)

### 1️⃣ Create Supabase Account (5 minutes)
- Go to https://supabase.com
- Sign up with GitHub
- Create new project
- **SAVE YOUR DATABASE PASSWORD!**

### 2️⃣ Get Your Secret Keys (3 minutes)

You need 4 values:

1. **DATABASE_URL**: 
   - Supabase → Settings → Database → Connection String → URI
   - Replace `[YOUR-PASSWORD]` with your database password

2. **SUPABASE_URL**: 
   - Supabase → Settings → API → Project URL
   - Example: `https://xxxxx.supabase.co`

3. **SUPABASE_KEY**: 
   - Supabase → Settings → API → anon public key
   - Long string starting with "eyJ..."

4. **JWT_SECRET**: 
   - Run this command to generate one:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 3️⃣ Set Up Database Tables (2 minutes)
1. In Supabase, go to SQL Editor
2. Click "New query"
3. Copy everything from `backend/schema.sql`
4. Paste and click "Run"

### 4️⃣ Set Up Storage Bucket (2 minutes)
1. Supabase → Storage → Create bucket
2. Name: `files`
3. Make it **Public** ✅
4. Create policy: Allow public INSERT and SELECT

### 5️⃣ Create Local .env File
Create `backend/.env` file with your values:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
JWT_SECRET=your_generated_secret_from_step_2
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...your-anon-key
```

### 6️⃣ Set Up Your Login Password
```powershell
cd d:\DEV\Shari\backend
node setupPassword.js
```
Enter the password you want to use to login to your app.

### 7️⃣ Deploy to Vercel

#### Install Vercel CLI:
```powershell
npm install -g vercel
```

#### Deploy Backend:
```powershell
cd d:\DEV\Shari\backend
vercel login
vercel
```

#### Add Environment Variables in Vercel:
1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Add all 4 variables (DATABASE_URL, JWT_SECRET, SUPABASE_URL, SUPABASE_KEY)
5. Redeploy: `vercel --prod`

### 8️⃣ Update Frontend
Update your frontend API URL to point to your Vercel backend URL.

### 9️⃣ Deploy Frontend
```powershell
cd d:\DEV\Shari\frontend
vercel
```

## 📖 Detailed Guide

For step-by-step instructions with screenshots, see `DEPLOYMENT_GUIDE.md`

## ❓ Need Help?

### Where to find each key:
- **DATABASE_URL**: Supabase → Settings → Database → Connection String
- **SUPABASE_URL**: Supabase → Settings → API → Project URL
- **SUPABASE_KEY**: Supabase → Settings → API → anon public
- **JWT_SECRET**: Generate with the node command above

### Common Issues:
- "Cannot connect": Check DATABASE_URL has correct password
- "Storage error": Make sure bucket is public and has policies
- "Invalid token": Verify JWT_SECRET matches everywhere

## 🎉 You're Done!

Once deployed, you'll have:
- Backend: `https://your-project.vercel.app`
- Frontend: `https://your-frontend.vercel.app`
- Database: Hosted on Supabase
- Files: Stored in Supabase Storage

Everything will be free on the free tiers! 🎊
