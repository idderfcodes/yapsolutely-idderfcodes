#!/usr/bin/env bash
# switch-domain.sh — Switch Yapsolutely production to a custom domain
#
# Usage:
#   ./scripts/switch-domain.sh <domain>
#
# Example:
#   ./scripts/switch-domain.sh yapsolutely.com
#
# This will configure:
#   - WEB_HOST  = <domain>        (e.g. yapsolutely.com)
#   - VOICE_HOST = voice.<domain>  (e.g. voice.yapsolutely.com)
#
# Prerequisites:
#   1. DNS A records pointing to VPS IP (84.247.176.111):
#      - <domain>        → 84.247.176.111
#      - voice.<domain>  → 84.247.176.111
#   2. SSH access to VPS (password auth via sshpass)

set -euo pipefail

DOMAIN="${1:?Usage: $0 <domain>}"
VPS_IP="84.247.176.111"
VPS_USER="root"
VPS_PASS="yapsolutely"
DEPLOY_DIR="/opt/yapsolutely/deploy"

WEB_HOST="${DOMAIN}"
VOICE_HOST="voice.${DOMAIN}"

echo "=== Yapsolutely Domain Switch ==="
echo "  Domain:     ${DOMAIN}"
echo "  Web host:   ${WEB_HOST}"
echo "  Voice host: ${VOICE_HOST}"
echo "  VPS IP:     ${VPS_IP}"
echo ""

# Step 1: Verify DNS
echo "→ Checking DNS records..."
WEB_DNS=$(dig +short "${WEB_HOST}" A 2>/dev/null || true)
VOICE_DNS=$(dig +short "${VOICE_HOST}" A 2>/dev/null || true)

if [[ "${WEB_DNS}" != "${VPS_IP}" ]]; then
  echo "  ⚠  ${WEB_HOST} resolves to '${WEB_DNS:-<nothing>}' (expected ${VPS_IP})"
  echo "  Set an A record: ${WEB_HOST} → ${VPS_IP}"
  echo "  Continuing anyway (Caddy will retry ACME)..."
else
  echo "  ✓ ${WEB_HOST} → ${VPS_IP}"
fi

if [[ "${VOICE_DNS}" != "${VPS_IP}" ]]; then
  echo "  ⚠  ${VOICE_HOST} resolves to '${VOICE_DNS:-<nothing>}' (expected ${VPS_IP})"
  echo "  Set an A record: ${VOICE_HOST} → ${VPS_IP}"
  echo "  Continuing anyway (Caddy will retry ACME)..."
else
  echo "  ✓ ${VOICE_HOST} → ${VPS_IP}"
fi
echo ""

# Step 2: Update deploy/.env on VPS
echo "→ Updating deploy/.env on VPS..."
sshpass -p "${VPS_PASS}" ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_IP}" "
  cd ${DEPLOY_DIR}
  sed -i 's|^WEB_HOST=.*|WEB_HOST=${WEB_HOST}|' .env
  sed -i 's|^VOICE_HOST=.*|VOICE_HOST=${VOICE_HOST}|' .env
  echo '  Updated .env:'
  grep -E '^(WEB_HOST|VOICE_HOST)=' .env
"
echo ""

# Step 3: Update .env.web URLs on VPS
echo "→ Updating .env.web URLs..."
sshpass -p "${VPS_PASS}" ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_IP}" "
  cd ${DEPLOY_DIR}
  sed -i 's|^NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=\"https://${WEB_HOST}\"|' .env.web
  sed -i 's|^VOICE_STREAM_BASE_URL=.*|VOICE_STREAM_BASE_URL=\"https://${VOICE_HOST}\"|' .env.web
  sed -i 's|^VOICE_STREAM_WSS_URL=.*|VOICE_STREAM_WSS_URL=\"wss://${VOICE_HOST}/twilio/stream\"|' .env.web
  echo '  Updated .env.web URLs:'
  grep -E '^(NEXT_PUBLIC_APP_URL|VOICE_STREAM_BASE_URL|VOICE_STREAM_WSS_URL)=' .env.web
"
echo ""

# Step 4: Rebuild and restart containers
echo "→ Rebuilding containers..."
sshpass -p "${VPS_PASS}" ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_IP}" "
  cd ${DEPLOY_DIR}
  docker compose up -d --build 2>&1 | tail -10
"
echo ""

# Step 5: Wait for health check
echo "→ Waiting for services to start..."
sleep 10

echo "→ Health check..."
HTTP_CODE=$(curl -sk -o /dev/null -w "%{http_code}" "https://${WEB_HOST}/api/health" 2>/dev/null || echo "000")
if [[ "${HTTP_CODE}" == "200" ]]; then
  echo "  ✓ https://${WEB_HOST}/api/health → 200 OK"
else
  echo "  ⚠ https://${WEB_HOST}/api/health → ${HTTP_CODE} (may need DNS propagation or Caddy ACME time)"
fi

echo ""
echo "=== Domain switch complete ==="
echo ""
echo "Live URLs:"
echo "  Web:   https://${WEB_HOST}"
echo "  Voice: https://${VOICE_HOST}"
echo ""
echo "Google OAuth redirect URI (update in Google Cloud Console):"
echo "  https://${WEB_HOST}/api/auth/google/callback"
echo ""
echo "Twilio webhook (update in Twilio Console):"
echo "  https://${VOICE_HOST}/twilio/inbound"
