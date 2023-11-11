import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  establishment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

reviewSchema.index({ title: 'text', body: 'text' });

const Review = mongoose.model('Review', reviewSchema);

export default Review;