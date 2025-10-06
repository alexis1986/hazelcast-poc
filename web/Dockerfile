FROM node:20-alpine AS build

WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=512

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

ENV VITE_API_BASE_URL=/api \
    VITE_API_CONTACTS_ENDPOINT=/contacts \
    VITE_APP_NAME="Portal de Contactos" \
    VITE_SNACKBAR_DURATION=6000

RUN npm run build

FROM nginx:alpine

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80 443

ENTRYPOINT ["/entrypoint.sh"]
