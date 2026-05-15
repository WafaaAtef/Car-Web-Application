const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Cars', required: true },
  name: { type: String, required: true }, 
  rating: { type: Number, min: 1, max: 5, required: true }, 
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);