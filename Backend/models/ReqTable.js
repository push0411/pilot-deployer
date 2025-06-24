const mongoose = require('mongoose');

const req = new mongoose.Schema({
  componentID: {
    type: String,
    required: true
  },
  projectID: {
    type: String
  },
  reqty: {
    type: Number,
    required: true,
    default: 0
  },
  cartID: {
    type: String
  },
  fulfilled: {
    type: Boolean,
    default: false
  },
  fulfilledQty: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('ReqTable', req);