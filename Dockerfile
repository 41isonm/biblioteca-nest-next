FROM node:22-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli@11.0.14

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["nest", "start", "--watch"]