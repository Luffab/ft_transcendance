FROM node:latest as base

WORKDIR /app
#COPY ["package.json", "package-lock*", "./"]

FROM base as dev

COPY package.json .
COPY tsconfig.json .
COPY entry.sh .

RUN npm i
ENTRYPOINT [ "bash", "entry.sh" ]

#FROM base as prod
#RUN npm ci
#COPY . .
#RUN npm i -g @nestjs/cli
#RUN npm run build
#CMD ["npm", "run", "start:prod"]
