const app = require('./app');
require('dotenv').config();
const { Server } = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  socket.on('chat', (data) => {
    console.log('Message received', data);
    io.emit('chat', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(PORT, () => console.log(`Сервер запущен на порту - ${PORT}!`));
