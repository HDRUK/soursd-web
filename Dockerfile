FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . .

ENV WATCHPACK_POLLING true
ENV NEXT_WEBPACK_USEPOLLING true

RUN npm install

EXPOSE 3000
CMD npm run dev
