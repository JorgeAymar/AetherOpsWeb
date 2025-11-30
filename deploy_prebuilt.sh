#!/bin/bash
set -e

echo "Building locally..."
npm run build

echo "Creating deployment package..."
tar -czf deploy.tar.gz dist package.json package-lock.json

echo "Uploading to VPS..."
scp -o StrictHostKeyChecking=no deploy.tar.gz sysadmin@194.163.161.196:/tmp/

echo "Deploying on VPS..."
ssh -o StrictHostKeyChecking=no sysadmin@194.163.161.196 << 'ENDSSH'
set -e

# Stop PM2
pm2 delete aetherops || true

# Setup directory
echo '***REMOVED-SECRET***' | sudo -S mkdir -p /opt/docker-aetherops
echo '***REMOVED-SECRET***' | sudo -S chown -R sysadmin:sysadmin /opt/docker-aetherops

# Extract files
cd /opt/docker-aetherops
tar -xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz

# Install production dependencies
npm ci --only=production

# Start with PM2
pm2 start npm --name "aetherops" -- start
pm2 save

# Check status
sleep 5
pm2 list
curl -I http://127.0.0.1:5001

ENDSSH

echo "Deployment complete!"
