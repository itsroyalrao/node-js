const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const downloadExpense = require('../controllers/downloadExpense');

router.route('/').post(expenseController.createExpense).get(expenseController.getAllExpenses).delete(expenseController.deleteExpense);
router.route('/download').get(downloadExpense.getObject).put(downloadExpense.putObject);

module.exports = router;