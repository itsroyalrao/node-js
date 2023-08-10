const path = require('path');
const Product = require('../models/product');
const fs = require('fs');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pagetitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const titleName = req.body.titleName;
    const titleValue = req.body.titleValue;

    const product = new Product(titleName, titleValue);
    product.save();
    res.redirect('/shop');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pagetitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            productCSS: true,
            activeShop: true
        })
    });
}