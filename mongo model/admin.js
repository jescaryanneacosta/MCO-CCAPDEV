import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    type: String, // You can store the URL of the image
    default: '/static/images/default-avatar.jpg' 
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;