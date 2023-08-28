const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);