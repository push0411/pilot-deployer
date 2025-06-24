const mongoose = require('mongoose');

const gh = new mongoose.Schema({
  source:{
    type:String
  },
  destination:{
    type:String
  },
  temps1:{
  },
  temps2:{
    type:String
  },
  temps3:{
    type:String
  },
  temps4:{
    type:String
  },
  tempn1:{
    type:Number
  },
  tempn2:{
    type:Number
  },
  tempn3:{
    type:Number
  },
  tempn4:{
    type:Number
  }
});

module.exports = mongoose.model('GlobalHistory', gh);
