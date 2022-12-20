FROM node:latest

WORKDIR /app

COPY package.json .

COPY ["package.json", "package-lock*", "./"]

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]