const app = require('./app');
require('dotenv').config();
const { Server } = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Массив для хранения истории сообщений
let chatHistory = [];

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  
  // Отправляем историю чата новому клиенту
  socket.emit('chatHistory', chatHistory);

  socket.on('chat', (data) => {
    console.log('Message received', data);
    // Добавляем сообщение в историю
    chatHistory.push(data);
    // Рассылаем всем клиентам новое сообщение
    io.emit('chat', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(PORT, () => console.log(`Сервер запущен на порту - ${PORT}!`));