const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['Admin'],
    default: 'Admin'
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
