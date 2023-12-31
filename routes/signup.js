const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup');

router.route('/').post(signupController.signup);

module.exports = router;