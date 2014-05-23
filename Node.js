var Connection = require('./Connection');

var Node = function(name,text) {
  //properties
  this.connections = [];
  this.name = name;
  this.text = text;
}

Node.prototype.connect = function(to,condition) {
  return this.connections.push(new Connection(to,this,condition));
};

Node.prototype.processResponse = function(resp,user) {
  for(var i = 0; i < this.connections.length; i++) {
    var con = this.connections[i];
    if(con.condition === "*" || con.condition === resp){
      return user.currentNode = con.to
    }
  }
};

module.exports = Node;


//=========================

// var nodes = [
//   new Node("what's your fav color?"), //<== 'red','green','blue'
//   new Node("Red is the best"),
//   new Node("Blue is the best"),
//   new Node("Green is the best")
// ];

// nodes[0].processResponse("red") //--> 1
// nodes[0].processResponse("green") //--> 3