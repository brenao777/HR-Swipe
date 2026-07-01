require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { ensureSeeded } = require('../db/seed');

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, methods: ['GET', 'POST'] },
});

// Simple in-memory chat shared between an applicant and an HR after a match.
let chatHistory = [];

io.on('connection', (socket) => {
  socket.emit('chatHistory', chatHistory);

  socket.on('chat', (data) => {
    chatHistory.push(data);
    io.emit('chat', data);
  });
});

async function start() {
  await ensureSeeded();
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Не удалось запустить сервер:', error);
  process.exit(1);
});
