FROM node:14.4.0-alpine
WORKDIR /usr/local/src/talkn-media/
COPY . .
RUN yarn install && yarn -v && node --version
EXPOSE 80
CMD [ "yarn", "server" ]