const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  teamID: {
    type: String,
    required: true,
    unique: true
  },
  projects:[
          {
              type: mongoose.Schema.Types.ObjectId,
              ref:"Project"
          }
      ],
  members: [
    {
      userID: {
        type: Number,
        required: true
      },
      role: {
        type: String,
        enum: ['Lead', 'Member'],
        default: 'Member'
      }
    }
  ],
  batch:{
        type:Number
      }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
