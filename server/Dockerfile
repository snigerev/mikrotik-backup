FROM node:12-alpine
RUN apk add sshpass git openssh sqlite --no-cache --update
RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

RUN npm install -g nodemon
COPY . /usr/src/server
RUN npm install --silent

CMD ["nodemon", "server.js"]