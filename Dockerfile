FROM node:14-alpine3.14
WORKDIR /usr/app
COPY . /usr/app/ 
RUN npm install --quiet
RUN npm install mongodb -g
RUN npm link mongodb
RUN yarn install
ENV PORT=3000
EXPOSE 3000

