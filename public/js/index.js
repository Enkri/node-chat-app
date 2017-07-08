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
