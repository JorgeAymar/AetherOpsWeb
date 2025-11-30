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

echo "=== Full Docker logs (last 100 lines) ==="
run_remote "cd /opt/docker-aetherops && echo '$PASS' | sudo -S docker compose logs --tail=100"

echo -e "\n=== Test curl inside container ==="
run_remote "echo '$PASS' | sudo -S docker exec aetherops-admin wget -O- http://localhost:5001 2>&1 | head -50"

echo -e "\n=== Check if process is listening ==="
run_remote "echo '$PASS' | sudo -S docker exec aetherops-admin netstat -tlnp 2>&1 || echo '$PASS' | sudo -S docker exec aetherops-admin ss -tlnp"

echo -e "\n=== Container health status ==="
run_remote "echo '$PASS' | sudo -S docker inspect aetherops-admin --format='{{.State.Health.Status}}'"
