#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"

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

echo "--- PM2 Status ---"
run_remote "pm2 list"

echo "--- PM2 Logs ---"
run_remote "pm2 logs aetherops --lines 20 --nostream"

echo "--- Nginx Status ---"
run_remote "echo '$PASS' | sudo -S systemctl status nginx --no-pager"

echo "--- Nginx Error Log ---"
run_remote "echo '$PASS' | sudo -S tail -n 20 /var/log/nginx/error.log"

echo "--- Curl Local ---"
run_remote "curl -v http://127.0.0.1:5001"
