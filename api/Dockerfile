FROM node:18.4.0-slim AS base

# install ps
RUN apt update && \
    apt install -y procps

# set directory
WORKDIR /app

EXPOSE 3000 9229 9230

COPY package.json package.json
COPY yarn.lock yarn.lock

# Development build

FROM base as dev

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]

# Production build

FROM base as prod

RUN yarn install --production

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]

