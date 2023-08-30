const express = require('express');
const router = express.Router();
const resetpassword = require('../controllers/resetPassword');

router.route('/forgot-password').post(resetpassword.send_mail);
router.route('/forgot-password/:id').get(resetpassword.changePassword);

module.exports = router;