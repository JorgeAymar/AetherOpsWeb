#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"

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

echo "=== Step 1: Stop PM2 ==="
run_remote "pm2 delete aetherops || true"
run_remote "pm2 save"

echo -e "\n=== Step 2: Uninstall Global Packages ==="
run_remote "echo '$PASS' | sudo -S npm uninstall -g pm2 n"

echo -e "\n=== Step 3: Rename Directory ==="
run_remote "echo '$PASS' | sudo -S mv /opt/docker-aetherops /opt/aetherops || echo 'Directory already renamed or does not exist'"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER /opt/aetherops"

echo -e "\n=== Step 4: Create Systemd Service ==="
# Create systemd service file
SYSTEMD_SERVICE="[Unit]
Description=AetherOps Admin
After=network.target

[Service]
Type=simple
User=sysadmin
WorkingDirectory=/opt/aetherops
Environment=NODE_ENV=production
Environment=PORT=5001
ExecStart=/usr/bin/node dist/index.cjs
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=aetherops

[Install]
WantedBy=multi-user.target"

run_remote "echo '$SYSTEMD_SERVICE' | echo '$PASS' | sudo -S tee /etc/systemd/system/aetherops.service"

echo -e "\n=== Step 5: Enable and Start Service ==="
run_remote "echo '$PASS' | sudo -S systemctl daemon-reload"
run_remote "echo '$PASS' | sudo -S systemctl enable aetherops"
run_remote "echo '$PASS' | sudo -S systemctl start aetherops"

echo -e "\n=== Step 6: Check Status ==="
run_remote "echo '$PASS' | sudo -S systemctl status aetherops --no-pager"

echo -e "\n=== Step 7: Verify Application ==="
run_remote "sleep 3"
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Migration Complete! ==="
echo "Service is now managed by systemd instead of PM2"
echo "Commands:"
echo "  - Start:   sudo systemctl start aetherops"
echo "  - Stop:    sudo systemctl stop aetherops"
echo "  - Restart: sudo systemctl restart aetherops"
echo "  - Status:  sudo systemctl status aetherops"
echo "  - Logs:    sudo journalctl -u aetherops -f"
