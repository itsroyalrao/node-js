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
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
  },
});

// expenseSchema.statics.totalExpense = function () {
//   console.log('hello');
// };

module.exports = mongoose.model('Expense', expenseSchema);