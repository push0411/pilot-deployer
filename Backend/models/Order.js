const mongoose = require('mongoose');

const order = new mongoose.Schema({
  orderID:{
    type:String,
    required:true,
    unique:true
  },
  createdAt:{
    type:Date,
    required:true,
    default:Date.now()
  },
  invoiceGenerated:{
    type:Boolean,
    required:true,
    default:false
  },
  orderDetails:[{
  ID:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    default:0
  }}],
  invoicePDF: {
  type: Buffer, // Use Buffer to store binary
  required: false,
}
});

module.exports = mongoose.model('Order', order );
