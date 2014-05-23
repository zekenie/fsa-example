var User = function(phone,survey) {
  this.phone = phone;
  this.survey = survey;
  this.responses = {};
  this.currentNode = null;
};

