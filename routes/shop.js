<<<<<<< HEAD
const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

module.exports = router;
>>>>>>> 391232ed44104986a297bd2bbbfb4c4a6c6861d9
