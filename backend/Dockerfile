# Dockerfile to build a Node.js application with Prisma
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
ENV NODE_ENV=production
EXPOSE 3333
RUN yarn build
CMD ["node", "dist/main.js"]