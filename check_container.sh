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

echo "=== Checking dist structure in container ==="
run_remote "echo '$PASS' | sudo -S docker exec aetherops-admin ls -la /app/dist"

echo -e "\n=== Checking if dist/public exists ==="
run_remote "echo '$PASS' | sudo -S docker exec aetherops-admin ls -la /app/dist/public 2>\u00261 | head -20"

echo -e "\n=== Checking container processes ==="
run_remote "echo '$PASS' | sudo -S docker exec aetherops-admin ps aux"
