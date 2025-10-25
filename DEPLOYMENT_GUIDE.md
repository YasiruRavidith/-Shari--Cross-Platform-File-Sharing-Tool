# Deployment Guide: Vercel + Supabase

## Step 1: Create Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign in with GitHub
3. Click "New Project"
4. Fill in the details:
   - **Name**: Choose a name (e.g., "shari-app")
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Select Free tier
5. Click "Create new project" and wait 2-3 minutes

## Step 2: Get Supabase Connection Details

### A. Get Database URL (PostgreSQL Connection String)
1. In your Supabase project, click "Project Settings" (gear icon in sidebar)
2. Go to "Database" section
3. Scroll to "Connection string" section
4. Select "URI" tab
5. Copy the connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the database password you created
7. Save this as `DATABASE_URL`

### B. Get Supabase API Keys
1. In "Project Settings", go to "API" section
2. Find these values:
   - **Project URL**: `https://xxxxx.supabase.co` → Save as `SUPABASE_URL`
   - **anon public key**: Long string starting with "eyJ..." → Save as `SUPABASE_KEY`

## Step 3: Set Up Database Tables

1. In Supabase dashboard, click "SQL Editor" in sidebar
2. Click "New query"
3. Copy the contents of `schema.sql` file from your project
4. Paste it into the SQL editor
5. Click "Run" to create tables
6. Verify tables created: Go to "Table Editor" and see `users`, `files`, `texts`

## Step 4: Set Up Supabase Storage

1. Click "Storage" in Supabase sidebar
2. Click "Create a new bucket"
3. Name it: `files`
4. Make it **Public** (toggle the public option ON)
5. Click "Create bucket"
6. Click on the `files` bucket → Policies
7. Click "New Policy" → "For full customization"
8. Create this policy:
   ```
   Policy name: Public Access
   SELECT: Enabled (check the box)
   INSERT: Enabled (check the box)
   Target roles: public
   ```
9. Click "Review" then "Save policy"

## Step 5: Create Your Admin Password

1. On your local machine, navigate to backend folder:
   ```powershell
   cd d:\DEV\Shari\backend
   ```

2. Create a `.env` file with your Supabase credentials:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
   JWT_SECRET=your_random_secret_key_at_least_32_chars_long_12345678
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=eyJhbGc...your-anon-key
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Run the setup password script:
   ```powershell
   node setupPassword.js
   ```
   Enter your desired password when prompted (this is the password you'll use to login to your app)

## Step 6: Deploy to Vercel

### A. Install Vercel CLI (if not already installed)
```powershell
npm install -g vercel
```

### B. Deploy Backend
1. Navigate to backend folder:
   ```powershell
   cd d:\DEV\Shari\backend
   ```

2. Login to Vercel:
   ```powershell
   vercel login
   ```

3. Deploy:
   ```powershell
   vercel
   ```
   - Answer questions:
     - Set up and deploy? **Y**
     - Which scope? Select your account
     - Link to existing project? **N**
     - Project name? **shari-backend** (or your choice)
     - Directory? Press Enter (current directory)
     - Override settings? **N**

4. After deployment, you'll get a URL like: `https://shari-backend.vercel.app`

### C. Add Environment Variables to Vercel
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (shari-backend)
3. Go to "Settings" → "Environment Variables"
4. Add each variable:
   - Key: `DATABASE_URL`, Value: Your Supabase connection string
   - Key: `JWT_SECRET`, Value: Your random secret key
   - Key: `SUPABASE_URL`, Value: Your Supabase project URL
   - Key: `SUPABASE_KEY`, Value: Your Supabase anon key
5. Click "Save" for each

6. Redeploy to apply environment variables:
   ```powershell
   vercel --prod
   ```

## Step 7: Deploy Frontend

1. Navigate to frontend folder:
   ```powershell
   cd d:\DEV\Shari\frontend
   ```

2. Update the API URL in your frontend code to point to your Vercel backend URL

3. Deploy frontend:
   ```powershell
   vercel
   ```
   Follow same steps as backend deployment

4. After deployment, get your frontend URL: `https://shari-frontend.vercel.app`

## Step 8: Test Your Application

1. Open your frontend URL in browser
2. Login with the password you created in Step 5
3. Test uploading files and pasting text

## Important Notes

- **Security**: Never commit `.env` file to Git
- **JWT_SECRET**: Generate a strong random string (at least 32 characters)
- **Database Password**: Use a strong password from Supabase
- **CORS**: If you have CORS issues, update the backend CORS settings to allow your frontend domain

## Troubleshooting

### Error: "Cannot connect to database"
- Verify DATABASE_URL is correct with password
- Check if Supabase project is active (not paused)

### Error: "Storage bucket not found"
- Make sure you created the `files` bucket in Supabase Storage
- Verify bucket is set to public

### Error: "Invalid JWT"
- Make sure JWT_SECRET matches between local setup and Vercel
- Verify JWT_SECRET is set in Vercel environment variables

### Files not uploading
- Check Supabase Storage policies allow INSERT
- Verify SUPABASE_KEY is the anon public key, not service role key

## Generate JWT Secret

Use this command to generate a secure JWT secret:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your JWT_SECRET.
