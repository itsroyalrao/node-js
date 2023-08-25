const Product = require('../models/product');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({products});
  } catch (error) {
    res.status(404).json({msg: 'Invalid request'})
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({product});
  } catch (error) {
    res.status(404).json({msg: 'Invalid request'})
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const products = await Product.findOneAndDelete({_id: req.params.id});
    res.status(200).json({products});
  } catch (error) {
    res.status(404).json({msg: 'Invalid request'})
  }
}

module.exports = { getAllProducts, createProduct, deleteProduct }