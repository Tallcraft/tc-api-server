FROM node:20-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node src ./src

EXPOSE 4000

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 4000
CMD [ "node", "src/index.js" ]
