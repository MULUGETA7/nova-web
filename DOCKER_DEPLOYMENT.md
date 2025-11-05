# 🐳 Docker Deployment Guide for Nova Labs

## 📊 Your Existing Containers (No Conflicts!)

Based on your server, these ports are already in use:
- **Port 3000**: matrixx-website
- **Port 3001**: mattrix-website-admin  
- **Port 3011**: addis-music-award-frontend
- **Port 3012**: addis-music-admin-frontend
- **Port 3014**: 7-24
- **Port 5011**: addismusic-backend-1
- **Port 8080**: mattrix-backend

## ✅ Nova Labs Will Use (No Conflicts!)

- **Port 3020**: Nova Labs Frontend
- **Port 3021**: Nova Labs Admin Panel
- **Port 5020**: Nova Labs Backend API

---

## 🚀 Quick Deployment

### **Step 1: Create .env File**

Create `.env` in the project root:

```env
MONGO_URI=mongodb+srv://mulugeta7:YClMYhlIfvLPXCAp@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
JWT_SECRET=CHANGE-THIS-TO-RANDOM-STRING-AT-LEAST-32-CHARACTERS
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=http://196.190.251.203:3020
ADMIN_URL=http://196.190.251.203:3021
REACT_APP_API_URL=http://196.190.251.203:5020
OPENAI_API_KEY=
```

**⚠️ IMPORTANT:** Change `JWT_SECRET` to a random secure string (at least 32 characters)

### **Step 2: Run Deployment Script**

```bash
# Make script executable
chmod +x docker-deploy.sh

# Run deployment
./docker-deploy.sh
```

**Or manually:**

```bash
# Upload files
scp -i .ssh/mulu_webserver -r . ubuntu@196.190.251.203:/home/ubuntu/nova-finall/

# Connect and deploy
ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203
cd /home/ubuntu/nova-finall
docker-compose up -d --build
```

---

## 📍 Access Your Applications

After deployment:
- **Frontend**: http://196.190.251.203:3020
- **Admin Panel**: http://196.190.251.203:3021
- **Backend API**: http://196.190.251.203:5020/api

---

## 🛠️ Docker Commands

### **View Running Containers**

```bash
docker-compose ps
# or
docker ps
```

### **View Logs**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nova-backend
docker-compose logs -f nova-frontend
docker-compose logs -f nova-admin
```

### **Restart Services**

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart nova-backend
```

### **Stop Services**

```bash
docker-compose down
```

### **Rebuild and Restart**

```bash
docker-compose up -d --build
```

### **View Container Status**

```bash
docker-compose ps
docker stats nova-labs-backend nova-labs-frontend nova-labs-admin
```

---

## 🔧 Configuration Files

### **docker-compose.yml**
- Defines all three services (backend, frontend, admin)
- Sets up networking between containers
- Configures ports and volumes

### **Dockerfiles**
- `NOVALABS/Dockerfile` - Backend
- `nova-labs/Dockerfile` - Frontend  
- `nova_admin/Dockerfile` - Admin

### **Environment Variables**
- All config via `.env` file
- Never commit `.env` to Git!

---

## 🐛 Troubleshooting

### **Containers won't start?**

```bash
# Check logs
docker-compose logs

# Check if ports are available
sudo netstat -tulpn | grep -E ':(3020|3021|5020)'

# Rebuild containers
docker-compose up -d --build --force-recreate
```

### **Backend connection issues?**

```bash
# Check backend logs
docker-compose logs nova-backend

# Test MongoDB connection
docker-compose exec nova-backend node -e "require('./config/db')"
```

### **Frontend can't reach API?**

1. Check `REACT_APP_API_URL` in `.env`
2. Verify backend is running: `docker-compose ps`
3. Check CORS settings in backend
4. Rebuild frontend: `docker-compose up -d --build nova-frontend`

### **Port already in use?**

```bash
# Find what's using the port
sudo lsof -i :3020
sudo lsof -i :3021
sudo lsof -i :5020

# Change ports in docker-compose.yml if needed
```

### **Update code and redeploy?**

```bash
# Upload new files
scp -i .ssh/mulu_webserver -r ./ ubuntu@196.190.251.203:/home/ubuntu/nova-finall/

# On server, rebuild
cd /home/ubuntu/nova-finall
docker-compose up -d --build
```

---

## 🔄 Update Process

When you make changes:

1. **Local changes**
   ```bash
   # Make your code changes locally
   ```

2. **Upload to server**
   ```bash
   scp -i .ssh/mulu_webserver -r ./ ubuntu@196.190.251.203:/home/ubuntu/nova-finall/
   ```

3. **Rebuild on server**
   ```bash
   ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203
   cd /home/ubuntu/nova-finall
   docker-compose up -d --build
   ```

---

## 📊 Container Architecture

```
┌─────────────────────────────────────────┐
│         Your Server (196.190.251.203)   │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ Port 3020    │  │ Port 3021    │    │
│  │ Nova Frontend│  │ Nova Admin   │    │
│  └──────┬───────┘  └──────┬───────┘    │
│         │                 │             │
│         └────────┬────────┘             │
│                  │                       │
│         ┌────────▼───────┐              │
│         │ Port 5020      │              │
│         │ Nova Backend  │              │
│         └────────────────┘              │
│                  │                       │
│         ┌────────▼───────┐              │
│         │ MongoDB Atlas  │              │
│         │ (Cloud)        │              │
│         └────────────────┘              │
└─────────────────────────────────────────┘
```

---

## ✅ Deployment Checklist

- [ ] Created `.env` file with production values
- [ ] Changed `JWT_SECRET` to secure random string
- [ ] Uploaded files to server
- [ ] Built and started Docker containers
- [ ] Verified all three services are running
- [ ] Tested frontend: http://196.190.251.203:3020
- [ ] Tested admin: http://196.190.251.203:3021
- [ ] Tested API: http://196.190.251.203:5020/api
- [ ] Checked logs for errors

---

## 🎯 What Happens During Deployment

1. **Upload**: Files are sent to server
2. **Build**: Docker builds images for each service
3. **Start**: Containers are created and started
4. **Network**: Containers can communicate internally
5. **Expose**: Ports are mapped to server ports

---

## 📞 Need Help?

Run these commands to diagnose:

```bash
# Check all containers
docker-compose ps

# Check logs
docker-compose logs --tail=50

# Check resource usage
docker stats

# Test API endpoint
curl http://196.190.251.203:5020
```

Your Nova Labs apps are now running alongside your existing containers without any conflicts! 🎉

