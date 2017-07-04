// Jan 1st 1970 00:00:00 am as the starting point
var moment = require('moment');
// var date = new Date();
// console.log(date.getMonth());

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));

// 12:29 am padded for minutes and unpadded for the hours

var someTimeStamp = moment().valueOf(); // same as new Date.getTime()
