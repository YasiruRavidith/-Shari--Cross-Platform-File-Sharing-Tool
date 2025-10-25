# 🗺️ System Architecture

## How Your App Works Now

```
┌─────────────────┐
│   User Browser  │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTPS
         │
         ▼
┌─────────────────────┐
│  Vercel Frontend    │
│  (React App)        │
└────────┬────────────┘
         │
         │ API Calls
         │
         ▼
┌─────────────────────┐
│  Vercel Backend     │
│  (Node.js/Express)  │
└────┬────────┬───────┘
     │        │
     │        │
     ▼        ▼
┌─────────┐  ┌──────────────┐
│Supabase │  │  Supabase    │
│Database │  │  Storage     │
│(Tables) │  │  (Files)     │
└─────────┘  └──────────────┘
```

## What Each Part Does

### 🌐 Frontend (Vercel)
- **Your React app**
- Handles user interface
- Sends requests to backend
- **URL**: `https://your-app.vercel.app`

### ⚙️ Backend (Vercel)
- **Your Node.js API**
- Handles authentication (login)
- Processes file uploads
- Saves/retrieves text
- **URL**: `https://your-api.vercel.app`

### 🗄️ Supabase Database
- **PostgreSQL database**
- Stores:
  - User password (hashed)
  - File metadata (names, URLs)
  - Text content
- **3 Tables**: `users`, `files`, `texts`

### 📦 Supabase Storage
- **File storage**
- Stores actual uploaded files
- Provides public URLs for files
- **Bucket name**: `files`

---

## 🔐 Environment Variables Explained

You need these 4 secrets:

### 1. DATABASE_URL
```
postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres
```
- **What it is**: Connection string to your Supabase database
- **Where to find**: Supabase → Settings → Database → Connection String (URI)
- **Used for**: Connecting to PostgreSQL database
- **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

### 2. JWT_SECRET
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```
- **What it is**: Secret key for creating login tokens
- **Where to get**: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Used for**: Encrypting and verifying JWT tokens
- **Important**: Must be at least 32 characters, keep it secret!

### 3. SUPABASE_URL
```
https://xxxxxxxxxxxxx.supabase.co
```
- **What it is**: Your Supabase project URL
- **Where to find**: Supabase → Settings → API → Project URL
- **Used for**: Connecting to Supabase services
- **Example**: `https://abcdefghijk.supabase.co`

### 4. SUPABASE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...very-long-string
```
- **What it is**: Public API key for Supabase
- **Where to find**: Supabase → Settings → API → anon public key
- **Used for**: Authenticating with Supabase Storage
- **Important**: This is the "anon public" key, NOT the "service_role" key

---

## 📋 Database Tables Structure

### Table: `users`
Stores the admin password (only 1 row)

| Column     | Type      | Description              |
|------------|-----------|--------------------------|
| id         | SERIAL    | Auto-increment ID        |
| password   | VARCHAR   | Hashed password (bcrypt) |
| created_at | TIMESTAMP | When created             |

### Table: `files`
Stores information about uploaded files

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | SERIAL    | Auto-increment ID              |
| filename   | VARCHAR   | Original filename              |
| filepath   | TEXT      | Supabase Storage URL           |
| created_at | TIMESTAMP | When uploaded                  |

### Table: `texts`
Stores pasted text content

| Column     | Type      | Description           |
|------------|-----------|-----------------------|
| id         | SERIAL    | Auto-increment ID     |
| content    | TEXT      | The pasted text       |
| created_at | TIMESTAMP | When created          |

---

## 🔄 How Authentication Works

```
1. User enters password in frontend
                ↓
2. Frontend sends password to /api/login
                ↓
3. Backend compares with hashed password in database
                ↓
4. If match: Backend creates JWT token
                ↓
5. Frontend stores token (localStorage)
                ↓
6. Frontend includes token in all future requests
                ↓
7. Backend verifies token before allowing access
```

---

## 📤 How File Upload Works

```
1. User selects file in frontend
                ↓
2. Frontend sends file to /api/upload (with JWT token)
                ↓
3. Backend verifies token
                ↓
4. Backend uploads file to Supabase Storage
                ↓
5. Supabase returns public URL
                ↓
6. Backend saves filename + URL to database
                ↓
7. Backend responds with success
                ↓
8. Frontend shows updated file list
```

---

## 🌍 Why This Setup?

### ✅ Benefits

1. **Free Hosting**
   - Vercel: Free for personal projects
   - Supabase: Free tier (500 MB database, 1 GB storage)

2. **Scalable**
   - Handles traffic automatically
   - No server management needed

3. **Fast**
   - Vercel CDN (content delivery network)
   - Supabase optimized database

4. **Secure**
   - HTTPS everywhere
   - JWT authentication
   - Password hashing (bcrypt)
   - Environment variables for secrets

5. **Easy Updates**
   - Just run `vercel --prod` to deploy changes
   - Automatic deployments from Git (optional)

---

## 🔧 Where Each Secret Is Used

| Secret        | Used In                          | Purpose                      |
|---------------|----------------------------------|------------------------------|
| DATABASE_URL  | `db.js`                         | Connect to database          |
| JWT_SECRET    | `index.js` (login, auth)        | Create/verify tokens         |
| SUPABASE_URL  | `index.js` (file upload)        | Connect to Supabase Storage  |
| SUPABASE_KEY  | `index.js` (file upload)        | Authenticate with Supabase   |

---

## 📍 Where to Add Secrets

### Local Development (Your Computer)
Create `backend/.env` file with all 4 secrets

### Production (Vercel)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all 4 secrets

**Important**: Secrets must be the same in both places!

---

## 🎯 File Structure After Setup

```
Shari/
├── backend/
│   ├── .env                 ← YOU CREATE (secrets)
│   ├── .env.example         ✅ Created
│   ├── .gitignore          ✅ Created
│   ├── db.js               ✅ Updated (SSL)
│   ├── index.js            ✅ Updated (Supabase)
│   ├── package.json        ✅ Updated (dependencies)
│   ├── schema.sql          ✅ Created
│   ├── setupPassword.js    ✅ Updated (interactive)
│   ├── vercel.json         ✅ Updated
│   └── middleware/
│       └── auth.js
│
├── frontend/
│   └── (React app files)
│
├── CHECKLIST.md            ✅ Created
├── DEPLOYMENT_GUIDE.md     ✅ Created
├── QUICK_START.md          ✅ Created
└── START_HERE.md           ✅ Created (READ THIS FIRST!)
```

---

## 🚀 Ready to Deploy?

**Start with**: `START_HERE.md` - Follow it step by step!
