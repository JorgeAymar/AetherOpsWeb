#!/bin/bash
set -e

HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DIR="/opt/docker-aetherops"

echo "=== Building locally ==="
npm run build

echo -e "\n=== Creating deployment package ==="
tar -czf deploy-docker.tar.gz dist

echo -e "\n=== Uploading to server ==="
scp -o StrictHostKeyChecking=no deploy-docker.tar.gz sysadmin@$HOST:/tmp/

echo -e "\n=== Deploying on server ==="
ssh -o StrictHostKeyChecking=no sysadmin@$HOST << 'ENDSSH'
set -e

# Extract dist folder
cd /opt/docker-aetherops
tar -xzf /tmp/deploy-docker.tar.gz
rm /tmp/deploy-docker.tar.gz

# Build and start Docker container
echo '***REMOVED-SECRET***' | sudo -S docker compose build
echo '***REMOVED-SECRET***' | sudo -S docker compose up -d

# Wait and check
sleep 10
echo '***REMOVED-SECRET***' | sudo -S docker compose ps
echo '***REMOVED-SECRET***' | sudo -S docker compose logs --tail=20

# Test
curl -I http://127.0.0.1:5001

ENDSSH

echo -e "\n=== Deployment complete! ==="
echo "Application is running in Docker at $DIR"
