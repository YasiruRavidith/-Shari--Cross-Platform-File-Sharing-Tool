# 🎨 Frontend Deployment Guide

## ✅ What I Updated

- ✅ Created `src/config.js` for centralized API URL
- ✅ Updated all components to use the config
- ✅ Fixed file download to use Supabase URLs directly
- ✅ All components now point to your Vercel backend

---

## 🚀 Deploy Frontend to Vercel

### Step 1: Update Backend URL

**First, get your backend URL from Vercel:**

1. Go to https://vercel.com/dashboard
2. Click on your backend project
3. Copy the deployment URL (e.g., `https://shari-backend-xyz.vercel.app`)

**Option A: Using .env file (Recommended)**

Create `frontend/.env` file:
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

**Option B: Update config.js directly**

Edit `frontend/src/config.js` and replace:
```javascript
const API_URL = 'https://your-backend-url.vercel.app';
```

---

### Step 2: Deploy to Vercel

Run these commands:

```powershell
cd d:\DEV\Shari\frontend
vercel
```

Answer the prompts:
- Set up and deploy? → **Y**
- Which scope? → Choose your account
- Link to existing project? → **N**
- Project name? → **shari-frontend** (or your choice)
- Which directory? → Press **Enter**
- Override settings? → **N**

---

### Step 3: Add Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.vercel.app` (your actual backend URL)
5. Click **Save**

---

### Step 4: Redeploy

```powershell
vercel --prod
```

---

## 🎉 Done!

Your frontend will be deployed at: `https://shari-frontend-xyz.vercel.app`

---

## 🧪 Test Your App

1. Open your frontend URL
2. Login with your password
3. Try uploading a file
4. Try pasting text
5. Verify everything works!

---

## ⚠️ Important Notes

- Make sure backend URL doesn't have a trailing slash
- Use the production backend URL (the one with ✓ icon in Vercel)
- If you get CORS errors, the backend is already configured for CORS

---

## 🔧 Quick Commands

```powershell
# Deploy frontend
cd d:\DEV\Shari\frontend
vercel --prod

# View logs (if something goes wrong)
vercel logs

# List deployments
vercel list
```

---

## 🆘 Troubleshooting

### "Network Error" or "Failed to fetch"
- Check that REACT_APP_API_URL is correct
- Make sure backend is deployed and running
- Verify no typos in the URL

### "Login failed"
- Make sure you set up the password on backend
- Check backend logs: `vercel logs --prod`

### Files not uploading
- Verify Supabase Storage bucket is created and public
- Check backend environment variables are set

---

**Ready to deploy? Run the commands above! 🚀**
