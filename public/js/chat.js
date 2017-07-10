var socket = io();
var messageCount = 0;

function scrollToButtom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var badge = jQuery('#badge-template');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight() || 0;
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (scrollTop  + clientHeight + lastMessageHeight <= scrollHeight) {
    badge.show();
  }
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    badge.click(function() {
      messages.scrollTop(scrollHeight);
      messageCount = 0;
      $(this).hide();
    });
    messages.scrollTop(scrollHeight);
    badge.hide();
  } else {
    messageCount++;
    badge.html('<button class="btn btn-primary" type="button">' +
    'Unread Messages <span class="badge">' + messageCount +'</span></button>');
  };
};

$('#messages').scroll(function() {
  var messages = jQuery('#messages');
  if (messages.prop('scrollTop') + messages.prop('clientHeight') == messages.prop('scrollHeight')) {
    jQuery('#badge-template').hide();
    messageCount = 0;
  }
});

jQuery('#badge-template').attr('align', 'center');

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});


socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
  ol.after("<div class='text-center'><a href='/' class='btn btn-warning' id='leave'> Leave Room</a></div>");
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToButtom();
});

socket.on('newLocationMessage', function (message) {
  // render with template library
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })
  jQuery('#messages').append(html);
  scrollToButtom();
  // // render with jQuery
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank"> My Current Location </a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // li.text(`${message.from}: ${formattedTime }`);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val("");
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    // alert('Unable to fetch location.');
    $('#alert').html('<div class="alert alert-warning alert-dismissible" role="alert">'
    + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
    + '<span aria-hidden="true">&times;</span></button> Unable to fetch location, please allow location access. </div>');
  });
});



/* off-canvas sidebar toggle */
$('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});
