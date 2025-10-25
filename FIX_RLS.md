# 🔒 Fix Row Level Security (RLS) Issue

## ❌ Current Error
```json
{"msg":"Error uploading file","error":"new row violates row-level security policy"}
```

## 🔍 What's Happening?
- ✅ File **successfully uploads** to Supabase Storage
- ❌ But can't **save metadata** to database (files table)
- 🔒 Supabase has Row Level Security (RLS) enabled by default
- 🚫 No policies exist to allow INSERT operations

---

## ✅ Solution: Disable RLS (Quick & Easy)

### Option 1: Using SQL Editor (Recommended)

1. **Go to SQL Editor:**
   ```
   https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog/sql/new
   ```

2. **Run this SQL:**
   ```sql
   -- Disable RLS on files table
   ALTER TABLE files DISABLE ROW LEVEL SECURITY;
   
   -- Disable RLS on texts table
   ALTER TABLE texts DISABLE ROW LEVEL SECURITY;
   ```

3. **Click "Run"**

### Option 2: Using Table Editor

1. Go to: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog/editor
2. Click on **`files`** table
3. Look for **"RLS enabled"** toggle at the top
4. Click to **disable** it
5. Repeat for **`texts`** table

---

## 🔐 Solution: Add RLS Policies (More Secure)

If you want to keep RLS enabled but allow your app to work:

### SQL to Add Policies

```sql
-- Policy for files table (allow all operations)
CREATE POLICY "Allow all operations on files"
ON files
FOR ALL
USING (true);

-- Policy for texts table (allow all operations)
CREATE POLICY "Allow all operations on texts"
ON texts
FOR ALL
USING (true);
```

### Or Add Policies via Dashboard

1. Go to: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog/auth/policies
2. Select **`files`** table
3. Click **"New Policy"**
4. Choose **"Get started quickly"**
5. Select **"Enable access to all users"**
6. Enable all operations: SELECT, INSERT, UPDATE, DELETE
7. Click **"Review"** → **"Save policy"**
8. Repeat for **`texts`** table

---

## 🧪 After Fixing RLS - Test Again

```powershell
# Get token
$response = curl.exe -s -X POST https://shari-backend.vercel.app/api/login -H "Content-Type: application/json" -d '{\"password\":\"Yasiru_@_20031129\"}'
$token = ($response | ConvertFrom-Json).token

# Upload test file
curl.exe -X POST https://shari-backend.vercel.app/api/upload -H "x-auth-token: $token" -F "file=@test-upload.txt"
```

**Expected Response:**
```json
{
  "msg": "File uploaded successfully",
  "file": {
    "id": 1,
    "filename": "test-upload.txt",
    "filepath": "https://iyaakahzlqphttpuwxog.supabase.co/storage/v1/object/public/files/1234567890-test-upload.txt"
  }
}
```

---

## 🎯 Quick Checklist

- [ ] RLS disabled on `files` table (or policy added)
- [ ] RLS disabled on `texts` table (or policy added)
- [ ] File upload test successful
- [ ] File appears in Supabase Storage
- [ ] File metadata saved in database
- [ ] File downloadable via public URL

---

## 📊 What RLS Does

**Row Level Security (RLS)** controls who can:
- ✅ Read rows (SELECT)
- ✅ Insert rows (INSERT)
- ✅ Update rows (UPDATE)
- ✅ Delete rows (DELETE)

By default, Supabase enables RLS with **no policies**, which means:
- ❌ Nobody can do anything with the table
- Even your backend app can't insert/update/delete

**Two options:**
1. **Disable RLS** - Anyone can do anything (simple, less secure)
2. **Keep RLS + Add Policies** - Control who can do what (complex, more secure)

For this app, since you already have JWT authentication in your backend, **disabling RLS is fine**.

---

## 🔒 Security Note

With RLS disabled:
- ✅ Your backend can insert/update/delete freely
- ⚠️ Direct database access (using Supabase client) also unrestricted
- Your app security relies on **JWT authentication in backend**

For production, consider:
- Adding RLS policies that check JWT claims
- Using service role key for backend operations
- Keeping RLS enabled with proper policies

---

**After fixing RLS, file upload should work! Try it at:**
https://shari-frontend.vercel.app
