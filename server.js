// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // serve HTML from /public folder

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('user_message', (data) => {
    console.log('Received:', data);

    const input = data.id;

    if (input == 1) {
      socket.emit('bot_message', {
        id: 1,
        message: "text message 1",
        message_type: "text"
      });
    } else if (input == 2) {
      socket.emit('bot_message', {
        id: 2,
        message: "image message 1",
        message_type: "reply_button",
        actions: [
          { id: "button_1", title: "Button 1" },
          { id: "button_2", title: "Button 2" }
        ]
      });
    } else {
      socket.emit('bot_message', {
        id: 3,
        message: "text message 2",
        message_type: "list",
        actions: [
          { title: "Section 1", id: "section_1" },
          { title: "Section 2", id: "section_2" }
        ]
      });
    }
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
