var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {
    var from = 'Admin';
    var text = 'Some message';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {

  it('should generate the correct location object', () => {
    var from = 'Admin';
    var longitude = 123;
    var latitude = 123;
    var obj = generateLocationMessage(from, latitude, longitude);
    expect(obj).toInclude({
      from: 'Admin',
      url: 'https://www.google.com/maps?q=123,123',
    });
    expect(obj.createdAt).toBeA('number');
  });

});
