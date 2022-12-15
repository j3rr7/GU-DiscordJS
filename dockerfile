FROM alpine
RUN apk add --update nodejs npm
WORKDIR /usr/src/discordjs
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]