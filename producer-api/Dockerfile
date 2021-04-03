FROM node:15.10.0-alpine3.10
WORKDIR /opt/api
COPY . .
ENV PORT=4000
RUN npm install 
CMD ["node", "producer.js"]
