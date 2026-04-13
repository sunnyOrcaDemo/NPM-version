FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit
COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
