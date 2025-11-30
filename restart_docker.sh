#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DIR="/opt/docker-aetherops"

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

echo "=== Pulling changes ==="
run_remote "cd $DIR && git pull"

echo -e "\n=== Restarting container ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose down"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d"

echo -e "\n=== Waiting ==="
run_remote "sleep 10"

echo -e "\n=== Checking status ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose ps"

echo -e "\n=== Testing ==="
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Complete! ==="
