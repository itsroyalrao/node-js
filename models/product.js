const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item cannot be empty'],
    trim: true,
    maxlength: [40, 'Length is more than given limit']
  },
  itemPrice: {
    type: Number,
    required: [true, 'Price cannot be empty']
  }
})

module.exports = mongoose.model('Product', ProductSchema);