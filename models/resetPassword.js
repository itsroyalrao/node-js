const mongoose = require('mongoose');

const resetPasswordSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: [true, 'Email cannot be empty!'],
  },
  isActive: {
    type: String,
    default: true,
  },

});

module.exports = mongoose.model('ForgotPasswordRequest', resetPasswordSchema);