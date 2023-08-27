const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.route('/').post(expenseController.createExpense).get(expenseController.getAllExpenses);

module.exports = router;