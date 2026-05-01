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
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    default: 'petrol'
  },
  transmission: {
    type: String,
    enum: ['automatic', 'manual'],
    default: 'automatic'
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    default: 'used'
  },
  color: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
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