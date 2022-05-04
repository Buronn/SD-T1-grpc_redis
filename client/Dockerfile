FROM node:14

RUN apt update

ENV TZ=America/Santiago

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#Create app directory
WORKDIR /usr/src/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./client/package*.json ./


RUN npm install

RUN npm install -g nodemon

# Bundle app source
COPY ./client ./




# If you are building your code for production
# RUN npm ci --only=production

#RUN npm run build

EXPOSE 3000

CMD [ "node","server.js"]
