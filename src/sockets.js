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
        updateNickNames();
      }
    });

    socket.on('send message', data => {
      io.sockets.emit('new message', {
        msg: data,
        nick: socket.nickname
      });
    });

    socket.on('disconnect', data => {
      if (!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      updateNickNames();
    });

    function updateNickNames() {
      io.sockets.emit('usernames', nicknames);
    }
  });
};
