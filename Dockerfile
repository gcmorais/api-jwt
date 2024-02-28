FROM node:18.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 5432

CMD ["npm", "start"]