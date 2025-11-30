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

echo "=== Checking directory contents ==="
run_remote "ls -la /opt/docker-aetherops/"

echo -e "\n=== Checking for docker-compose.yml ==="
run_remote "ls -la /opt/docker-aetherops/docker-compose.yml"

echo -e "\n=== Checking for Dockerfile ==="
run_remote "ls -la /opt/docker-aetherops/Dockerfile"
