var express = require('express');


var userList = {};
var surveyList = {};

var sendResponse = function(res, message) {
  res.type('text/xml');
  res.send('<?xml version="1.0" encoding="UTF-8" ?> \
            <Response> \
              <Message>'+message+'</Message> \
            </Response>');
}

app.post('/twilio', function(req, res, next) {
  var from = req.body.From;
  var text = req.body.Body;

  if ( !userList.hasOwnProperty(from) ) {
    if( surveyList.hasOwnProperty(text) ) {
      var newUser = new User(from, surveyList[text]);
      userList[from] = newUser;
    }
  } else {
    sendResponse(res, userList[from].currentNode.text )
    userList[from].currentNode.processResponse(text);

  }

  var user = userList[from]
  console.log(user);
  sendResponse(res,  )
});