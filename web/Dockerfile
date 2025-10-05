FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

# Inject Vite env vars at build time (since .env is not included in Docker context)
ENV VITE_API_BASE_URL=/api \
    VITE_API_CONTACTS_ENDPOINT=/contacts \
    VITE_APP_NAME="Portafolio de Contactos" \
    VITE_SNACKBAR_DURATION=6000

RUN npm run build

FROM nginx:alpine

RUN echo "server { \
    listen 80; \
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
