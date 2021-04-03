FROM node:15.10.0-alpine3.10
WORKDIR /opt/api
COPY . .
ENV PORT=4001
RUN npm install 
CMD ["node", "consumer.js"]
