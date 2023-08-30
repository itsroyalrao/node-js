const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty!'],
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty!'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty!'],
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Signup', signupSchema);