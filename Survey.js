var Survey = function() {
  this.nodes = {};
  this.startingNode = null;
};

Survey.prototype.addNode = function(node) {
  if(this.startingNode === null){
    this.startingNode = node;
  }
  this.nodes[node.name] = node;
};

module.exports = Survey;