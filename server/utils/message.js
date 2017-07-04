var moment = require('moment');

function generateMessage(from, text) {
  return {
    from: from,
    text: text,
    createdAt: moment().valueOf()
  }
};

function generateLocationMessage (from, latitude, longitude) {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
