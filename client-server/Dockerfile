FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./api ../api
COPY ./svelte/rollup.config.js ./
COPY ./svelte/package*.json ./

RUN npm install

COPY ./svelte/src ./src
COPY ./svelte/public ./public
COPY ./svelte/index.js ./

RUN npm run-script build

EXPOSE 3000

CMD [ "node", "index" ]