var User = function(phone,survey) {
  this.phone = phone;
  this.survey = survey;
  //keys: node name, vals: what they said
  this.responses = {};
  this.currentNode = this.survey.startingNode;
};

module.exports = User;