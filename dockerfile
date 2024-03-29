FROM node:14-alpine

COPY . /server

WORKDIR /server

RUN npm install

CMD ["node", "index.js"]

