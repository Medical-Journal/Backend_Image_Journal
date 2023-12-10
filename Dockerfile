FROM node:20.9.0 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]

