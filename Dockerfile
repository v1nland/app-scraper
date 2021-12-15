# specify the node base image with your desired version node:<version>
FROM node:16

COPY . .
RUN npm install

CMD ["node", "src/index.js"]