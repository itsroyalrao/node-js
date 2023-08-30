const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);