const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: ['Food', 'Fuel', 'Electricity', 'Movie'],
  },
  userID: {
    type: String,
  }
});

module.exports = mongoose.model('Expense', expenseSchema);