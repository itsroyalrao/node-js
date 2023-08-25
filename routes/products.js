const express = require('express');
const productControllers = require('../controllers/products');
const router = express.Router();

router.route('/').get(productControllers.getAllProducts).post(productControllers.createProduct);
router.route('/:id').delete(productControllers.deleteProduct);

module.exports = router