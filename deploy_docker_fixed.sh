#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
DOMAIN="AetherOps.labshub.cc"
REPO="https://github.com/JorgeAymar/AetherOpsAdmin.git"
DIR="/opt/docker-aetherops"

run_remote() {
    CMD="$1"
    echo "Running: $CMD"
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

# 1. Stop PM2 if exists
run_remote "pm2 delete aetherops || true"

# 2. Create directory with proper permissions
run_remote "echo '$PASS' | sudo -S mkdir -p $DIR"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER $DIR"

# 3. Clone or pull repository
run_remote "if [ -d $DIR/.git ]; then cd $DIR && git pull; else git clone $REPO $DIR; fi"

# 4. Build and start Docker container
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose down || true"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d --build"

# 5. Wait and check
run_remote "sleep 10"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose ps"
run_remote "curl -v http://127.0.0.1:5001"

echo "Docker Deployment Finished!"
