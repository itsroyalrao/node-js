const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.route('/').get(paymentController.getPaymentID).post(paymentController.createPayment);
router.route('/leaderboard').get(paymentController.getLeaderboard);

module.exports = router;