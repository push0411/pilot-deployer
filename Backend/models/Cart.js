const mongoose = require('mongoose');

const car = new mongoose.Schema({
  ID:{
    type:String,
    required:true
  },
  vendorID:{
    type:String
  },
  vendorName:{
    type:String
  },
  //Date when entry is created
  crationDate:{
    type:Date,
    required:true,
    default:Date.now()
  },
  ordered:{
    type:Boolean,
    default:false
  },
  //The date when the order is placed 
  orderDate:{
    type:Date
  },
  //when actual order is received
  checkInDate:{
    type:Date
  },
  checkIn:{
    type:Boolean
  },
  details:[
    {
        ID:{
            type:String
        },
        Name:{
            type:String
        },
        orderedQuantity:{
            type:Number
        },
        receivedQuantity:{
            type:Number
        },
        //ordered - received difference only if received less than ordered
        deflict:{
            number:{
                type:Number
            },
            remark:{
                type:String
            }
        },
        //Is received or not
        checkIn:{
            type:Boolean,
            default:false
        },
        //the damaged count per component
        damageCount:{
            type:Number
        },
        finally:{
          type:Number
        }
    }
  ],
  token:{
    type:String
  }
});

module.exports = mongoose.model('Cart', car);
