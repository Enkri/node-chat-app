const expect = require('expect');
// import isRealString
const {isRealString} = require('./validation.js');
// isRealString
describe('isRealString', () => {

  it('should reject non-string values', () => {
    var str = 123;
    expect(isRealString(str)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var str = "  ";
    expect(isRealString(str)).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var str = "This is a string";
    expect(isRealString(str)).toBe(true);
  });
});
  // should reject non-string values
  // should reject stirngs with only spaces
  // should allow string with non-space characters
