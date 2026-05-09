const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true 
  },
  model: {
    type: String,
    required: true,
    trim: true 
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [String],
  location: {
    type: String,
    trim: true    
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);