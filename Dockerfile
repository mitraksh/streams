FROM node:18
WORKDIR /usr/app/node
COPY ./ ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]