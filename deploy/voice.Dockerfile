FROM node:22-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/voice/package.json apps/voice/package.json

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start", "-w", "apps/voice"]