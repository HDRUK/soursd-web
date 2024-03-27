FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package*.json ./

ENV NODE_ENV production 

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start