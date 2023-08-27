const Expense = require('../models/expense');

const getAllExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json({ expense });
  } catch (error) {
    console.log(error);
  }
}

const createExpense = async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    const data = {
      amount: amount,
      description: desc,
      category: category
    }
    console.log(data);
    const expense = await Expense.create(data);
    res.status(201).json({ expense });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllExpenses, createExpense }