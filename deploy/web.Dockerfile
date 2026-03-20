FROM node:22-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/voice/package.json apps/voice/package.json

RUN npm ci --workspaces --include-workspace-root

COPY . .

RUN npx prisma generate --schema=apps/web/prisma/schema.prisma
RUN npm run build -w apps/web

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "apps/web"]
