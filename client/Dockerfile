FROM node:22-alpine

WORKDIR /app

COPY . .

RUN chown -R node:node ./

USER node

RUN yarn install --frozen-lockfile

RUN chown -R node:node ./

RUN yarn run build

CMD ["yarn", "start"]

EXPOSE 3000