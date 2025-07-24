FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
RUN yarn build
