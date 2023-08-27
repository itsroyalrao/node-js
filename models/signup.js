const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: Number
  }
});

module.exports = mongoose.model('Signup', signupSchema);