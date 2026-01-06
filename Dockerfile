FROM node:22-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli@11.0.14

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]