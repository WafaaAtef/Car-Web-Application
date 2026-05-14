const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);