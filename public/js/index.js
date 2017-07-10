var socket = io();


socket.on('connect', function() {
  // append rooms to select
  socket.emit('getRooms', function() {});
});

socket.on('sendRooms', function(rooms) {
  var rooms = rooms.filter(function(room) {
    return room.count > 0;
  });
  var html = '<option selected="selected" value="0">choose a room...</option>';
  rooms.forEach(function(room) {
    html += `<option value="${room.name}">${room.name}</option>`;
  });
  html += "<option value='create' id='room-select'>Create a new room</option>";
  jQuery('#selection').html(html);
});


$('select').on('change', function(e) {
  if ($(this).val() === 'create') {
    $('#room-input').toggle();
    $("#room-input-tag").prop('disabled', false);
    $('room-select').attr('value', $("#room-input-tag").val());
  } else {
    $('#room-input').hide();
    $("#room-input-tag").prop('disabled', true);
  }
});
