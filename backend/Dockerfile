FROM node:latest as base

WORKDIR /app
COPY ["package.json", "package-lock*", "./"]

FROM base as dev
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as prod
RUN npm ci
COPY . .
RUN npm i -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]
