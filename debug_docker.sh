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

echo "--- Docker Container Status ---"
run_remote "cd /opt/docker-aetherops && echo '$PASS' | sudo -S docker compose ps"

echo -e "\n--- Docker Logs ---"
run_remote "cd /opt/docker-aetherops && echo '$PASS' | sudo -S docker compose logs --tail=50"

echo -e "\n--- Test Local Connection ---"
run_remote "curl -v http://127.0.0.1:5001"
