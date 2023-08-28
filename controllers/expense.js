const Expense = require('../models/expense');

const getAllExpenses = async (req, res) => {
  try {
    const { userID } = req.query;
    let expense = await Expense.find({});
    if (expense.length) {
      expense = await Expense.find({ userID: userID });
    };
    res.status(200).json({ expense });
  } catch (error) {
    console.log(error);
  }
}

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    console.log(error);
  }
}

const deleteExpense = async (req, res) => {
  try {
    const { expenseID } = req.query;
    await Expense.findOneAndDelete({ _id: expenseID });
    res.status(200).json({ msg: 'delete expense' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllExpenses, createExpense, deleteExpense }