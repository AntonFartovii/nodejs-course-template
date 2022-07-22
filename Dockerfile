FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g npm@8.12.0
COPY . /usr/src/app
COPY .env.example .env
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start:dev"]