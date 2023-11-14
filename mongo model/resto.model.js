const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Resto'
  },
  avatar: {
    type: String,
    default: '/static/images/default-avatar.jpg'
  },
  images: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: mongoose.Schema.Types.Decimal128
  }
});

establishmentSchema.index({ name: 'text'});

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;