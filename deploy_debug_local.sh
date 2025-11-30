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

echo "--- Netstat Port 5001 ---"
run_remote "echo '$PASS' | sudo -S netstat -tulpn | grep 5001"

echo "--- Curl Localhost:5001 ---"
run_remote "curl -v http://127.0.0.1:5001"
