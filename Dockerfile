FROM node:6.9.1

RUN mkdir /api
WORKDIR /api

COPY package.json /api
RUN npm install

COPY . /api

EXPOSE 3000

CMD ["npm", "run", "watch"]
