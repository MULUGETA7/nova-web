# 🚀 Quick Setup Commands

## ✅ Step 1: Create .env File

### Option A: Using PowerShell (Recommended)

Open PowerShell in the `NOVALABS` folder and run:

```powershell
@"
MONGO_URI=mongodb+srv://mulugeta7:YOUR_PASSWORD_HERE@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=development
JWT_SECRET=novalabs-secret-key-2025-change-this-in-production
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
"@ | Out-File -FilePath .env -Encoding utf8
```

**🚨 IMPORTANT:** Replace `YOUR_PASSWORD_HERE` with your actual MongoDB password before running!

---

### Option B: Manual Creation

1. Open Notepad or VS Code
2. Copy the content from `CREATE_ENV_FILE.txt` (lines 12-20)
3. Replace `<db_password>` with your actual password
4. Save as `.env` in the `NOVALABS` folder
5. Make sure it's saved as `.env` NOT `.env.txt`

---

## ✅ Step 2: Verify .env File Exists

```powershell
# Check if .env file was created
ls .env

# Preview the content (to verify)
Get-Content .env
```

You should see your MONGO_URI and other variables.

---

## ✅ Step 3: Test MongoDB Connection

```powershell
# Make sure you're in NOVALABS folder
cd N:\PROJECT\Nova lab\nova-finall\nova-finall\NOVALABS

# Start the server
npm start
```

---

## ✅ Expected Output (Success):

```
Connecting to MongoDB at: mongodb+srv://mulugeta7:***@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
MongoDB Connected Successfully
🚀 Server is running on http://localhost:5000 and accessible on the network.
```

---

## ❌ If You See Errors:

### Error: "Authentication failed"
**Solution:** Wrong password. Double-check your MongoDB password.

### Error: "querySrv ENODATA"
**Solution:** Check your internet connection or cluster URL.

### Error: "dotenv not found"
**Solution:** Make sure .env file is in the NOVALABS folder (not in root).

### Error: "MONGO_URI is not defined"
**Solution:** 
1. Check .env file exists: `ls .env`
2. Check it has content: `Get-Content .env`
3. Restart the server

---

## 🔑 Where to Find Your MongoDB Password

1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Click "Database Access" (left sidebar)
3. Find user "mulugeta7"
4. If you forgot the password:
   - Click "Edit" on the user
   - Click "Edit Password"
   - Generate a new password
   - **COPY IT IMMEDIATELY**
   - Update your .env file with the new password

---

## 📝 Password Special Characters

If your password contains special characters like: `@ # $ % & + =`

You need to URL encode them:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| #         | %23     |
| $         | %24     |
| %         | %25     |
| &         | %26     |
| +         | %2B     |
| =         | %3D     |

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- In .env: `mongodb+srv://mulugeta7:MyP%40ss%23123@cluster0...`

---

## ✅ All Done?

Once you see "MongoDB Connected Successfully", your backend is ready! 🎉

Next steps:
1. Keep the backend running
2. Open another terminal
3. Start the frontend: `cd nova-finall/nova-labs && npm start`
4. Start the admin: `cd nova-finall/nova_admin && npm start`

All three should be running:
- Backend: http://localhost:5000 ✅
- Frontend: http://localhost:3000 ✅
- Admin: http://localhost:3001 ✅

