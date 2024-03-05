# =====
# build
FROM node:20-alpine AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN yarn build


# ======
# deploy
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

COPY --from=builder /home/node/app/dist /usr/share/nginx/html
