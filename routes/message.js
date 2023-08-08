const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

let username;

router.get('/message', (req, res, next) => {
    username = req.query.username;
    res.sendFile(path.join(__dirname, '..', 'views', '/message.html'))
})
router.post('/', (req, res, next) => {
    const query = req.body.query;

    fs.appendFileSync(path.join(__dirname, '..', 'message.txt'), `${username}: ${query}\n`);
    const content = fs.readFileSync(path.join(__dirname, '..', 'message.txt'), 'utf-8');
    res.redirect('/?content=' + encodeURIComponent(content));
})
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/message.html'))
})

module.exports = router;

