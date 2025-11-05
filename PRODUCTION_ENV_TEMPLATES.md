# Production Environment Variables

## Backend (NOVALABS/.env)

Create this file on the server at: `/home/ubuntu/nova-finall/NOVALABS/.env`

```env
MONGO_URI=mongodb+srv://mulugeta7:YClMYhlIfvLPXCAp@cluster0.erc7m.mongodb.net/NovaLabs?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-production-2025-CHANGE-THIS-TO-SOMETHING-RANDOM
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://196.190.251.203
ADMIN_URL=http://196.190.251.203:3001
OPENAI_API_KEY=your_openai_key_if_needed
```

**⚠️ Important Changes:**
1. Change `JWT_SECRET` to a strong random string (at least 32 characters)
2. Update `FRONTEND_URL` and `ADMIN_URL` to match your actual URLs
3. Add your Cloudinary credentials if you're using image uploads
4. If you have a domain, use that instead of IP address

---

## Frontend (nova-labs/.env)

Create this file on the server at: `/home/ubuntu/nova-finall/nova-labs/.env`

```env
REACT_APP_API_URL=http://196.190.251.203:5000
```

**Or if using Nginx reverse proxy:**
```env
REACT_APP_API_URL=http://196.190.251.203/api
```

**Note:** This file is optional since the frontend is already built. If you rebuild on the server, you'll need this.

---

## Admin Panel (nova_admin/.env)

Create this file on the server at: `/home/ubuntu/nova-finall/nova_admin/.env`

```env
REACT_APP_API_URL=http://196.190.251.203:5000
```

**Or if using Nginx reverse proxy:**
```env
REACT_APP_API_URL=http://196.190.251.203/api
```

**Note:** This file is optional since the admin is already built. If you rebuild on the server, you'll need this.

---

## How to Create .env Files on Server

### Option 1: Using SSH

```bash
ssh -i .ssh/mulu_webserver ubuntu@196.190.251.203

# Navigate to backend
cd /home/ubuntu/nova-finall/NOVALABS
nano .env
# Paste the backend .env content, save (Ctrl+X, Y, Enter)

# For frontend (if rebuilding)
cd /home/ubuntu/nova-finall/nova-labs
nano .env
# Paste frontend .env content

# For admin (if rebuilding)
cd /home/ubuntu/nova-finall/nova_admin
nano .env
# Paste admin .env content
```

### Option 2: Using SCP (from your local machine)

```bash
# Create .env files locally first, then upload:

# Backend
scp -i .ssh/mulu_webserver NOVALABS/.env ubuntu@196.190.251.203:/home/ubuntu/nova-finall/NOVALABS/.env

# Frontend (if needed)
scp -i .ssh/mulu_webserver nova-labs/.env ubuntu@196.190.251.203:/home/ubuntu/nova-finall/nova-labs/.env

# Admin (if needed)
scp -i .ssh/mulu_webserver nova_admin/.env ubuntu@196.190.251.203:/home/ubuntu/nova-finall/nova_admin/.env
```

---

## Security Checklist

- [ ] Changed `JWT_SECRET` to a strong random value
- [ ] MongoDB password is secure and not exposed
- [ ] `.env` files are not committed to Git
- [ ] Cloudinary credentials are set (if using image uploads)
- [ ] Firewall is configured (ports 22, 80, 443)
- [ ] SSL certificates installed (if using domain)

