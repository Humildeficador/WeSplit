FROM node:24.17.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]