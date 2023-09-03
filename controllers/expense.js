const Expense = require('../models/expense');
const Signup = require('../models/signup');

const getAllExpenses = async (req, res) => {
  try {
    const { userID, page, limit } = req.query;
    let expense = await Expense.find({});
    if (expense.length) {
      expense = await Expense.find({ userID: userID });
      const userList = [];
      for (let i = limit * [page - 1]; i < limit * page && i < expense.length; i++) {
        userList.push(expense[i]);
      }
      return res.status(200).json({ userList });
    };
    res.status(200).json({ expense });
  } catch (error) {
    console.log(error);
  }
}

const createExpense = async (req, res) => {
  try {
    // const totalExpense = await Signup.findById(req.body.userID);
    // totalExpense.totalExpense += Number(req.body.amount);
    // await totalExpense.save();

    // const expense = await Expense.create(req.body);

    for (let i = 1; i <= 200; i++) {
      const obj = { amount: i, description: req.body.description, category: req.body.category, userID: req.body.userID };
      await Expense.create(obj);
    }

    res.status(201).json({ msg: 'success' });
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
  const len = await Expense.find({ id: req.body.userID })
  res.status(200).json(len.length);
}

module.exports = { getAllExpenses, createExpense, deleteExpense, getExpenseLength };