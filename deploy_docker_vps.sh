#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DOMAIN="AetherOps.labshub.cc"
REPO="https://github.com/JorgeAymar/AetherOpsAdmin.git"
DIR="/opt/docker-aetherops"

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

# 1. Stop existing PM2 (cleanup)
run_remote "pm2 delete aetherops || true"

# 2. Setup Directory & Clone
run_remote "if [ ! -d $DIR ]; then echo '$PASS' | sudo -S mkdir -p $DIR && echo '$PASS' | sudo -S chown -R $USER:$USER $DIR && git clone $REPO $DIR; else cd $DIR && git pull; fi"

# 3. Docker Compose Up
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d --build"

# 4. Nginx Config
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

run_remote "echo '$NGINX_CONF' | echo '$PASS' | sudo -S tee /etc/nginx/sites-available/aetherops"

# 5. Enable Nginx & SSL
run_remote "echo '$PASS' | sudo -S ln -sf /etc/nginx/sites-available/aetherops /etc/nginx/sites-enabled/ && echo '$PASS' | sudo -S rm -f /etc/nginx/sites-enabled/default && echo '$PASS' | sudo -S nginx -t && echo '$PASS' | sudo -S systemctl restart nginx"
run_remote "echo '$PASS' | sudo -S certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect || echo 'Certbot failed/already exists'"

echo "Docker Deployment Finished!"
