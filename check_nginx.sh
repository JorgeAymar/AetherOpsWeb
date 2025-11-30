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

echo "--- Checking Nginx Config ---"
run_remote "echo '$PASS' | sudo -S cat /etc/nginx/sites-available/aetherops"

echo -e "\n--- Checking PM2 Status ---"
run_remote "pm2 list"

echo -e "\n--- Testing Local Connection ---"
run_remote "curl -I http://127.0.0.1:5001"
