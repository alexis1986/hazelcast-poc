FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

ENV VITE_API_BASE_URL=/api \
    VITE_API_CONTACTS_ENDPOINT=/contacts \
    VITE_APP_NAME="Portafolio de Contactos" \
    VITE_SNACKBAR_DURATION=6000

RUN npm run build

FROM nginx:alpine

RUN echo "server { \
    listen 80; \
    \
    gzip on; \
    gzip_comp_level 6; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml+rss application/vnd.ms-fontobject application/x-font-ttf font/opentype; \
    gzip_vary on; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
    \
    location /api { \
        proxy_pass http://api:8080; \
        proxy_http_version 1.1; \
        proxy_set_header Host \$host; \
        proxy_set_header X-Real-IP \$remote_addr; \
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto \$scheme; \
    } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
