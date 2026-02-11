# Deploy Frontend Only Script
# Server: ubuntu@196.190.251.203

Write-Host "🚀 Deploying Nova Frontend..." -ForegroundColor Green
Write-Host ""

$SERVER_USER = "ubuntu"
$SERVER_IP = "196.190.251.203"
$SERVER_PATH = "/home/ubuntu/nova-finall"
$SSH_KEY = "mulu_webserver_key_new"

# Check if SSH key exists
if (-Not (Test-Path $SSH_KEY)) {
    Write-Host "❌ ERROR: SSH key not found at $SSH_KEY" -ForegroundColor Red
    Write-Host "Please ensure the SSH key exists and try again." -ForegroundColor Red
    exit 1
}

# Check if frontend directory exists
if (-Not (Test-Path "frontend")) {
    Write-Host "❌ ERROR: frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Step 1: Build Frontend
Write-Host "📦 Step 1: Building frontend..." -ForegroundColor Yellow
Set-Location frontend

# Clean old build directory
Write-Host "Cleaning old build directory..." -ForegroundColor Cyan
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
}

Write-Host "Running npm install..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host "Running npm run build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

# Check if build directory exists
if (-Not (Test-Path "frontend/build")) {
    Write-Host "❌ ERROR: Build directory not found! Build may have failed." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!`n" -ForegroundColor Green

# Step 2: Clear old build and upload new build to server
Write-Host "📤 Step 2: Uploading to server...`n" -ForegroundColor Yellow

# Upload updated docker-compose.yml if it exists (to ensure volume mount is configured)
if (Test-Path "docker-compose.yml") {
    Write-Host "Uploading updated docker-compose.yml..." -ForegroundColor Cyan
    scp -i $SSH_KEY "docker-compose.yml" "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/"
}

Write-Host "Clearing old build directory on server..." -ForegroundColor Cyan
ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "rm -rf $SERVER_PATH/frontend/build"

Write-Host "Creating directory on server..." -ForegroundColor Cyan
ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH/frontend/build"

# Upload build
Write-Host "Uploading frontend build..." -ForegroundColor Cyan
# Use robocopy or scp without wildcard - upload the entire build directory
scp -i $SSH_KEY -r "frontend/build" "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/frontend/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Upload completed!`n" -ForegroundColor Green

# Step 4: Restart/recreate frontend container to serve new build
Write-Host "🔄 Step 3: Restarting frontend container..." -ForegroundColor Yellow
Write-Host "Container will serve the newly uploaded build (build directory is mounted as volume)..." -ForegroundColor Cyan
# Recreate container if docker-compose.yml was updated, otherwise just restart
ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && docker-compose up -d --force-recreate nova-frontend || docker-compose restart nova-frontend"

Write-Host ""
Write-Host "✅ Frontend deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your frontend should be available at: http://196.190.251.203:3020" -ForegroundColor Green
Write-Host ""

