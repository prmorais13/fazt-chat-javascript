module.exports = io => {
  let nicknames = [];

  io.on('connection', socket => {
    // console.log('Um usuário conectado.');

    socket.on('new user', (data, cb) => {
      if (nicknames.indexOf(data) != -1) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
      }
    });

    socket.on('send message', dados => {
      io.sockets.emit('new message', dados);
    });
  });
};
