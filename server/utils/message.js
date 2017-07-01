function generateMessage(from, text) {
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  }
};

function generateLocationMessage (from, latitude, longitude) {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
