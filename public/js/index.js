var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');


  socket.emit('createMessage', {
    from: 'Nick',
    text: 'Every thing is fine!'
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('Got a new message: ', message);
});
