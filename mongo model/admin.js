const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Admin'
  },
  avatar: {
    type: String, 
    default: '/static/images/default-avatar.jpg' 
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;