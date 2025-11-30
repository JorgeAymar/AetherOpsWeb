#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
REPO="https://github.com/JorgeAymar/AetherOpsAdmin.git"
DIR="/opt/docker-aetherops"

run_remote() {
    CMD="$1"
    expect -c "
    set timeout 600
    spawn ssh -o StrictHostKeyChecking=no $USER@$HOST \"$CMD\"
    expect {
        \"password:\" { send \"$PASS\r\" }
        timeout { exit 1 }
    }
    expect eof
    catch wait result
    exit [lindex \$result 3]
    "
}

echo "=== Removing empty directory ==="
run_remote "echo '$PASS' | sudo -S rm -rf $DIR"

echo -e "\n=== Creating directory ==="
run_remote "echo '$PASS' | sudo -S mkdir -p $DIR"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER $DIR"

echo -e "\n=== Cloning repository ==="
run_remote "git clone $REPO $DIR"

echo -e "\n=== Verifying files ==="
run_remote "ls -la $DIR | head -20"
run_remote "ls -la $DIR/docker-compose.yml"
run_remote "ls -la $DIR/Dockerfile"

echo -e "\n=== Building Docker image ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose build"

echo -e "\n=== Starting container ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d"

echo -e "\n=== Waiting for container to start ==="
run_remote "sleep 15"

echo -e "\n=== Checking container status ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose ps"

echo -e "\n=== Checking logs ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose logs --tail=30"

echo -e "\n=== Testing application ==="
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Docker deployment complete! ==="
