const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be positive."]
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required."]
  },
  category: {
    type: String,
    required: [true, "Category is required."]
  },
  date: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
