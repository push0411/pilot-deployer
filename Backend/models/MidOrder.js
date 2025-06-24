const mongoose = require('mongoose');

const mid = new mongoose.Schema({
  ID:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  reqty:{
    type:Number,
    required:true,
    default:0
  },
  available:{
    type:Number,
    required:true,
    default:0
  },
  toOrder:{
    type:Number,
    required:true,
    default:0
  },
  ordered:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model('MidOrder', mid);
