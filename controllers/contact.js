exports.getContactPage = (req, res, next) => {
    res.render('contact', {
        pagetitle: 'Contact Us',
        path: '/contact',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postContactPage = (req, res, next) => {
    res.redirect('/success');
}

exports.getSuccessPage = (req, res, next) => {
    res.render('success', {
        pagetitle: 'Success',
        path: '/success',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}