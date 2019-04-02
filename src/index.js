const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('src/public'));

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  console.log('Servidor rodando na porta', app.get('port'));
});
