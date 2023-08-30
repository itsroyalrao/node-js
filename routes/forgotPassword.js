const express = require('express');
const router = express.Router();
const forgotpassword = require('../controllers/forgotPassword');

router.route('/forgot-password').post(forgotpassword);

module.exports = router;