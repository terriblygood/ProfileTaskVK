

FROM node:18


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000

# Устанавливаем команду запуска для режима разработки
CMD ["npm", "start"]
