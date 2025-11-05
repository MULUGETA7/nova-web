# 🚀 Nova Labs Deployment Guide

This guide covers deploying your **3-part application** to a production server:
- **Backend API** (NOVALABS) - Port 5000
- **Frontend** (nova-labs) - Port 3000
- **Admin Panel** (nova_admin) - Port 3001

---

## 📋 Pre-Deployment Checklist

- [ ] Update all environment variables for production
- [ ] Build frontend applications
- [ ] Test locally with production builds
- [ ] Secure your MongoDB connection
- [ ] Set up domain/SSL certificates (optional but recommended)

---

## 🎯 Deployment Options

### **Option 1: Traditional VPS Server (Linux/Ubuntu)** ⭐ Recommended for Beginners

### **Option 2: Docker Deployment** 🐳 Recommended for Easy Setup

### **Option 3: Cloud Platforms** ☁️ (AWS, Azure, DigitalOcean, etc.)

---

## 📝 Step-by-Step Deployment

### **STEP 1: Prepare Environment Variables**

#### **1.1 Backend (NOVALABS/.env)**

Create `.env` file in `NOVALABS` folder with production values:

```env
MONGO_URI=mongodb+srv://mulugeta7:YOUR_PASSWORD@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-production-2025-CHANGE-THIS
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
OPENAI_API_KEY=your_openai_key_if_needed
```

**⚠️ Important:**
- Change `JWT_SECRET` to a strong random string
- Update `FRONTEND_URL` and `ADMIN_URL` to your actual domains
- URL encode special characters in MongoDB password (e.g., `@` becomes `%40`)

#### **1.2 Frontend (nova-labs/.env)**

Create `.env` file in `nova-labs` folder:

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

#### **1.3 Admin Panel (nova_admin/.env)**

Create `.env` file in `nova_admin` folder:

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

---

### **STEP 2: Build Frontend Applications**

#### **2.1 Build Frontend (nova-labs)**

```bash
cd nova-labs
npm install
npm run build
```

This creates a `build` folder with production-ready static files.

#### **2.2 Build Admin Panel (nova_admin)**

```bash
cd nova_admin
npm install
npm run build
```

This creates a `build` folder with production-ready static files.

---

### **STEP 3: Choose Your Deployment Method**

---

## 🔧 **METHOD 1: Traditional VPS Deployment** (Ubuntu/Linux)

### **3.1 Connect to Your Server**

```bash
ssh user@your-server-ip
```

### **3.2 Install Node.js & NPM**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### **3.3 Install PM2 (Process Manager)**

```bash
sudo npm install -g pm2
```

### **3.4 Clone/Upload Your Project**

```bash
# Option A: Using Git
git clone your-repo-url
cd nova-finall

# Option B: Upload via SCP
# scp -r ./nova-finall user@server-ip:/home/user/
```

### **3.5 Set Up Backend (NOVALABS)**

```bash
cd NOVALABS

# Install dependencies
npm install --production

# Create .env file (copy from your local .env with production values)
nano .env
# Paste your production .env content and save (Ctrl+X, Y, Enter)

# Start with PM2
pm2 start server.js --name "nova-backend"

# Save PM2 configuration
pm2 save

# Configure PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

### **3.6 Set Up Frontend (nova-labs)**

#### **Option A: Serve with Nginx (Recommended)**

```bash
# Install Nginx
sudo apt install nginx -y

