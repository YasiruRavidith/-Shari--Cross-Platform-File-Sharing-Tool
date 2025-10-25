# 🔍 Debugging 500 Error - Complete Guide

## Current Status

- ✅ PASSWORD CREATED: `Yasiru_@_20031129`
- ✅ LOCAL CONNECTION: Working
- ✅ ENCODED URL: Working locally
- ❌ VERCEL DEPLOYMENT: Getting DNS error

## The Error

```
getaddrinfo ENOTFOUND db.iyaakahzlqphttpuwxog.supabase.co
```

This means Vercel cannot resolve the hostname `db.iyaakahzlqphttpuwxog.supabase.co`

---

## Possible Causes & Solutions

### Option 1: Environment Variable Not Updated Properly

**Check:**
1. Go to: https://vercel.com/dashboard
2. Click: `shari-backend`
3. Go to: Settings → Environment Variables
4. Find: `DATABASE_URL`
5. Click Edit
6. Verify it shows EXACTLY this (no extra spaces, no newlines):

```
postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

**If it's different:**
- Delete it and add it again manually
- Make sure you're editing the PRODUCTION environment
- NO trailing spaces or newlines!

---

### Option 2: Wrong Supabase Connection String Format

Newer Supabase projects use a different hostname format.

**Check in Supabase:**
1. Go to: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog
2. Click: Settings → Database
3. Find: Connection String
4. Look for: **"Connection pooling"** or **"Direct connection"**

**You might need to use:**

**Option A - Pooler (Port 6543):**
```
postgresql://postgres.iyaakahzlqphttpuwxog:Yasiru_%40_20031129@aws-0-us-east-1.pooler.supabase.co:6543/postgres
```

**Option B - Direct (Port 5432):**
```
postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

**Option C - IPv6 Direct:**
```
postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres?sslmode=require
```

---

### Option 3: Supabase Project Paused or Restricted

**Check:**
1. Go to: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog
2. Check if the project status is "Active" (not "Paused")
3. Check if there are any warnings about the database

**If paused:**
- Click "Resume Project"
- Wait 2-3 minutes
- Try again

---

### Option 4: Vercel Deployment Cache

Sometimes Vercel caches environment variables.

**Fix:**
1. Go to Vercel dashboard
2. Click on your latest deployment
3. Click the "..." menu (top right)
4. Select "Redeploy"
5. Check "Use existing Build Cache" → **UNCHECK it**
6. Click "Redeploy"

---

## How to Get the Correct Connection String from Supabase

### Step 1: Go to Database Settings
```
https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog/settings/database
```

### Step 2: Find Connection String Section
Look for a section called:
- "Connection string"
- "Connection info"
- "Database settings"

### Step 3: Choose the Right Connection Mode
You'll see tabs or options:
- **URI** (Use this one!)
- JDBC
- .NET
- Nodejs
- etc.

### Step 4: Copy the Connection String
It will look like one of these:

**Format 1 (Older/Direct):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

**Format 2 (Newer/Pooler):**
```
postgresql://postgres.iyaakahzlqphttpuwxog:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.co:6543/postgres
```

### Step 5: Replace Password and Encode
Replace `[YOUR-PASSWORD]` with:
```
Yasiru_%40_20031129
```
(Notice the `@` is `%40`)

---

## Testing the Connection String

### Test Locally:
```powershell
cd d:\DEV\Shari\backend

# Test with your connection string
node -e "const { Pool } = require('pg'); const pool = new Pool({ connectionString: 'YOUR_CONNECTION_STRING_HERE', ssl: { rejectUnauthorized: false } }); pool.query('SELECT NOW()', (err, res) => { if (err) console.log('❌ Error:', err.message); else console.log('✅ Success!', res.rows[0].now); pool.end(); });"
```

Replace `YOUR_CONNECTION_STRING_HERE` with the full connection string.

If it says "✅ Success!" - the connection string is correct!

---

## Step-by-Step Fix

### 1. Get the Correct Connection String from Supabase

Go to Supabase Dashboard and copy the EXACT connection string format they provide.

### 2. URL-Encode the Password

Your password: `Yasiru_@_20031129`  
Encoded: `Yasiru_%40_20031129`

Replace in the connection string.

### 3. Test Locally

Run the test command above to verify it works.

### 4. Update in Vercel

- Go to Vercel Dashboard
- Settings → Environment Variables
- Edit DATABASE_URL
- Paste the connection string
- Save

### 5. Redeploy

```powershell
cd d:\DEV\Shari\backend
vercel --prod
```

### 6. Test the API

```powershell
curl.exe -X POST https://shari-backend.vercel.app/api/login -H "Content-Type: application/json" -d '{\"password\":\"Yasiru_@_20031129\"}'
```

Should return: `{"token":"..."}`

---

## Current Best Guess

The hostname `db.iyaakahzlqphttpuwxog.supabase.co` might be incorrect for your Supabase project.

**Action:**  
Check Supabase Dashboard for the exact connection string format and update DATABASE_URL in Vercel with the correct hostname.

---

## Need More Help?

1. Check Supabase Dashboard for exact connection string
2. Screenshot the "Connection String" section in Supabase
3. Verify DATABASE_URL in Vercel matches exactly
4. Try the pooler connection string (port 6543) instead of direct (port 5432)

---

## Quick Links

- **Supabase Database Settings**: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog/settings/database
- **Vercel Environment Variables**: https://vercel.com/yasirus-projects-909d09d6/shari-backend/settings/environment-variables
- **Latest Deployment Logs**: https://vercel.com/yasirus-projects-909d09d6/shari-backend/266WYWhZucCDoS7osiUyHn44CJXw

---

Let me know what connection string format you see in Supabase!
