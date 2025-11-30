#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DOMAIN="aetherops.labshub.cc"

run_remote() {
    CMD="$1"
    echo "Running: $CMD"
    expect -c "
    set timeout 60
    spawn ssh -o StrictHostKeyChecking=no $USER@$HOST \"$CMD\"
    expect {
        \"password:\" { send \"$PASS\r\" }
        timeout { exit 1 }
    }
    expect eof
    "
}

# Create proper Nginx configuration
NGINX_CONF="server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
        proxy_cache_bypass \\\$http_upgrade;
    }
}"

echo "Creating Nginx configuration..."
run_remote "echo '$NGINX_CONF' | echo '$PASS' | sudo -S tee /etc/nginx/sites-available/$DOMAIN"

echo "Enabling site..."
run_remote "echo '$PASS' | sudo -S ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN"
run_remote "echo '$PASS' | sudo -S rm -f /etc/nginx/sites-enabled/aetherops"
run_remote "echo '$PASS' | sudo -S rm -f /etc/nginx/sites-enabled/default"

echo "Testing Nginx configuration..."
run_remote "echo '$PASS' | sudo -S nginx -t"

echo "Restarting Nginx..."
run_remote "echo '$PASS' | sudo -S systemctl restart nginx"

echo "Checking Nginx status..."
run_remote "echo '$PASS' | sudo -S systemctl status nginx --no-pager | head -20"

echo "Configuration complete!"