# Copy build files to Nginx directory
sudo cp -r nova-labs/build/* /var/www/html/

# OR create a separate site
sudo mkdir -p /var/www/nova-labs
sudo cp -r nova-labs/build/* /var/www/nova-labs/
```

Create Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/nova-labs
```

Paste this configuration (adjust domain/paths):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/nova-labs;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/nova-labs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### **Option B: Serve with Node.js (PM2)**

```bash
# Install serve package
npm install -g serve

# Serve the build folder
pm2 serve nova-labs/build 3000 --name "nova-frontend" --spa
pm2 save
```

### **3.7 Set Up Admin Panel (nova_admin)**

```bash
# Copy build files
sudo mkdir -p /var/www/nova-admin
sudo cp -r nova_admin/build/* /var/www/nova-admin/
```

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/nova-admin
```

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    
    root /var/www/nova-admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/nova-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### **3.8 Configure Nginx Reverse Proxy for Backend**

Create API config:

```bash
sudo nano /etc/nginx/sites-available/nova-api
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/nova-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### **3.9 Set Up SSL with Let's Encrypt (Optional but Recommended)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for all domains
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d admin.yourdomain.com -d api.yourdomain.com

# Auto-renewal is set up automatically
```

### **3.10 Configure Firewall**

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🐳 **METHOD 2: Docker Deployment** (Easier Alternative)

### **3.1 Create docker-compose.yml**

Create this file in the root of your project:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./NOVALABS
      dockerfile: Dockerfile
    container_name: nova-backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - PORT=5000
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - FRONTEND_URL=${FRONTEND_URL}
      - ADMIN_URL=${ADMIN_URL}
    restart: unless-stopped
    volumes:
      - ./NOVALABS/uploads:/app/uploads

  frontend:
    build:
      context: ./nova-labs
      dockerfile: Dockerfile
    container_name: nova-frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=${REACT_APP_API_URL}
    restart: unless-stopped

  admin:
    build:
      context: ./nova_admin
      dockerfile: Dockerfile
    container_name: nova-admin
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_API_URL=${REACT_APP_API_URL}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: nova-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./nova-labs/build:/var/www/nova-labs
      - ./nova_admin/build:/var/www/nova-admin
    restart: unless-stopped
    depends_on:
      - backend
      - frontend
      - admin
```

### **3.2 Create nginx.conf**

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;
        server_name yourdomain.com;
        
        location / {
            root /var/www/nova-labs;
            try_files $uri $uri/ /index.html;
        }
    }

    server {
        listen 80;
        server_name admin.yourdomain.com;
        
        location / {
            root /var/www/nova-admin;
            try_files $uri $uri/ /index.html;
        }
    }

    server {
        listen 80;
        server_name api.yourdomain.com;
        
        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### **3.3 Update Dockerfiles**

**Nova-labs Dockerfile** (needs to be created):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Install serve to run production build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
```

### **3.4 Deploy with Docker**

```bash
# On your server
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## ☁️ **METHOD 3: Cloud Platform Deployment**

### **DigitalOcean App Platform**

1. Push code to GitHub
2. Go to DigitalOcean → Create App
3. Connect GitHub repository
4. Add environment variables in settings
5. Deploy automatically

### **AWS EC2**

Follow **METHOD 1** (Traditional VPS) - AWS EC2 is essentially a VPS.

### **Heroku**

```bash
# Install Heroku CLI
# Create Heroku apps for each service
heroku create nova-backend
heroku create nova-frontend
heroku create nova-admin

# Set environment variables
heroku config:set MONGO_URI=... --app nova-backend

# Deploy
git push heroku main
```

---

## ✅ **POST-DEPLOYMENT STEPS**

### **1. Test All Services**

- [ ] Frontend loads: `https://yourdomain.com`
- [ ] Admin panel loads: `https://admin.yourdomain.com`
- [ ] API responds: `https://api.yourdomain.com/api/auth/test`
- [ ] Images load correctly
- [ ] Forms submit successfully

### **2. Monitor Application**

```bash
# PM2 monitoring
pm2 status
pm2 logs

# Docker monitoring
docker-compose ps
docker-compose logs -f
```

### **3. Set Up Backups**

- MongoDB: Configure automated backups in MongoDB Atlas
- Files: Backup uploads folder regularly
- Database: Export database periodically

### **4. Security Checklist**

- [ ] Changed default JWT_SECRET
- [ ] MongoDB password is strong
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Environment variables not committed to Git
- [ ] PM2/Docker running as non-root user

---

## 🔍 **TROUBLESHOOTING**

### **Backend not starting?**
```bash
cd NOVALABS
pm2 logs nova-backend
# Check .env file exists and has correct values
```

### **Frontend shows blank page?**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Check Nginx configuration

### **CORS errors?**
- Update `FRONTEND_URL` and `ADMIN_URL` in backend `.env`
- Restart backend: `pm2 restart nova-backend`

### **MongoDB connection failed?**
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist (add server IP)
- URL encode special characters in password

### **Port already in use?**
```bash
# Find process using port
sudo lsof -i :5000
# Kill process
sudo kill -9 <PID>
```

---

## 📞 **Need Help?**

Tell me which deployment method you want to use, and I can help you:
1. Generate specific configuration files
2. Debug deployment issues
3. Optimize for your server
4. Set up CI/CD pipelines

**Ready to deploy? Let me know:**
- Which method do you prefer? (VPS/Docker/Cloud)
- Do you have server access?
- What's your domain/server IP?

