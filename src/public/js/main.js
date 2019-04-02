$(function() {
  const socket = io();

  // Obtendo os elementos do DOM da interface
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  // Eventos
  $messageForm.submit(e => {
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  socket.on('new message', dados => {
    $chat.append(`${dados}<br/>`);
  });
});
