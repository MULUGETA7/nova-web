#!/bin/bash

# Server Setup Script - Run this ON the server after uploading files
# Run: bash setup-server.sh

set -e

echo "🚀 Setting up Nova Labs on server..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_DIR="/home/ubuntu/nova-finall"
BACKEND_DIR="$APP_DIR/NOVALABS"
FRONTEND_DIR="$APP_DIR/nova-labs"
ADMIN_DIR="$APP_DIR/nova_admin"

# Step 1: Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Step 2: Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Step 3: Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing Nginx...${NC}"
    sudo apt update
    sudo apt install -y nginx
fi

# Step 4: Install serve for static files
if ! command -v serve &> /dev/null; then
    echo -e "${YELLOW}Installing serve...${NC}"
    sudo npm install -g serve
fi

# Step 5: Setup Backend
echo -e "${GREEN}Setting up backend...${NC}"
cd $BACKEND_DIR

# Install dependencies
npm install --production

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ ERROR: .env file not found in $BACKEND_DIR${NC}"
    echo -e "${YELLOW}Please create .env file with production values${NC}"
    exit 1
fi

# Start backend with PM2
pm2 delete nova-backend 2>/dev/null || true
pm2 start server.js --name "nova-backend" --update-env
pm2 save

# Step 6: Setup Frontend (served via Nginx - see nginx setup below)

# Step 7: Setup Admin (served via Nginx - see nginx setup below)

# Step 8: Setup PM2 startup
pm2 startup systemd | grep "sudo" | bash || true

# Step 9: Configure Firewall
echo -e "${GREEN}Configuring firewall...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo -e "${GREEN}✅ Server setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "${YELLOW}1. Configure Nginx (copy configs from nginx config files)${NC}"
echo -e "${YELLOW}2. Test: pm2 status${NC}"
echo -e "${YELLOW}3. View logs: pm2 logs${NC}"

