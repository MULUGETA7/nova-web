# Nova Labs Deployment Script (PowerShell for Windows)
# Server: ubuntu@196.190.251.203

Write-Host "🚀 Starting Nova Labs Deployment..." -ForegroundColor Green

$SERVER_USER = "ubuntu"
$SERVER_IP = "196.190.251.203"
$SERVER_PATH = "/home/ubuntu/nova-finall"
$SSH_KEY = "mulu_webserver_key"

# Step 1: Build Frontend Applications
Write-Host "`n📦 Step 1: Building Frontend Applications..." -ForegroundColor Yellow

Write-Host "Building Nova-frontend..." -ForegroundColor Cyan
Set-Location Nova-frontend
npm install
npm run build
Set-Location ..

Write-Host "Building Nova_admin..." -ForegroundColor Cyan
Set-Location Nova_admin
npm install
npm run build
Set-Location ..

Write-Host "✅ Builds completed!`n" -ForegroundColor Green

# Step 2: Upload files
Write-Host "📤 Step 2: Uploading files to server...`n" -ForegroundColor Yellow

# Check if SSH key exists
if (-Not (Test-Path $SSH_KEY)) {
    Write-Host "❌ ERROR: SSH key not found at $SSH_KEY" -ForegroundColor Red
    Write-Host "Please ensure the SSH key exists and try again." -ForegroundColor Red
    exit 1
}

# Create directory structure on server
Write-Host "Creating directories on server..." -ForegroundColor Cyan
ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH/Nova-backend $SERVER_PATH/Nova-frontend $SERVER_PATH/Nova_admin"

# Upload backend (excluding node_modules and uploads)
Write-Host "Uploading backend..." -ForegroundColor Cyan
# Using scp for Windows compatibility
Get-ChildItem -Path "Nova-backend" -Exclude "node_modules","uploads",".env",".git" -Recurse | 
    ForEach-Object {
        $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        $targetPath = "$SERVER_PATH/$relativePath"
        
        if ($_.PSIsContainer) {
            ssh -i $SSH_KEY "$SERVER_USER@$SERVER_IP" "mkdir -p '$targetPath'"
        } else {
            scp -i $SSH_KEY $_.FullName "$SERVER_USER@$SERVER_IP`:$targetPath"
        }
    }

# Upload frontend build
Write-Host "Uploading frontend build..." -ForegroundColor Cyan
scp -i $SSH_KEY -r "Nova-frontend/build" "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/Nova-frontend/"

# Upload admin build
Write-Host "Uploading admin build..." -ForegroundColor Cyan
scp -i $SSH_KEY -r "Nova_admin/build" "$SERVER_USER@$SERVER_IP`:$SERVER_PATH/Nova_admin/"

Write-Host "`n✅ Files uploaded!`n" -ForegroundColor Green

# Instructions
Write-Host "⚠️  IMPORTANT NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Create .env file on server at: $SERVER_PATH/NOVALABS/.env" -ForegroundColor Yellow
Write-Host "2. Connect to server and run setup:" -ForegroundColor Yellow
Write-Host "   ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP" -ForegroundColor Cyan
Write-Host "   cd $SERVER_PATH" -ForegroundColor Cyan
Write-Host "   bash setup-server.sh" -ForegroundColor Cyan
Write-Host "`n📖 See DEPLOYMENT_STEPS.md for detailed instructions`n" -ForegroundColor Green

Write-Host "Deployment files uploaded successfully!`n" -ForegroundColor Green

