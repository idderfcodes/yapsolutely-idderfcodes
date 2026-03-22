#!/usr/bin/env bash

set -euo pipefail

DEFAULT_REMOTE_REPO_PATH="/opt/yapsolutely"
DEFAULT_SSH_SCRIPT="/tmp/ssh-vps.sh"
DEFAULT_SSH_USER="root"
DEFAULT_SSH_HOST="84.247.176.111"
DEFAULT_BRANCH="main"

REMOTE_REPO_PATH="${YAPS_REMOTE_REPO_PATH:-$DEFAULT_REMOTE_REPO_PATH}"
SSH_SCRIPT_PATH="${YAPS_SSH_SCRIPT:-$DEFAULT_SSH_SCRIPT}"
SSH_USER="${YAPS_SSH_USER:-$DEFAULT_SSH_USER}"
SSH_HOST="${YAPS_SSH_HOST:-$DEFAULT_SSH_HOST}"
DEPLOY_BRANCH="${YAPS_DEPLOY_BRANCH:-$DEFAULT_BRANCH}"
SKIP_PREFLIGHT="${YAPS_SKIP_PREFLIGHT:-0}"

print_step() {
	echo "==> $1"
}

fail() {
	echo "❌ $1" >&2
	exit 1
}

remote_exec() {
	local command="$1"

	if [[ -x "$SSH_SCRIPT_PATH" ]]; then
		"$SSH_SCRIPT_PATH" "$command"
		return
	fi

	ssh -o BatchMode=yes "${SSH_USER}@${SSH_HOST}" "$command"
}

print_step "Checking SSH access"
if ! remote_exec "hostname && whoami" >/dev/null; then
	fail "Unable to reach the VPS over SSH. Provide YAPS_SSH_SCRIPT or working SSH key access first."
fi

print_step "Updating repo on VPS to ${DEPLOY_BRANCH}"
remote_exec "set -euo pipefail && cd '${REMOTE_REPO_PATH}' && git fetch origin && git checkout '${DEPLOY_BRANCH}' && git pull --ff-only origin '${DEPLOY_BRANCH}'"

print_step "Rebuilding Docker Compose services"
remote_exec "set -euo pipefail && cd '${REMOTE_REPO_PATH}/deploy' && docker compose up -d --build"

print_step "Printing container status"
remote_exec "set -euo pipefail && cd '${REMOTE_REPO_PATH}/deploy' && docker compose ps"

if [[ "$SKIP_PREFLIGHT" != "1" ]]; then
	print_step "Running production preflight from local workspace"
	npm run preflight:prod
else
	print_step "Skipping production preflight because YAPS_SKIP_PREFLIGHT=1"
fi

print_step "Production deploy workflow completed"
echo "Next recommended checks: npm run smoke:prod (if SSH helper exists) and one real inbound phone test."