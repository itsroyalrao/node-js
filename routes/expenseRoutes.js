const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getAllExpenses);
router.post("/", expenseController.createNewExpense);
router.post("/:id", expenseController.deleteExpense);

module.exports = router;
