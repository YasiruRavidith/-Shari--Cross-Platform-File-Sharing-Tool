# 🚀 How to Run Shari

## ✅ Your App is Already Deployed!

**Frontend**: https://shari-frontend.vercel.app  
**Backend**: https://shari-backend.vercel.app

Just open the frontend URL and use it! 🎉

---

## 🔐 Login Credentials

**Password**: `Yasiru_@_20031129`

---

## 💻 Run Locally (Development)

### Backend

1. **Navigate to backend folder:**
   ```powershell
   cd d:\DEV\Shari\backend
   ```

2. **Install dependencies** (first time only):
   ```powershell
   npm install
   ```

3. **Start the server:**
   ```powershell
   node index.js
   ```

4. Backend will run at: `http://localhost:5000`

### Frontend

1. **Navigate to frontend folder:**
   ```powershell
   cd d:\DEV\Shari\frontend
   ```

2. **Install dependencies** (first time only):
   ```powershell
   npm install
   ```

3. **Update `.env` for local development:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the app:**
   ```powershell
   npm start
   ```

5. Frontend will open at: `http://localhost:3000`

---

## 🌐 Production Deployment

### Backend (Vercel)

```powershell
cd d:\DEV\Shari\backend
vercel --prod
```

### Frontend (Vercel)

```powershell
cd d:\DEV\Shari\frontend
vercel --prod
```

---

## 🗂️ Project Structure

```
Shari/
├── backend/              # Express API server
│   ├── index.js         # Main server file
│   ├── db.js            # Database connection
│   ├── middleware/      # JWT authentication
│   ├── .env             # Environment variables
│   └── package.json
│
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── config.js    # API configuration
│   │   └── App.js       # Main app
│   ├── .env             # Environment variables
│   └── package.json
│
└── .gitignore           # Git ignore file
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret
SUPABASE_URL=https://iyaakahzlqphttpuwxog.supabase.co
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
```

### Frontend (.env)

```env
# For production
REACT_APP_API_URL=https://shari-backend.vercel.app

# For local development
REACT_APP_API_URL=http://localhost:5000
```

---

## 🛠️ Common Commands

### Install Dependencies
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Run Development Servers
```powershell
# Backend
cd backend
node index.js

# Frontend (in a new terminal)
cd frontend
npm start
```

### Deploy to Vercel
```powershell
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

### Update Password
```powershell
cd backend
node setupPassword.js
```

### Test Database Connection
```powershell
cd backend
node testConnection.js
```

---

## 📝 Features

✅ **Text Sharing** - Paste and save text snippets  
✅ **File Upload** - Upload and share files  
✅ **Authentication** - Secure with JWT tokens  
✅ **Cloud Storage** - Files stored in Supabase  
✅ **Database** - PostgreSQL via Supabase  

---

## 🐛 Troubleshooting

### File upload not working?
Make sure you ran this SQL in Supabase:
```sql
CREATE POLICY "Allow all storage" ON storage.objects FOR ALL USING (true) WITH CHECK (true);
```

### Database connection issues?
- Check that you're using the **Connection Pooler** URL (port 6543)
- Verify password is URL-encoded (@ becomes %40)

### CORS errors?
- Make sure `REACT_APP_API_URL` in frontend/.env matches your backend URL
- Check CORS configuration in backend/index.js

---

## 📚 Documentation

- `START_HERE.md` - Quick start guide
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `STORAGE_SETUP.md` - Supabase Storage setup
- `FIX_RLS.md` - Row Level Security troubleshooting

---

## 🎯 Quick Start (Fastest Way)

1. **Just use the deployed app!**
   - Go to: https://shari-frontend.vercel.app
   - Login with password: `Yasiru_@_20031129`
   - Start sharing files and text!

2. **Or run locally:**
   ```powershell
   # Terminal 1 - Backend
   cd d:\DEV\Shari\backend
   npm install
   node index.js

   # Terminal 2 - Frontend
   cd d:\DEV\Shari\frontend
   npm install
   npm start
   ```

That's it! 🚀
