var express = require('express'),
    app = express(),
    Survey = require('./Survey'),
    Connection = require('./Connection'),
    Node = require('./Node'),
    User = require('./User'),
    bodyParser = require('body-parser');

app.use(bodyParser());

var userList = {};
var surveyList = {
  "favorite color":new Survey()
};

var sendResponse = function(res, message) {
  res.type('text/xml');
  res.send('<?xml version="1.0" encoding="UTF-8" ?> \
            <Response> \
              <Message>'+message+'</Message> \
            </Response>');
}

app.post('/twilio', function(req, res, next) {
  console.log("=============")
  var from = req.body.From;
  var text = req.body.Body;

  //Is the user new?
  if ( !userList.hasOwnProperty(from) ) {
    //are they asking for a valid survey?
    if( surveyList.hasOwnProperty(text) ) {
      var newUser = new User(from, surveyList[text]);
      userList[from] = newUser;
      sendResponse(res,newUser.currentNode.text);
      console.log("new user",newUser.currentNode);

    }
  } else {
    console.log("before processing",userList[from].currentNode);
    userList[from].currentNode.processResponse(text,userList[from]);
    sendResponse(res, userList[from].currentNode.text )

    console.log("after processing",userList[from].currentNode);
  }


});

app.listen(8080);

















var survey = surveyList["favorite color"];

survey.addNode(new Node("name","What is your name?"));
survey.addNode(new Node("clothes","Are you wearing any clothes?"));
survey.addNode(new Node("no clothes","you should take care of that!"));
survey.addNode(new Node("yes clothes","that's good"));

survey.nodes.name.connect(survey.nodes.clothes,"*");
survey.nodes.clothes.connect(survey.nodes['no clothes'],"no");
survey.nodes.clothes.connect(survey.nodes['yes clothes'],"yes");












