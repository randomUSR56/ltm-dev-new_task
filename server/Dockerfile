FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package* ./
RUN mkdir -p node_modules \
    && rm -rf node_modules
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
