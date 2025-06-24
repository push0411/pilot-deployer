const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
  },
  about: {
    type: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
  }
});

module.exports = mongoose.model('Profile', profileSchema);
