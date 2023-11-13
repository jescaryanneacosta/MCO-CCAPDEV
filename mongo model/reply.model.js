const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  establishment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ title: 'text', body: 'text' });

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;