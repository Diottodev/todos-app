# Dockerfile na pasta /frontend

FROM node:20 AS builder

WORKDIR /frontend
COPY . .

RUN yarn install
RUN yarn build

FROM node:20-alpine

WORKDIR /frontend

COPY --from=builder /frontend ./
ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]
