# Nova Labs Docker Deployment Script (PowerShell)
# For Windows deployment to ubuntu@196.190.251.203

Write-Host "🚀 Starting Nova Labs Docker Deployment..." -ForegroundColor Green
Write-Host ""

$SERVER_USER = "ubuntu"
$SERVER_IP = "196.190.251.203"
$SERVER_PATH = "/home/ubuntu/nova-finall"
$SSH_KEY = ".ssh/mulu_webserver"

# Check SSH key
if (-Not (Test-Path $SSH_KEY)) {
    Write-Host "❌ ERROR: SSH key not found at $SSH_KEY" -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating template..." -ForegroundColor Yellow
    @"
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
"@ | Out-File -FilePath ".env" -Encoding utf8
    
    Write-Host "✅ .env template created. Please edit it and update JWT_SECRET!" -ForegroundColor Yellow
    Write-Host "   File: $(Get-Location)\.env" -ForegroundColor Cyan
    exit 1
}

Write-Host "📋 Port Configuration:" -ForegroundColor Cyan
Write-Host "   Frontend: 3020 (avoids conflict with matrixx-website on 3000)" -ForegroundColor Green
Write-Host "   Admin: 3021 (avoids conflict with mattrix-website-admin on 3001)" -ForegroundColor Green
Write-Host "   Backend: 5020 (avoids conflict with addismusic-backend on 5011)" -ForegroundColor Green
Write-Host ""

# Create directory on server
Write-Host "📤 Step 1: Creating directory on server..." -ForegroundColor Yellow
ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH" 2>&1 | Out-Null

# Upload files
Write-Host "📤 Step 2: Uploading files..." -ForegroundColor Yellow

# Upload docker-compose.yml and Dockerfiles
Write-Host "   Uploading Docker configuration..." -ForegroundColor Cyan
scp -i $SSH_KEY docker-compose.yml "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/" 2>&1 | Out-Null
scp -i $SSH_KEY NOVALABS/Dockerfile "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/NOVALABS/" 2>&1 | Out-Null
scp -i $SSH_KEY nova-labs/Dockerfile "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/nova-labs/" 2>&1 | Out-Null
scp -i $SSH_KEY nova_admin/Dockerfile "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/nova_admin/" 2>&1 | Out-Null

# Upload backend (excluding node_modules, uploads, .env)
Write-Host "   Uploading backend..." -ForegroundColor Cyan
Get-ChildItem -Path "NOVALABS" -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "uploads" -and
    $_.FullName -notmatch "\.env" -and
    $_.FullName -notmatch "\.git"
} | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\NOVALABS\", "").Replace("\", "/")
    if (-Not $_.PSIsContainer) {
        $targetDir = "$SERVER_PATH/NOVALABS/" + (Split-Path $relativePath -Parent)
        ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p '$targetDir'" 2>&1 | Out-Null
        scp -i $SSH_KEY $_.FullName "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/NOVALABS/$relativePath" 2>&1 | Out-Null
    }
}

# Upload frontend source
Write-Host "   Uploading frontend source..." -ForegroundColor Cyan
Get-ChildItem -Path "nova-labs" -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "build" -and
    $_.FullName -notmatch "\.git"
} | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\nova-labs\", "").Replace("\", "/")
    if (-Not $_.PSIsContainer) {
        $targetDir = "$SERVER_PATH/nova-labs/" + (Split-Path $relativePath -Parent)
        ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p '$targetDir'" 2>&1 | Out-Null
        scp -i $SSH_KEY $_.FullName "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/nova-labs/$relativePath" 2>&1 | Out-Null
    }
}

# Upload admin source
Write-Host "   Uploading admin source..." -ForegroundColor Cyan
Get-ChildItem -Path "nova_admin" -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "build" -and
    $_.FullName -notmatch "\.git"
} | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\nova_admin\", "").Replace("\", "/")
    if (-Not $_.PSIsContainer) {
        $targetDir = "$SERVER_PATH/nova_admin/" + (Split-Path $relativePath -Parent)
        ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p '$targetDir'" 2>&1 | Out-Null
        scp -i $SSH_KEY $_.FullName "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/nova_admin/$relativePath" 2>&1 | Out-Null
    }
}

# Upload .env
Write-Host "   Uploading .env file..." -ForegroundColor Cyan
scp -i $SSH_KEY .env "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/.env" 2>&1 | Out-Null

Write-Host "✅ Files uploaded!" -ForegroundColor Green
Write-Host ""

# Deploy on server
Write-Host "🚀 Step 3: Deploying on server..." -ForegroundColor Yellow

$deployScript = @"
cd $SERVER_PATH

echo 'Stopping existing containers...'
docker-compose down 2>&1 | Out-Null

echo 'Building and starting containers...'
docker-compose up -d --build

Start-Sleep -Seconds 5

echo ''
echo 'Container Status:'
docker-compose ps

echo ''
echo 'Deployment complete!'
echo ''
echo 'Access your applications:'
echo '   Frontend: http://196.190.251.203:3020'
echo '   Admin: http://196.190.251.203:3021'
echo '   Backend API: http://196.190.251.203:5020'
"@

ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" $deployScript

Write-Host ""
Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Your Nova Labs applications:" -ForegroundColor Cyan
Write-Host "   Frontend: http://196.190.251.203:3020" -ForegroundColor Green
Write-Host "   Admin: http://196.190.251.203:3021" -ForegroundColor Green
Write-Host "   Backend API: http://196.190.251.203:5020" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 To check status:" -ForegroundColor Cyan
Write-Host "   ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP" -ForegroundColor Yellow
Write-Host "   cd $SERVER_PATH" -ForegroundColor Yellow
Write-Host "   docker-compose ps" -ForegroundColor Yellow

