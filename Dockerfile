FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package*.json ./

ENV NODE_ENV production
ENV WATCHPACK_POLLING true
ENV NEXT_WEBPACK_USEPOLLING true

RUN npm install

COPY . /usr/src

EXPOSE 3000
CMD npm run start
