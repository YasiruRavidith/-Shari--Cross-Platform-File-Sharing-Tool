# 🔍 How to Find Your Supabase Connection String

## Your Supabase Project
✅ Project URL: `https://iyaakahzlqphttpuwxog.supabase.co`

---

## 📍 Step-by-Step: Find DATABASE_URL

### Method 1: From Database Settings (Recommended)

1. **Go to your Supabase project dashboard**
   - URL: https://supabase.com/dashboard/project/iyaakahzlqphttpuwxog

2. **Click on "Project Settings"**
   - Look for the ⚙️ (gear) icon in the LEFT sidebar
   - Click it

3. **Click "Database"**
   - In the left menu under "Project Settings"
   - You'll see database settings

4. **Scroll down to find "Connection String"**
   - You should see a section called "Connection String" or "Connection Info"
   - There will be several tabs or options

5. **Look for these tabs:**
   - **URI** (this is what you want!)
   - JDBC
   - Psql
   - .NET
   - etc.

6. **Click "URI" or "Postgres"**
   - Copy the connection string
   - It will look like ONE of these formats:

   **Format A (Newer Supabase projects):**
   ```
   postgresql://postgres.iyaakahzlqphttpuwxog:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

   **Format B (Older format):**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
   ```

7. **Replace the password placeholder:**
   - Find `[YOUR-PASSWORD]` in the string
   - Replace it with your actual database password
   - The password is what you chose when creating the project

---

## 🔐 What If You Don't See "Connection String"?

### Alternative Method: Build It Manually

If you can't find the connection string section, you can build it yourself:

**For your project, use this format:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

**Just replace `[YOUR-PASSWORD]` with your actual database password!**

---

## 📋 All The Information You Need

Based on your project URL (`https://iyaakahzlqphttpuwxog.supabase.co`):

### 1. SUPABASE_URL (You have this!)
```
https://iyaakahzlqphttpuwxog.supabase.co
```
✅ This is correct!

### 2. DATABASE_URL (Build it yourself if needed)
```
postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```
⚠️ Replace `YOUR_ACTUAL_PASSWORD` with the password you created for the database

### 3. SUPABASE_KEY (Get from API settings)
- Go to: Project Settings → API
- Look for "Project API keys"
- Copy the "anon" "public" key
- It's a long string starting with "eyJ..."

### 4. JWT_SECRET (Generate this)
Run this command in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎯 Where to Find Each Setting

| What You Need | Where to Find It |
|--------------|------------------|
| **SUPABASE_URL** | ✅ You have it: `https://iyaakahzlqphttpuwxog.supabase.co` |
| **DATABASE_URL** | Settings → Database → Connection String → URI tab<br>OR build manually (see above) |
| **SUPABASE_KEY** | Settings → API → Project API keys → "anon public" |
| **JWT_SECRET** | Generate with node command (see above) |

---

## 🔍 Can't Find "Database" in Settings?

Try these alternatives:

### Option A: Look for "Database" Tab in Main Navigation
Some Supabase versions have "Database" as a main tab (not under Settings)

### Option B: Use Connection Pooler Settings
1. Go to "Database" in main navigation
2. Look for "Connection Pooler" or "Pooler"
3. The connection string might be there

### Option C: Check Email
Supabase sometimes sends connection details via email when you create a project

### Option D: Database Password Reset
If you forgot your password:
1. Go to Settings → Database
2. Look for "Reset database password"
3. Create a new password
4. Use that password in your connection string

---

## ✅ Your Complete .env File Should Look Like:

```env
DATABASE_URL=postgresql://postgres:your_actual_password@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
JWT_SECRET=generated_random_string_from_node_command
SUPABASE_URL=https://iyaakahzlqphttpuwxog.supabase.co
SUPABASE_KEY=eyJhbGc...your_actual_anon_key
```

---

## 🆘 Still Can't Find It?

### Quick Test: Try This Connection String Format

Use this and replace YOUR_PASSWORD:
```
postgresql://postgres:YOUR_PASSWORD@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres
```

Where `YOUR_PASSWORD` is the database password you chose when creating the project.

---

## 📸 What You Should See in Supabase Dashboard

When you click Settings → Database, look for sections like:

- **Connection Info**
- **Connection String**
- **Connection Pooling**
- **Direct Connection**

Any of these sections should have the PostgreSQL connection string.

---

## 💡 Pro Tips

1. **Password Issues?**
   - If you forgot your database password, you can reset it in Settings → Database
   - Look for "Database Password" or "Reset Database Password"

2. **Connection String Hidden?**
   - Some fields show "••••••" (hidden)
   - Look for an "eye" icon 👁️ to reveal the string
   - Or a "Copy" button to copy it

3. **Multiple Connection Strings?**
   - You might see "Transaction Mode" and "Session Mode"
   - Either one works, but "Session Mode" is more compatible
   - Both use port 6543 (pooler) or 5432 (direct)

---

**Need more help? Let me know what you see in your Supabase dashboard!**
