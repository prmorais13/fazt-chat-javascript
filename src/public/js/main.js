$(function() {
  const socket = io();

  // Obtendo os elementos do DOM da interface
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  // Obtendo os elementos do DOM do form nickname
  const nickForm = $('#nickForm');
  const nickName = $('#nickName');
  const nickError = $('#nickError');

  const $users = $('#usernames');

  // Eventos
  $messageForm.submit(e => {
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', nickName.val(), data => {
      if (data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
      } else {
        nickError.html(`
          <div class="alert alert-danger">
            Este usuário já existe!
          </div>     
        `);
      }

      nickName.val('');
    });
  });

  socket.on('new message', data => {
    $chat.append(`<b>${data.nick}</b>: ${data.msg}<br/>`);
  });

  socket.on('usernames', data => {
    let html = '';
    for (const user of data) {
      if (data.length > 0) {
        html += `<p><i class="fas fa-user"></i> ${user}</p>`;
        $users.html(html);
      }
    }
  });
});
