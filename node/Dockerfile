FROM ubuntu:16.04 
RUN apt-get clean && apt-get update
RUN apt-get -y install curl && apt-get -y install wget &&  apt-get -y install apt-utils && apt-get autoremove -y
FROM node:carbon
ENV NPM_CONFIG_LOGLEVEL warn
COPY process.yml /srv/www/
COPY package.json /srv/www/
COPY .env /srv/www/
COPY /dist/ /srv/www/
WORKDIR /srv/www/
RUN npm config set maxsockets 5 && npm config set progress false
RUN cd /srv/www/ && npm install --only=prod
RUN npm install -g pm2
CMD ["pm2", "start", "process.yml", "--no-daemon"]
EXPOSE 8080