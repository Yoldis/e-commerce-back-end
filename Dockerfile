


FROM node:22-alpine as deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:22-alpine as prisma
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY /prisma /app/prisma
COPY prisma.config.ts ./
RUN npx prisma generate

FROM node:22-alpine as runner
WORKDIR /app
COPY --from=deps /app/package.json /app/package.json
COPY --from=deps /app/node_modules /app/node_modules 
COPY --from=prisma /app/generated /app/generated
COPY src/ /app/src
COPY nodemon.json .env ./
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
