const Expense = require('../models/expense');
const Signup = require('../models/signup');

let flag = false;
const getAllExpenses = async (req, res) => {
  try {
    const { userID, start, end } = req.query;
    let expense = await Expense.find({ userID: userID });
    if (expense.length > end || flag) {
      flag = true;
      const userList = expense;
      expense = [];
      for (let i = Number(start); i < Number(end) && i < userList.length; i++) {
        expense.push(userList[i]);
      }
      return res.status(200).json({ expense });
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

    // for (let i = 1; i <= 200; i++) {
    //   const obj = { amount: i, description: req.body.description, category: req.body.category, userID: req.body.userID };
    //   await Expense.create(obj);
    // }

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

const getExpenseLength = async (req, res) => {
  const len = await Expense.find({ userID: req.query.userID })
  res.status(200).json(len.length);
}

module.exports = { getAllExpenses, createExpense, deleteExpense, getExpenseLength };