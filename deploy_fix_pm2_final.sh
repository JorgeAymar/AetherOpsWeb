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

echo "--- Fixing PM2 Final ---"
run_remote "pm2 delete aetherops || true"
# Use absolute path for npm and explicit cwd
run_remote "cd /var/www/AetherOpsAdmin && pm2 start npm --name 'aetherops' --cwd /var/www/AetherOpsAdmin -- start --env PORT=5001"
run_remote "pm2 save"
run_remote "sleep 5"
run_remote "pm2 list"
run_remote "pm2 logs aetherops --lines 20 --nostream"
