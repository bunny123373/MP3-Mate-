FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-pip ffmpeg nodejs npm

RUN npm install -g yt-dlp

COPY server/package.json server/package-lock.json ./
RUN npm install

COPY server .

EXPOSE 10000

CMD ["npm", "run", "start"]