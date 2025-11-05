# ✅ Quick Setup Checklist

## 🎯 Step-by-Step (Do This Now!)

### ✅ Step 1: Fix MongoDB (REQUIRED)

1. [ ] Go to https://cloud.mongodb.com/ and log in
2. [ ] Create a new cluster OR use existing one
3. [ ] Go to "Database Access" → Create user with password → **SAVE PASSWORD**
4. [ ] Go to "Network Access" → Add IP Address → Select "0.0.0.0/0"
5. [ ] Click "Connect" on your cluster → "Connect your application"
6. [ ] Copy the connection string
7. [ ] Create `.env` file in `NOVALABS` folder (copy from ENV_TEMPLATE.txt)
8. [ ] Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, `YOUR_CLUSTER` in `.env`
9. [ ] Run `npm start` to test connection

**Result:** Should see "MongoDB Connected Successfully" ✅

---

### ✅ Step 2: Setup Cloudinary (OPTIONAL)

**Option A: Use Cloudinary (Recommended for production)**

1. [ ] Go to https://cloudinary.com/ and sign up
2. [ ] Copy your Cloud Name, API Key, API Secret from dashboard
3. [ ] Update `.env` file with Cloudinary credentials
4. [ ] Backup current upload.js: `cp middleware/upload.js middleware/upload-local-backup.js`
5. [ ] Replace upload.js with cloudinary version:
   ```bash
   cp middleware/upload-cloudinary.js middleware/upload.js
   ```
6. [ ] Restart server: `npm start`

**Option B: Keep Local Storage (Current setup - works fine for development)**

Do nothing! Your current setup already works with local file storage in the `uploads/` folder.

---

## 📁 Files You Need to Create/Edit

### Create `.env` file:
```
Location: nova-finall/NOVALABS/.env
Template: See ENV_TEMPLATE.txt
```

### Edit if using Cloudinary:
```
Location: nova-finall/NOVALABS/middleware/upload.js
Replace with: upload-cloudinary.js content
```

---

## 🧪 Testing

### Test MongoDB:
```bash
cd nova-finall/NOVALABS
npm start
```
Expected output:
```
Connecting to MongoDB at: mongodb+srv://...
MongoDB Connected Successfully
🚀 Server is running on http://localhost:5000
```

### Test Cloudinary (if enabled):
1. Start backend
2. Open Postman or use frontend
3. Upload an image
4. Check Cloudinary dashboard → Media Library → Should see uploaded image

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "querySrv ENODATA" | Wrong cluster URL or IP not whitelisted |
| "Authentication failed" | Wrong username/password in .env |
| ".env file not found" | Make sure .env is in NOVALABS folder (not root) |
| "Invalid cloud_name" | Wrong Cloudinary credentials in .env |
| Server starts but no DB connection | Check .env file has correct MONGO_URI |

---

## 🎯 Priority Order

1. **FIRST:** Fix MongoDB (backend won't work without it)
2. **LATER:** Setup Cloudinary (optional improvement)

---

## 📞 Current MongoDB Issue

Your current error:
```
Error connecting to MongoDB: querySrv ENODATA _mongodb._tcp.realestatecluster.7gesc.mongodb.net
```

**This means:** The old MongoDB cluster doesn't exist or is unreachable.

**Solution:** Follow Step 1 above to create new connection or fix existing one.

---

## ✅ What's Working Now

- ✅ Frontend (nova-labs): http://localhost:3000
- ✅ Admin (nova_admin): http://localhost:3001  
- ✅ Backend server: http://localhost:5000
- ❌ Database connection: **NEEDS FIXING**

---

**Ready to start? Begin with Step 1: Fix MongoDB!** 🚀

