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

echo "=== PM2 Processes ==="
run_remote "pm2 list"

echo -e "\n=== Global NPM Packages ==="
run_remote "npm list -g --depth=0"

echo -e "\n=== Docker Containers ==="
run_remote "echo '$PASS' | sudo -S docker ps -a"

echo -e "\n=== Nginx Sites Enabled ==="
run_remote "ls -la /etc/nginx/sites-enabled/"

echo -e "\n=== Services Using Port 5001 ==="
run_remote "echo '$PASS' | sudo -S lsof -i :5001 || echo 'lsof not available, trying ss...'"
run_remote "echo '$PASS' | sudo -S ss -tlnp | grep :5001 || echo 'No process on port 5001'"

echo -e "\n=== Disk Usage in /opt ==="
run_remote "du -sh /opt/* 2>/dev/null || echo 'No /opt directories'"

echo -e "\n=== Disk Usage in /var/www ==="
run_remote "du -sh /var/www/* 2>/dev/null || echo 'No /var/www directories'"
