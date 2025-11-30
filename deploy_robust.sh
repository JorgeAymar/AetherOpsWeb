#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DOMAIN="AetherOps.labshub.cc"

run_remote() {
    CMD="$1"
    echo "Running: $CMD"
    expect -c "
    set timeout 600
    spawn ssh -o StrictHostKeyChecking=no $USER@$HOST \"$CMD\"
    expect {
        \"password:\" { send \"$PASS\r\" }
        timeout { exit 1 }
    }
    expect eof
    catch wait result
    exit [lindex \$result 3]
    "
}

# 1. Update & Install Deps
run_remote "echo '$PASS' | sudo -S apt update && echo '$PASS' | sudo -S apt install -y nodejs npm nginx git certbot python3-certbot-nginx"

# 2. Install Node 20
run_remote "echo '$PASS' | sudo -S npm install -g n && echo '$PASS' | sudo -S n 20"

# 3. Install PM2
run_remote "echo '$PASS' | sudo -S npm install -g pm2"

# 4. Setup Directory & Clone
run_remote "if [ ! -d /var/www/AetherOpsAdmin ]; then echo '$PASS' | sudo -S mkdir -p /var/www/AetherOpsAdmin && echo '$PASS' | sudo -S chown -R $USER:$USER /var/www/AetherOpsAdmin && git clone https://github.com/JorgeAymar/AetherOpsAdmin.git /var/www/AetherOpsAdmin; else cd /var/www/AetherOpsAdmin && git pull; fi"

# 5. Install & Build
run_remote "cd /var/www/AetherOpsAdmin && npm install && npm run build"

# 6. Start PM2
run_remote "cd /var/www/AetherOpsAdmin && pm2 delete aetherops || true && pm2 start npm --name 'aetherops' -- start && pm2 save"

# 7. Nginx Config
NGINX_CONF="server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}"
# Escape for expect passing
run_remote "echo '$NGINX_CONF' | echo '$PASS' | sudo -S tee /etc/nginx/sites-available/aetherops"

# 8. Enable Nginx
run_remote "echo '$PASS' | sudo -S ln -sf /etc/nginx/sites-available/aetherops /etc/nginx/sites-enabled/ && echo '$PASS' | sudo -S rm -f /etc/nginx/sites-enabled/default && echo '$PASS' | sudo -S nginx -t && echo '$PASS' | sudo -S systemctl restart nginx"

# 9. SSL (Try non-interactive)
run_remote "echo '$PASS' | sudo -S certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect || echo 'Certbot failed, please check DNS'"

echo "Deployment Finished!"
