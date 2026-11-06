#!/usr/bin/env bash
set -euo pipefail

VPS_HOST="${VPS_HOST:-217.216.49.191}"
VPS_PORT="${VPS_PORT:-9022}"
VPS_USER="${VPS_USER:-root}"
REMOTE_DIR="/opt/aetherops"
IMAGE_NAME="aetherops-web"
IMAGE_TAG="latest"

echo "==> Building image..."
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

echo "==> Exporting and uploading image to ${VPS_HOST}..."
docker save "${IMAGE_NAME}:${IMAGE_TAG}" | gzip | \
  ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "docker load"

echo "==> Uploading docker-compose.yml..."
ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "mkdir -p ${REMOTE_DIR}"
scp -P "${VPS_PORT}" docker-compose.yml "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/docker-compose.yml"

# Upload .env only if it exists locally and not already on server
if [ -f .env ]; then
  echo "==> Uploading .env..."
  scp -P "${VPS_PORT}" .env "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/.env"
else
  echo "WARNING: No .env file found locally. Copy .env.example to .env and fill in the values."
  echo "  cp .env.example .env && nano .env"
fi

echo "==> Deploying on VPS..."
ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" bash <<EOF
  cd ${REMOTE_DIR}
  docker compose pull 2>/dev/null || true
  docker compose up -d --remove-orphans
  docker compose ps
EOF

echo "==> Installing nginx vhost (if not already present)..."
scp -P "${VPS_PORT}" nginx/aetherops.vhost.conf \
  "${VPS_USER}@${VPS_HOST}:/etc/nginx/sites-available/aetherops.labshub.cc"

ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" bash <<'EOF'
  ENABLED="/etc/nginx/sites-enabled/aetherops.labshub.cc"
  if [ ! -L "$ENABLED" ]; then
    ln -s /etc/nginx/sites-available/aetherops.labshub.cc "$ENABLED"
  fi
  nginx -t && systemctl reload nginx
  # Issue cert if not yet present
  if [ ! -f /etc/letsencrypt/live/aetherops.labshub.cc/fullchain.pem ]; then
    certbot --nginx -d aetherops.labshub.cc --non-interactive --agree-tos -m jorge.s.aymar@gmail.com
  fi
EOF

echo "==> Done. https://aetherops.labshub.cc should be live."
