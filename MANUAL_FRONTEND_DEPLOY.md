# Manual Frontend Deployment Instructions

## ✅ Build is Complete!
Your frontend build is ready in: `Nova-frontend/build`

## 📤 Upload to Server

### Option A: Using FileZilla or WinSCP (Easiest)

1. **Open FileZilla or WinSCP**
2. **Create SFTP connection:**
   - Host: `196.190.251.203`
   - Username: `ubuntu`
   - Key file: `mulu_webserver_key` (or `mulu_webserver_key.pem`)
   - Port: `22`

3. **Navigate to:** `/home/ubuntu/nova-finall/Nova-frontend/`

4. **Upload the entire `build` folder** from your local `Nova-frontend/build` directory

### Option B: Using PowerShell (if you have PuTTY or WSL)

If you have WSL installed:
```powershell
wsl scp -i mulu_webserver_key -r Nova-frontend/build ubuntu@196.190.251.203:/home/ubuntu/nova-finall/Nova-frontend/
```

### Option C: Convert Key Format (Advanced)

Convert the OpenSSH key to RSA format that Windows supports:

```powershell
# Using WSL or Git Bash
ssh-keygen -p -f mulu_webserver_key -m PEM
```

Then use the converted key.

## 🔄 After Upload - Restart Container

Once uploaded, connect to server and restart:

```powershell
ssh -i mulu_webserver_key ubuntu@196.190.251.203
cd /home/ubuntu/nova-finall
docker-compose restart nova-frontend
```

Or if SSH works, run this from PowerShell:
```powershell
ssh -i mulu_webserver_key ubuntu@196.190.251.203 "cd /home/ubuntu/nova-finall && docker-compose restart nova-frontend"
```

## ✅ Verify

Visit: http://196.190.251.203:3020

