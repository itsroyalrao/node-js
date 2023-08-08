const products = [];

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
    products.push({ titleName: req.body.titleName, titleValue: req.body.titleValue });
    res.redirect('/shop');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pagetitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        productCSS: true,
        activeShop: true
    })
}