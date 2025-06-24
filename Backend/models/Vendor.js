const mongoose = require('mongoose');

const car = new mongoose.Schema({
    ID:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    contactNo:{
        type:Number
    },
    managerName:{
        type:String
    },
    managerContact:{
        type:String
    }
});

module.exports = mongoose.model('Vendor', car);
