FROM node:16 AS build
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm i -g typescript
RUN tsc -b tsconfig.json
RUN rm -rf ./node_module

FROM node:16-alpine AS deploy
EXPOSE 3000
COPY --from=build /app /app
WORKDIR /app
RUN npm install
ENTRYPOINT [ "node", "./dist/server.js" ]
