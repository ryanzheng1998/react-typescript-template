FROM node:17

WORKDIR /workspace
COPY . /workspace

RUN npm install
RUN npm run build

EXPOSE 3000

# 让 node process 可以从 kubernete env 或者 fromenv 设定 environment variable
ENV NODE_ENV=${DOCKER_ENV}

CMD [ "npm", "run", "start" ] 