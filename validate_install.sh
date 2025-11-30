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

echo "=== Checking /opt directories ==="
run_remote "ls -la /opt/ | grep aether"

echo -e "\n=== Checking if /opt/docker-aetherops exists ==="
run_remote "ls -la /opt/docker-aetherops 2>/dev/null || echo 'Directory does not exist'"

echo -e "\n=== Checking if /opt/aetherops exists ==="
run_remote "ls -la /opt/aetherops 2>/dev/null || echo 'Directory does not exist'"

echo -e "\n=== Checking systemd service WorkingDirectory ==="
run_remote "echo '$PASS' | sudo -S cat /etc/systemd/system/aetherops.service | grep WorkingDirectory"

echo -e "\n=== Checking running process ==="
run_remote "ps aux | grep 'node dist/index.cjs' | grep -v grep"
