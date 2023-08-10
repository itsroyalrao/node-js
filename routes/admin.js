<<<<<<< HEAD
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
=======
// const path = require('path');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
>>>>>>> 391232ed44104986a297bd2bbbfb4c4a6c6861d9
