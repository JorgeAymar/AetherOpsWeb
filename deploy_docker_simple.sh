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

# 1. Stop PM2
run_remote "pm2 delete aetherops || true"

# 2. Create and setup directory
run_remote "echo '$PASS' | sudo -S mkdir -p $DIR"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER $DIR"

# 3. Clone repository
run_remote "rm -rf $DIR/*"
run_remote "git clone $REPO $DIR/repo"

# 4. Start Docker
run_remote "cd $DIR/repo && echo '$PASS' | sudo -S docker compose up -d --build"

# 5. Check status
run_remote "sleep 15"
run_remote "cd $DIR/repo && echo '$PASS' | sudo -S docker compose ps"
run_remote "echo '$PASS' | sudo -S docker ps | grep aetherops"
run_remote "curl -I http://127.0.0.1:5001"

echo "Deployment Complete!"
