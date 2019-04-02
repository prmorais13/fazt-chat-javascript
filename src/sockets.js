module.exports = io => {
  io.on('connection', socket => {
    console.log('Um usuário conectado.');

    socket.on('send message', dados => {
      io.sockets.emit('new message', dados);
    });
  });
};
