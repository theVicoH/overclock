# Étape 1 : Construction avec pnpm et Node.js
FROM node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY ./apps/web/package.json ./apps/web/

RUN pnpm install --filter ./apps/web --no-frozen-lockfile  --prod=false

COPY ./apps/web ./apps/web

COPY ./packages/common ./packages/common

RUN pnpm --filter ./apps/web build

FROM nginx:alpine

COPY --from=builder /app/apps/web/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
