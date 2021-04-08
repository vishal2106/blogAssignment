FROM node:9-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "index.js" ]