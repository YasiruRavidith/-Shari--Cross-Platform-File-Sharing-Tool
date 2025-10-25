# 📝 Deployment Checklist

Copy this and check off each step as you complete it!

## Supabase Setup
- [ ] Created Supabase account at https://supabase.com
- [ ] Created new project
- [ ] Saved database password securely
- [ ] Copied DATABASE_URL from Settings → Database → Connection String
- [ ] Copied SUPABASE_URL from Settings → API
- [ ] Copied SUPABASE_KEY (anon public) from Settings → API
- [ ] Ran schema.sql in SQL Editor
- [ ] Verified tables created (users, files, texts)
- [ ] Created storage bucket named "files"
- [ ] Made bucket public
- [ ] Added storage policies for public access

## Local Setup
- [ ] Generated JWT_SECRET using node command
- [ ] Created backend/.env file
- [ ] Added all 4 environment variables to .env
- [ ] Ran `npm install` in backend folder
- [ ] Ran `node setupPassword.js` to create login password
- [ ] Tested login password works

## Vercel Setup (Backend)
- [ ] Installed Vercel CLI: `npm install -g vercel`
- [ ] Logged into Vercel: `vercel login`
- [ ] Deployed backend: `vercel` from backend folder
- [ ] Added DATABASE_URL to Vercel environment variables
- [ ] Added JWT_SECRET to Vercel environment variables
- [ ] Added SUPABASE_URL to Vercel environment variables
- [ ] Added SUPABASE_KEY to Vercel environment variables
- [ ] Redeployed with: `vercel --prod`
- [ ] Copied backend URL (e.g., https://shari-backend.vercel.app)

## Frontend Setup
- [ ] Updated frontend API URL to Vercel backend URL
- [ ] Deployed frontend: `vercel` from frontend folder
- [ ] Copied frontend URL

## Testing
- [ ] Opened frontend URL in browser
- [ ] Successfully logged in with password
- [ ] Tested file upload
- [ ] Tested text paste
- [ ] Verified files appear in Supabase Storage
- [ ] Verified data appears in database tables

## Security
- [ ] Confirmed .env file is in .gitignore
- [ ] Never committed .env to Git
- [ ] All secrets are only in Vercel environment variables
- [ ] Database password is secure

---

## Your URLs (Fill in after deployment)

Backend URL: ________________________________

Frontend URL: ________________________________

Supabase Project: ________________________________

---

## Your Secrets (Keep this file private!)

DATABASE_URL: ________________________________

JWT_SECRET: ________________________________

SUPABASE_URL: ________________________________

SUPABASE_KEY: ________________________________

Login Password: ________________________________
