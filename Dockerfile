# Используем официальный образ Node.js
FROM node:18-alpine

# Создаём рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и lock-файл
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код проекта
COPY . .
# Если нужно, конвертируем строки в bin-скриптах из CRLF в LF
RUN dos2unix node_modules/.bin/* || true

# Делаем все скрипты в node_modules/.bin исполняемыми (включая tsc и vite)
RUN chmod +x node_modules/.bin/* || true
# Собираем проект
RUN npm run build

# Открываем порт, на котором будет слушать сервер Vite (по умолчанию 4173 для preview)
EXPOSE 4173

# Запускаем встроенный сервер Vite для предварительного просмотра сборки
CMD ["npm", "run", "preview"]
