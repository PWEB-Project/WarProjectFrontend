FROM node:lts-alpine

RUN npm install -g http-server

COPY dist /dist

EXPOSE 8080
CMD [ "http-server", "dist" ]