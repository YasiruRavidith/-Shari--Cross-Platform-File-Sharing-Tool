# 🔧 Fix for 500 Error - Password Encoding Issue

## ❌ Problem Found

Your password contains special characters (`@` symbol) that need to be URL-encoded in the DATABASE_URL connection string.

**Your password**: `Yasiru_@_20031129`

The `@` symbol has special meaning in URLs (it separates username from hostname), so it must be encoded as `%40`.

---

## ✅ Solution

### Step 1: Update DATABASE_URL in Vercel

1. Go to: **https://vercel.com/dashboard**
2. Click on your **shari-backend** project
3. Go to **Settings** → **Environment Variables**
4. Find **DATABASE_URL**
5. Click the **Edit** button (pencil icon)
6. Replace the entire value with this (copy exactly):

```
postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

**Important**: Notice that `@` is now `%40`

7. Click **Save**

---

### Step 2: Redeploy Backend

Run this command:

```powershell
cd d:\DEV\Shari\backend
vercel --prod
```

---

### Step 3: Test Login

1. Go to: https://shari-frontend.vercel.app
2. Enter password: `Yasiru_@_20031129` (use the original password, not the encoded one!)
3. Click Login
4. ✅ Should work now!

---

## 🤔 Why This Happened

### URL Structure:
```
postgresql://username:password@hostname:port/database
                      ↑        ↑
                      |        |
                   password  hostname separator
```

When your password contains `@`, it confuses the URL parser:
```
postgresql://postgres:Yasiru_@_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
                              ↑         ↑
                              |         |
                          Which @ is which?
```

By encoding `@` as `%40`, it's clear:
```
postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
                              ↑           ↑
                              |           |
                          part of pwd   separator
```

---

## 📋 Special Characters That Need Encoding

If your password contains any of these, they need to be encoded:

| Character | Encoded As | Example Password | Encoded Version |
|-----------|------------|------------------|-----------------|
| @         | %40        | pass@word        | pass%40word     |
| :         | %3A        | pass:word        | pass%3Aword     |
| /         | %2F        | pass/word        | pass%2Fword     |
| ?         | %3F        | pass?word        | pass%3Fword     |
| #         | %23        | pass#word        | pass%23word     |
| &         | %26        | pass&word        | pass%26word     |
| =         | %3D        | pass=word        | pass%3Dword     |
| %         | %25        | pass%word        | pass%25word     |

---

## ✅ After the Fix

Your updated .env file locally:
```env
DATABASE_URL=postgresql://postgres:Yasiru_%40_20031129@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

And the same value in Vercel environment variables!

---

## 🧪 Test Locally First

You can test if the fix works locally:

```powershell
cd d:\DEV\Shari\backend
node checkUser.js
```

This should connect successfully with the encoded URL.

---

## 🆘 Still Not Working?

If you still get 500 error after updating:

1. Make sure you saved the environment variable in Vercel
2. Make sure you redeployed: `vercel --prod`
3. Clear your browser cache
4. Check logs: `vercel logs` (in backend folder)
5. Try the web dashboard to see logs: https://vercel.com/dashboard

---

**TL;DR**: Replace `@` with `%40` in your DATABASE_URL in Vercel, then redeploy!
