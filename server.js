var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser());

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

  //Is the user new?
  if ( !userList.hasOwnProperty(from) ) {
    //are they asking for a valid survey?
    if( surveyList.hasOwnProperty(text) ) {
      var newUser = new User(from, surveyList[text]);
      userList[from] = newUser;
    }
  } else {
    sendResponse(res, userList[from].currentNode.text )
    userList[from].currentNode.processResponse(text);
  }
});

app.listen(8080);