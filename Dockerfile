FROM node:18

RUN npm install -g create-react-app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start"]