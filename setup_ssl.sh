#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DOMAIN="aetherops.labshub.cc"

run_remote() {
    CMD="$1"
    echo "Running: $CMD"
    expect -c "
    set timeout 120
    spawn ssh -o StrictHostKeyChecking=no $USER@$HOST \"$CMD\"
    expect {
        \"password:\" { send \"$PASS\r\" }
        timeout { exit 1 }
    }
    expect eof
    "
}

echo "Installing SSL certificate..."
run_remote "echo '$PASS' | sudo -S certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@labshub.cc --redirect"

echo "Checking Nginx configuration..."
run_remote "echo '$PASS' | sudo -S nginx -t"

echo "Restarting Nginx..."
run_remote "echo '$PASS' | sudo -S systemctl restart nginx"

echo "Checking certificate..."
run_remote "echo '$PASS' | sudo -S certbot certificates"

echo "Testing HTTPS..."
run_remote "curl -I https://$DOMAIN"

echo "SSL configuration complete!"
