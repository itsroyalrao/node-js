const Expense = require('../models/expense');
const Signup = require('../models/signup');

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
    const totalExpense = await Signup.findById(req.body.userID);
    totalExpense.totalExpense += Number(req.body.amount);
    await totalExpense.save();

    const expense = await Expense.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    console.log(error.message);
  }
}

const deleteExpense = async (req, res) => {
  try {
    const { expenseID } = req.query;
    const expense = await Expense.findById(expenseID);
    const { userID, amount } = expense;
    const totalExpense = await Signup.findById(userID);
    totalExpense.totalExpense -= amount;
    await totalExpense.save();

    await Expense.findOneAndDelete({ _id: expenseID });
    res.status(200).json({ msg: 'delete expense' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllExpenses, createExpense, deleteExpense };