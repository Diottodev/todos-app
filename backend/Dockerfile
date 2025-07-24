# Dockerfile to build a Node.js application with Prisma
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/main.js"]
