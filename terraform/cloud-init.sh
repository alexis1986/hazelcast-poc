#!/bin/bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

sed -i 's|http://mirrors.digitalocean.com/ubuntu/|http://archive.ubuntu.com/ubuntu/|g' /etc/apt/sources.list || true

retry() {
  local tries="$1"; shift
  local n=0
  until "$@"; do
    n=$((n+1))
    if [ "$n" -ge "$tries" ]; then
      return 1
    fi
    sleep 5
  done
}

add-apt-repository -y universe || true
retry 3 apt-get update -y --fix-missing
retry 3 apt-get upgrade -y --with-new-pkgs

retry 3 apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  gnupg \
  lsb-release \
  software-properties-common

if ! command -v docker >/dev/null 2>&1; then
  retry 3 apt-get install -y --no-install-recommends docker.io || {
    apt-get update -y || true
    apt-get install -y --no-install-recommends docker.io || true
  }
fi

if command -v docker >/dev/null 2>&1; then
  systemctl enable docker || true
  systemctl start docker || true
fi

apt-get install -y --no-install-recommends docker-compose-plugin || echo "[cloud-init] docker-compose-plugin no disponible en el mirror, continuando..."

docker --version || echo "[cloud-init] Docker no se instaló correctamente"
docker compose version || echo "[cloud-init] Docker Compose no se instaló correctamente"

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "[cloud-init] intentando instalar desde el repo oficial de Docker" || true

  retry 3 apt-get install -y --no-install-recommends ca-certificates curl gnupg || true
  install -m 0755 -d /etc/apt/keyrings || true
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg || true
  chmod a+r /etc/apt/keyrings/docker.gpg || true
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $VERSION_CODENAME stable" > /etc/apt/sources.list.d/docker.list
  retry 3 apt-get update -y || true
  retry 3 apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin || true
  systemctl enable docker || true
  systemctl start docker || true
  docker --version || echo "[cloud-init] Docker (repo oficial) no se instaló correctamente"
  docker compose version || echo "[cloud-init] Docker Compose (repo oficial) no se instaló correctamente"
fi

echo "[cloud-init] setup terminado" | tee -a /var/log/cloud-init-done.flag >/dev/null 2>&1 || true