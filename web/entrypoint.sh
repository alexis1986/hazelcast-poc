#!/usr/bin/env sh
set -e

SERVER_NAME="${SERVER_NAME:-localhost}"
ENABLE_SSL="${ENABLE_SSL:-false}"
ACME_WEBROOT="/var/www/certbot"
HTML_ROOT="/usr/share/nginx/html"
CONF="/etc/nginx/conf.d/default.conf"

mkdir -p "${ACME_WEBROOT}"

has_certs=false
if [ -f "/etc/letsencrypt/live/${SERVER_NAME}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${SERVER_NAME}/privkey.pem" ]; then
  has_certs=true
fi

{
  echo "server {";
  echo "  listen 80 default_server;";
  if [ "$ENABLE_SSL" = "true" ]; then
    echo "  return 301 https://\$host\$request_uri;";
  else
    echo "  return 444;";
  fi
  echo "}";

  echo "server {";
  echo "  listen 80;";
  echo "  server_name ${SERVER_NAME};";
  echo "  location /.well-known/acme-challenge/ { root ${ACME_WEBROOT}; }";
  if [ "$ENABLE_SSL" = "true" ] && [ "$has_certs" = "true" ]; then
    echo "  location / { return 301 https://\$host\$request_uri; }";
  else
    cat <<'HTTPBLOCK'
  gzip on;
  gzip_comp_level 6;
  gzip_min_length 1024;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml+rss application/vnd.ms-fontobject application/x-font-ttf font/opentype;
  gzip_vary on;

  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://api:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
HTTPBLOCK
  fi
  echo "}";

  if [ "$ENABLE_SSL" = "true" ] && [ "$has_certs" = "true" ]; then
    cat <<SSLBLOCK
server {
  listen 443 ssl http2;
  server_name ${SERVER_NAME};

  ssl_certificate     /etc/letsencrypt/live/${SERVER_NAME}/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/${SERVER_NAME}/privkey.pem;

  gzip on;
  gzip_comp_level 6;
  gzip_min_length 1024;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml+rss application/vnd.ms-fontobject application/x-font-ttf font/opentype;
  gzip_vary on;

  location / {
    root ${HTML_ROOT};
    index index.html;
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://api:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
SSLBLOCK
  fi
} > "$CONF"

exec nginx -g 'daemon off;'
