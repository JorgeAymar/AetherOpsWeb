#!/bin/bash
set -e

PASSWORD="***REMOVED-SECRET***"
DOMAIN="AetherOps.labshub.cc"

# Helper for sudo
mysudo() {
    echo "$PASSWORD" | sudo -S "$@"
}

echo "Updating system..."
mysudo apt update
mysudo apt install -y nodejs npm nginx git certbot python3-certbot-nginx

# Install Node 20
echo "Installing Node.js 20..."
mysudo npm install -g n
mysudo n 20

# Install PM2
echo "Installing PM2..."
mysudo npm install -g pm2

# Setup Directory
echo "Setting up directory..."
if [ ! -d /var/www/AetherOpsAdmin ]; then
    mysudo mkdir -p /var/www/AetherOpsAdmin
    mysudo chown -R sysadmin:sysadmin /var/www/AetherOpsAdmin
    git clone https://github.com/JorgeAymar/AetherOpsAdmin.git /var/www/AetherOpsAdmin
else
    cd /var/www/AetherOpsAdmin
    git pull
fi

# Build
echo "Building project..."
cd /var/www/AetherOpsAdmin
npm install
npm run build

# Start PM2
echo "Starting application..."
pm2 delete aetherops || true
pm2 start npm --name "aetherops" -- start
pm2 save

# Nginx Config
echo "Configuring Nginx..."
cat <<EOF | mysudo tee /etc/nginx/sites-available/aetherops
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

mysudo ln -sf /etc/nginx/sites-available/aetherops /etc/nginx/sites-enabled/
mysudo rm -f /etc/nginx/sites-enabled/default
mysudo nginx -t
mysudo systemctl restart nginx

# SSL
echo "Setting up SSL..."
mysudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect || echo "Certbot failed, please check DNS or run manually."

echo "Deployment complete!"
