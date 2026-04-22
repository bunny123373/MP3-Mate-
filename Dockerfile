FROM node:20-alpine

WORKDIR /app

RUN npm install -g yt-dlp

COPY server/package.json server/package-lock.json ./
RUN npm install

COPY server .

EXPOSE 10000

CMD ["npm", "run", "start"]