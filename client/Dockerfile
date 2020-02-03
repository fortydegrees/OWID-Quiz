FROM node:9

COPY . /usr/src/app/client
WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build
# CMD [ "npm", "run", "build"]