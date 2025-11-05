# ⚡ Quick Start - Docker Deployment

## 📊 Understanding Your Server

You already have these containers running:
- Port 3000: matrixx-website
- Port 3001: mattrix-website-admin
- Port 3011: addis-music-award-frontend
- Port 3012: addis-music-admin-frontend
- Port 3014: 7-24
- Port 5011: addismusic-backend-1
- Port 8080: mattrix-backend

**Nova Labs will use:**
- **Port 3020**: Frontend (won't conflict with 3000)
- **Port 3021**: Admin (won't conflict with 3001)
- **Port 5020**: Backend (won't conflict with 5011)

---

## 🚀 Deploy in 3 Steps

### **Step 1: Create .env File**

Create `.env` in project root:

```env
MONGO_URI=mongodb+srv://mulugeta7:YClMYhlIfvLPXCAp@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
JWT_SECRET=CHANGE-THIS-TO-RANDOM-STRING-MIN-32-CHARS
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=http://196.190.251.203:3020
ADMIN_URL=http://196.190.251.203:3021
REACT_APP_API_URL=http://196.190.251.203:5020
```

**⚠️ Change `JWT_SECRET` to something random!**

### **Step 2: Run Deployment**

**PowerShell (Windows):**
```powershell
.\docker-deploy.ps1
```

**Bash (Linux/Mac):**
```bash
chmod +x docker-deploy.sh
./docker-deploy.sh
```

### **Step 3: Access Your Apps**

- Frontend: http://196.190.251.203:3020
- Admin: http://196.190.251.203:3021
- API: http://196.190.251.203:5020

---

## 🛠️ Common Commands

```bash
# Check status
ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203
cd /home/ubuntu/nova-finall
docker-compose ps

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild after changes
docker-compose up -d --build
```

---

## 📖 Full Documentation

See **DOCKER_DEPLOYMENT.md** for complete guide.

