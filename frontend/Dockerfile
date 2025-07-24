# Dockerfile na pasta /frontend

# Etapa de build
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]
