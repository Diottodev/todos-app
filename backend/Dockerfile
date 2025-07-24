# Dockerfile to build a Node.js application with Prisma
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npx nest build

RUN npx prisma migrate deploy

RUN npx prisma generate

EXPOSE 3333

CMD ["node", "dist/main.js"]
