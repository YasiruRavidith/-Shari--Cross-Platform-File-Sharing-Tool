# ⚡ Quick Command Reference

## 🔧 Setup Commands

### Generate JWT Secret
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Install Dependencies
```powershell
cd d:\DEV\Shari\backend
npm install
```

### Set Up Password
```powershell
cd d:\DEV\Shari\backend
node setupPassword.js
```

---

## 🚀 Deployment Commands

### Install Vercel CLI (One Time)
```powershell
npm install -g vercel
```

### Login to Vercel (One Time)
```powershell
vercel login
```

### Deploy Backend (First Time)
```powershell
cd d:\DEV\Shari\backend
vercel
```

### Deploy Backend to Production
```powershell
cd d:\DEV\Shari\backend
vercel --prod
```

### Deploy Frontend (First Time)
```powershell
cd d:\DEV\Shari\frontend
vercel
```

### Deploy Frontend to Production
```powershell
cd d:\DEV\Shari\frontend
vercel --prod
```

---

## 🗄️ Database Commands (Run in Supabase SQL Editor)

### Create All Tables
```sql
-- Copy and paste the entire contents of schema.sql
```

### Check If Tables Exist
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### View Users
```sql
SELECT * FROM users;
```

### View Files
```sql
SELECT * FROM files ORDER BY created_at DESC;
```

### View Texts
```sql
SELECT * FROM texts ORDER BY created_at DESC;
```

### Delete All Files
```sql
DELETE FROM files;
```

### Delete All Texts
```sql
DELETE FROM texts;
```

### Reset Password (Delete User)
```sql
DELETE FROM users;
-- Then run setupPassword.js again
```

---

## 🔍 Testing Commands

### Test Database Connection
```powershell
cd d:\DEV\Shari\backend
node -e "require('dotenv').config(); const pool = require('./db'); pool.query('SELECT NOW()', (err, res) => { console.log(err || res.rows); pool.end(); });"
```

### Test Backend Locally
```powershell
cd d:\DEV\Shari\backend
node index.js
```
Then visit: http://localhost:5000/api/files

---

## 📦 Vercel Commands

### View Deployment List
```powershell
vercel list
```

### View Environment Variables
```powershell
vercel env ls
```

### Add Environment Variable
```powershell
vercel env add
```

### Remove Deployment
```powershell
vercel remove [deployment-url]
```

### View Logs
```powershell
vercel logs
```

---

## 🛠️ Troubleshooting Commands

### Check Node Version
```powershell
node --version
```
Should be v14 or higher

### Check NPM Version
```powershell
npm --version
```

### Clear NPM Cache
```powershell
npm cache clean --force
```

### Reinstall Dependencies
```powershell
cd d:\DEV\Shari\backend
rm -rf node_modules
rm package-lock.json
npm install
```

### Check for Errors
```powershell
cd d:\DEV\Shari\backend
node index.js
```
Look for error messages

---

## 📝 Git Commands (Optional - If Using Git)

### Initialize Git
```powershell
cd d:\DEV\Shari
git init
```

### Add All Files
```powershell
git add .
```

### Commit
```powershell
git commit -m "Initial commit"
```

### Connect to GitHub
```powershell
git remote add origin https://github.com/yourusername/shari.git
git push -u origin main
```

### Check Status
```powershell
git status
```

---

## 🌐 Useful URLs

- Supabase Dashboard: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com
- Node.js: https://nodejs.org

---

## 💡 Common Command Patterns

### Full Redeploy
```powershell
cd d:\DEV\Shari\backend
vercel --prod
```

### Update Password
```powershell
cd d:\DEV\Shari\backend
node setupPassword.js
```

### Check Deployment Status
```powershell
vercel ls
```

### View Production URL
Look for the URL with the 🌍 icon in `vercel ls` output

---

## 🎯 Quick Deployment Checklist Commands

```powershell
# 1. Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Install dependencies
cd d:\DEV\Shari\backend; npm install

# 3. Set up password
node setupPassword.js

# 4. Deploy to Vercel
vercel

# 5. Deploy to production
vercel --prod
```

---

## 📞 Need Help?

If a command doesn't work:
1. Make sure you're in the correct directory
2. Check that you've installed all dependencies
3. Verify your .env file exists with all variables
4. Try restarting PowerShell

---

**💡 Tip**: Keep this file open in a separate window while deploying!
