# 🚀 Step-by-Step Guide: Change MongoDB & Cloudinary

**Project:** NovaLabs Backend  
**Date:** October 10, 2025

---

## 📋 Current Status

✅ **Cloudinary Package:** Installed but NOT configured  
✅ **Current Storage:** Local file storage (uploads/ folder)  
❌ **MongoDB:** Connection error - wrong cluster URL  
❌ **.env File:** Missing (needs to be created)

---

## 🗄️ PART 1: Fix/Change MongoDB

### Step 1.1: Create a New MongoDB Atlas Cluster (If Needed)

**Option A: If you DON'T have a MongoDB Atlas account:**

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with your email
4. Choose "Free Shared Cluster" (M0)
5. Select a cloud provider (AWS/Google/Azure)
6. Choose a region closest to you
7. Click "Create Cluster"
8. Wait 3-5 minutes for cluster creation

**Option B: If you HAVE a MongoDB Atlas account:**

1. Go to https://cloud.mongodb.com/
2. Log in
3. Select your project or create a new one
4. Click "Build a Database"
5. Choose "Free Shared" tier
6. Select region
7. Click "Create"

---

### Step 1.2: Get MongoDB Connection String

1. In MongoDB Atlas Dashboard, click **"Connect"** on your cluster
2. Click **"Connect your application"**
3. Select **Driver:** Node.js, **Version:** 5.5 or later
4. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT:** Replace `<username>` and `<password>` with your actual database credentials

---

### Step 1.3: Create Database User

1. In MongoDB Atlas, go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Authentication Method:** Password
4. Enter:
   - Username: `novalabs_admin` (or your choice)
   - Password: Click "Autogenerate Secure Password" OR create your own
   - **COPY AND SAVE THIS PASSWORD!**
5. Set privileges to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

---

### Step 1.4: Whitelist IP Address

1. In MongoDB Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Choose one:
   - **"Allow Access from Anywhere"** (easier for development) → 0.0.0.0/0
   - OR add your specific IP address
4. Click **"Confirm"**

---

### Step 1.5: Create .env File in Backend

Create file: `nova-finall/NOVALABS/.env`

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=NovaLabsCluster

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this to a random secure string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (we'll add this in Part 2)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Replace these values:**
- `YOUR_USERNAME` → your database username (e.g., novalabs_admin)
- `YOUR_PASSWORD` → the password you created/copied
- `YOUR_CLUSTER` → your cluster name (e.g., cluster0.xxxxx)

---

### Step 1.6: Test MongoDB Connection

1. Open terminal in `nova-finall/NOVALABS`
2. Run:
   ```bash
   npm start
   ```
3. You should see:
   ```
   MongoDB Connected Successfully
   🚀 Server is running on http://localhost:5000
   ```

✅ **MongoDB is now configured!**

---

## ☁️ PART 2: Setup Cloudinary (Optional but Recommended)

### Why Use Cloudinary?
- ✅ Automatic image optimization
- ✅ CDN delivery (faster loading)
- ✅ No need to store images on server
- ✅ Image transformations on-the-fly
- ✅ Free tier: 25GB storage, 25GB bandwidth/month

---

### Step 2.1: Create Cloudinary Account

1. Go to https://cloudinary.com/
2. Click **"Sign Up for Free"**
3. Register with email or Google
4. Verify your email
5. Complete the setup wizard

---

### Step 2.2: Get Cloudinary Credentials

1. Log in to Cloudinary Dashboard
2. You'll see your credentials on the homepage:
   - **Cloud Name:** `dxxxxxxxxx`
   - **API Key:** `123456789012345`
   - **API Secret:** `xxxxxxxxxxxxxxxxxxxx`
3. Copy these values

---

### Step 2.3: Update .env File

Open `nova-finall/NOVALABS/.env` and update:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

---

### Step 2.4: Update Upload Middleware

**Current:** Using local storage  
**New:** Using Cloudinary

Replace `nova-finall/NOVALABS/middleware/upload.js` with the new version that uses Cloudinary.

---

### Step 2.5: Update Frontend API URL (If Needed)

If you're using Cloudinary, images will be served from Cloudinary CDN, not from your server.

Update frontend `.env` file:

**For nova-labs frontend:**
Create/update: `nova-finall/nova-labs/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

**For nova_admin frontend:**
Create/update: `nova-finall/nova_admin/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🔒 SECURITY NOTES

⚠️ **IMPORTANT:** Never commit `.env` files to Git!

### Add to .gitignore

Make sure `.env` is in your `.gitignore`:

```
# Environment variables
.env
.env.local
.env.production
```

---

## ✅ Verification Checklist

### MongoDB
- [ ] Created MongoDB Atlas cluster
- [ ] Created database user with password
- [ ] Whitelisted IP address (0.0.0.0/0 for development)
- [ ] Copied connection string
- [ ] Created `.env` file with correct MONGO_URI
- [ ] Tested connection: `npm start` shows "MongoDB Connected Successfully"

### Cloudinary (Optional)
- [ ] Created Cloudinary account
- [ ] Copied Cloud Name, API Key, API Secret
- [ ] Updated `.env` file with Cloudinary credentials
- [ ] Updated upload.js middleware to use Cloudinary
- [ ] Tested image upload

---

## 🆘 Troubleshooting

### MongoDB Connection Issues

**Error:** `querySrv ENODATA`
- ✅ Check that you replaced `<username>` and `<password>` in connection string
- ✅ Check that you whitelisted your IP address
- ✅ Check that the cluster name is correct

**Error:** `Authentication failed`
- ✅ Verify username and password are correct
- ✅ Check that user has proper permissions

**Error:** `Connection timeout`
- ✅ Check your internet connection
- ✅ Verify firewall settings
- ✅ Try adding 0.0.0.0/0 to whitelist

---

### Cloudinary Issues

**Error:** `Invalid cloud_name`
- ✅ Check that CLOUDINARY_CLOUD_NAME is correct (no spaces)

**Error:** `Invalid API credentials`
- ✅ Verify API Key and API Secret are correct
- ✅ Make sure there are no extra spaces in .env file

---

## 📞 Need Help?

If you run into issues:
1. Check the terminal output for error messages
2. Verify all credentials are correct
3. Make sure .env file has no syntax errors
4. Test MongoDB connection separately first
5. Ask me for help with the specific error message!

---

## 🚀 Next Steps After Setup

Once both are configured:
1. Restart the backend server
2. Test API endpoints
3. Test image upload functionality
4. Check that images are stored properly
5. Verify frontend can fetch data from backend

Good luck! 🎉

