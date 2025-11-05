# 🚀 Quick Deployment Steps for ubuntu@196.190.251.203

## Prerequisites

- ✅ SSH access: `ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203`
- ✅ Local builds working
- ✅ MongoDB Atlas connection working

---

## 📋 Deployment Steps

### **Step 1: Build Frontend Applications Locally**

On your local machine:

```powershell
# Build frontend
cd nova-labs
npm run build
cd ..

# Build admin
cd nova_admin
npm run build
cd ..
```

---

### **Step 2: Upload Files to Server**

#### Option A: Using the deployment script (recommended)

```powershell
# Make script executable (if on Linux/Mac)
# chmod +x deploy.sh

# Run deployment script
bash deploy.sh
```

#### Option B: Manual upload

```powershell
# Upload backend (excluding node_modules)
scp -i .ssh/mulu_webserver -r NOVALABS ubuntu@196.190.251.203:/home/ubuntu/nova-finall/

# Upload frontend build
scp -i .ssh/mulu_webserver -r nova-labs/build ubuntu@196.190.251.203:/home/ubuntu/nova-finall/nova-labs/

# Upload admin build
scp -i .ssh/mulu_webserver -r nova_admin/build ubuntu@196.190.251.203:/home/ubuntu/nova-finall/nova_admin/
```

---

### **Step 3: Connect to Server and Set Up**

```bash
ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203
```

---

### **Step 4: Run Server Setup Script**

On the server:

```bash
cd /home/ubuntu/nova-finall
chmod +x setup-server.sh
bash setup-server.sh
```

This will:
- Install Node.js, PM2, Nginx
- Install backend dependencies
- Start backend with PM2

---

### **Step 5: Create Environment Files**

On the server, create the backend `.env` file:

```bash
cd /home/ubuntu/nova-finall/NOVALABS
nano .env
```

Paste this content (update with your values):

```env
MONGO_URI=mongodb+srv://mulugeta7:YClMYhlIfvLPXCAp@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-production-2025-CHANGE-THIS
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://196.190.251.203
ADMIN_URL=http://196.190.251.203:3001
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

---

### **Step 6: Restart Backend with New Environment**

```bash
pm2 restart nova-backend
pm2 save
```

---

### **Step 7: Configure Nginx**

Copy Nginx configurations to the server (you can do this from local machine):

```powershell
# Upload Nginx configs
scp -i .ssh/mulu_webserver nginx-nova-labs.conf ubuntu@196.190.251.203:/tmp/
scp -i .ssh/mulu_webserver nginx-nova-admin.conf ubuntu@196.190.251.203:/tmp/
scp -i .ssh/mulu_webserver nginx-api.conf ubuntu@196.190.251.203:/tmp/
```

On the server:

```bash
# Copy configs to Nginx
sudo cp /tmp/nginx-nova-labs.conf /etc/nginx/sites-available/nova-labs
sudo cp /tmp/nginx-nova-admin.conf /etc/nginx/sites-available/nova-admin
sudo cp /tmp/nginx-api.conf /etc/nginx/sites-available/nova-api

# Enable sites
sudo ln -s /etc/nginx/sites-available/nova-labs /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/nova-admin /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/nova-api /etc/nginx/sites-enabled/

# Remove default Nginx site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

### **Step 8: Verify Everything is Running**

```bash
# Check PM2 processes
pm2 status

# Check PM2 logs
pm2 logs nova-backend

# Check Nginx status
sudo systemctl status nginx

# Test backend API
curl http://localhost:5000

# Check if ports are listening
sudo netstat -tulpn | grep -E ':(80|5000|3001)'
```

---

### **Step 9: Access Your Applications**

- **Frontend:** http://196.190.251.203
- **Admin Panel:** http://196.190.251.203:3001
- **Backend API:** http://196.190.251.203:5000 or http://196.190.251.203/api (if using Nginx reverse proxy)

---

## 🔧 Useful Commands

### PM2 Commands
```bash
pm2 status              # Check all processes
pm2 logs nova-backend   # View backend logs
pm2 restart nova-backend # Restart backend
pm2 stop nova-backend   # Stop backend
pm2 monit               # Monitor resources
```

### Nginx Commands
```bash
sudo nginx -t                    # Test configuration
sudo systemctl restart nginx     # Restart Nginx
sudo systemctl status nginx      # Check status
sudo tail -f /var/log/nginx/error.log  # View error logs
```

### Firewall Commands
```bash
sudo ufw status          # Check firewall status
sudo ufw allow 80/tcp    # Allow HTTP
sudo ufw allow 443/tcp   # Allow HTTPS
```

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
cd /home/ubuntu/nova-finall/NOVALABS
pm2 logs nova-backend
# Check if .env file exists and has correct values
cat .env
```

### Frontend shows blank page?
- Check browser console for errors
- Verify Nginx is serving the correct directory
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### CORS errors?
- Update `FRONTEND_URL` and `ADMIN_URL` in backend `.env`
- Restart backend: `pm2 restart nova-backend`

### MongoDB connection failed?
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist (add server IP: `196.190.251.203`)
- Test connection: `mongosh "your-connection-string"`

### Port already in use?
```bash
# Find process using port
sudo lsof -i :5000
# Kill process
sudo kill -9 <PID>
```

---

## 📝 Next Steps (Optional)

### Set Up SSL with Let's Encrypt

If you have a domain name pointing to `196.190.251.203`:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d admin.yourdomain.com
```

### Set Up Domain Names

1. Point your domain to `196.190.251.203`
2. Update Nginx configs to use domain names
3. Update `.env` files with domain URLs
4. Restart services

---

## ✅ Deployment Complete!

Your applications should now be accessible:
- Frontend: http://196.190.251.203
- Admin: http://196.190.251.203:3001
- API: http://196.190.251.203:5000

If you need help with any step, let me know!

