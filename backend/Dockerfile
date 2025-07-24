FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 3333
RUN yarn build
