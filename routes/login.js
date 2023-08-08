const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/login.html'))
})
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    res.redirect('/message?username=' + encodeURIComponent(username));
})

module.exports = router;