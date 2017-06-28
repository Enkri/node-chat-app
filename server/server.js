const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //add event listener to an instance of http.Server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room!',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined the room',
    createdAt: new Date().getTime()
  });



  socket.on('createMessage', function(message) {
    console.log('Create new message: ', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });



  socket.on('disconnect', function() {
    console.log('User was disconnected');
  })


});

server.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
