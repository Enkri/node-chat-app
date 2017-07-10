const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //add event listener to an instance of http.Server
var users = new Users();
var rooms = [];


function addRoom(params) {
  var found = false;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].name == params.room) {
      found = true;
      rooms[i].count++;
      break;
    }
  }
  if (!found) {
    rooms.push({name: params.room, count: 1});
  }
}

function removeRoom(user) {
  // decrease count if count == 0 remove the room
  rooms.forEach(function(room) {
    if (room.name == user.room) {
      room.count--;
    }
    if (room.count == 0) {
      rooms = rooms.filter(function(room) {
        return room.name !== user.room;
      });
    }
  });
}

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // update rooms list
    addRoom(params);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', function(message, callback) {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('disconnect', function() {
    var user = users.removeUser(socket.id);
    if (user) {
      removeRoom(user);
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat room.`));
    }
  });

  socket.on('createLocationMessage', function (coords) {
    var user = users.getUser(socket.id);
    if (user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('getRooms', () => {
    socket.emit('sendRooms', rooms);
  });

});

server.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
