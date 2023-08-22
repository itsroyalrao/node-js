const Expense = require("../models/expense");

const getAllExpenses = async (req, res, next) => {
  try {
    const [expense, _] = await Expense.fetchAll();
    res.render("index", { expense });
  } catch (error) {
    console.log(error);
    +next(error);
  }
};

const createNewExpense = async (req, res, next) => {
  try {
    let { amount, description, category } = req.body;
    let expense = new Expense(amount, description, category);
    expense = await expense.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    console.log(expenseId);
    await Expense.deleteExpense(expenseId);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getAllExpenses, createNewExpense, deleteExpense };
