const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        // trim:true
    },
    userID:{
        type:Number,
        required:true,
        unique:true
    },
    lastName:{
        type:String,
        required:true
    },      
    contactNumber:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    additionalDetail : {
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Profile"
    },
    image:{
        type:String,
        required: true
    },
    accountType:{
        type:String,
        enum: ["Admin", "Student", "Instructor", "Manager"],
        required: true
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Project"
        }
    ],
    teamLead:{
        type:Boolean
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OTP"
    },
    batch:{
        type:Number //1 -> EN1, 2 -> EN2, 3-> EN3, 4 -> EN4, 5 -> EN5, 6 -> EN6
    },
    passingYear:{
        type:Number
    },
    year:{
        type:Number //1 -> 1st , 2 -> 2nd, 3 -> 3rd, 4 -> 4th
    }
});

module.exports = mongoose.model("User", userSchema);