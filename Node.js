var Node = function(text) {
  //properties
  this.connections = [];
  this.text = text;
}

Node.prototype.addConnection = function(to,case) {};

Node.prototype.processResponse = function(resp) {
  //
};




//=========================

var nodes = [
  new Node("what's your fav color?"), //<== 'red','green','blue'
  new Node("Red is the best"),
  new Node("Blue is the best"),
  new Node("Green is the best")
];

nodes[0].processResponse("red") //--> 1
nodes[0].processResponse("green") //--> 3