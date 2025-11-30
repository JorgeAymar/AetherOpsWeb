#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"

run_remote() {
    CMD="$1"
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

echo "=== Uploading systemd service file ==="
scp -o StrictHostKeyChecking=no aetherops.service sysadmin@$HOST:/tmp/

echo -e "\n=== Installing service file ==="
run_remote "echo '$PASS' | sudo -S mv /tmp/aetherops.service /etc/systemd/system/"
run_remote "echo '$PASS' | sudo -S chmod 644 /etc/systemd/system/aetherops.service"

echo -e "\n=== Renaming directory ==="
run_remote "echo '$PASS' | sudo -S mv /opt/docker-aetherops /opt/aetherops || echo 'Already renamed'"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER /opt/aetherops"

echo -e "\n=== Enabling and starting service ==="
run_remote "echo '$PASS' | sudo -S systemctl daemon-reload"
run_remote "echo '$PASS' | sudo -S systemctl enable aetherops"
run_remote "echo '$PASS' | sudo -S systemctl start aetherops"

echo -e "\n=== Checking status ==="
run_remote "sleep 5"
run_remote "echo '$PASS' | sudo -S systemctl status aetherops --no-pager | head -20"

echo -e "\n=== Verifying application ==="
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Complete! ==="
