#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
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

echo "=== Pulling latest changes ==="
run_remote "cd $DIR && git pull"

echo -e "\n=== Building Docker image ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose build"

echo -e "\n=== Starting container ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d"

echo -e "\n=== Waiting for container ==="
run_remote "sleep 10"

echo -e "\n=== Checking status ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose ps"

echo -e "\n=== Checking logs ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose logs --tail=20"

echo -e "\n=== Testing application ==="
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Docker deployment complete! ==="
