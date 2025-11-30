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

echo "=== Docker logs ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose logs"

echo -e "\n=== Container inspect ==="
run_remote "echo '$PASS' | sudo -S docker inspect aetherops-admin | grep -A 10 'NetworkSettings'"

echo -e "\n=== Test from host ==="
run_remote "sleep 5 && curl -v http://localhost:5001 2>\u00261 | head -30"
