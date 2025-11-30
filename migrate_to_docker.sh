#!/bin/bash
HOST="194.163.161.196"
USER="sysadmin"
PASS="***REMOVED-SECRET***"
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

echo "=== Step 1: Stop and Disable Systemd Service ==="
run_remote "echo '$PASS' | sudo -S systemctl stop aetherops"
run_remote "echo '$PASS' | sudo -S systemctl disable aetherops"
run_remote "echo '$PASS' | sudo -S rm /etc/systemd/system/aetherops.service"
run_remote "echo '$PASS' | sudo -S systemctl daemon-reload"

echo -e "\n=== Step 2: Setup Docker Directory ==="
run_remote "echo '$PASS' | sudo -S mkdir -p $DIR"
run_remote "echo '$PASS' | sudo -S chown -R $USER:$USER $DIR"

echo -e "\n=== Step 3: Clone/Update Repository ==="
run_remote "if [ -d $DIR/.git ]; then cd $DIR && git pull; else git clone $REPO $DIR; fi"

echo -e "\n=== Step 4: Build and Start Docker Container ==="
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose down || true"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose build --no-cache"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose up -d"

echo -e "\n=== Step 5: Wait and Verify ==="
run_remote "sleep 10"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose ps"
run_remote "cd $DIR && echo '$PASS' | sudo -S docker compose logs --tail=20"

echo -e "\n=== Step 6: Test Application ==="
run_remote "curl -I http://127.0.0.1:5001"

echo -e "\n=== Step 7: Cleanup Old Directory ==="
run_remote "echo '$PASS' | sudo -S rm -rf /opt/aetherops"

echo -e "\n=== Migration to Docker Complete! ==="
echo "Application is now running in Docker at $DIR"
echo "Commands:"
echo "  - View logs:    cd $DIR && sudo docker compose logs -f"
echo "  - Restart:      cd $DIR && sudo docker compose restart"
echo "  - Stop:         cd $DIR && sudo docker compose down"
echo "  - Start:        cd $DIR && sudo docker compose up -d"
echo "  - Rebuild:      cd $DIR && sudo docker compose up -d --build"
