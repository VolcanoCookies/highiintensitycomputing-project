FROM node

# Create app directory
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY ./src /app/src
COPY ./public /app/public
COPY .env /app

RUN npm install

CMD ["npm", "run", "start"]