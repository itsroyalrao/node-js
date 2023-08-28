const Razorpay = require('razorpay');
const Payment = require('../models/payment');
const Users = require('../models/signup');
const Expense = require('../models/expense');

const getPaymentID = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500;
    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
    })
    res.status(201).json({ success: true, order, key_id: process.env.RAZORPAY_KEY_ID, amount })

  } catch (error) {
    console.log('error -> ', error);
  }
}

const createPayment = async (req, res) => {
  try {
    await Payment.create(req.body);
    res.status(201).json({ msg: "payment successful" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
}

const getLeaderboard = async (req, res) => {
  try {
    const users = await Users.find({});
    const userData = await user(users);
    userData.sort((a, b) => {
      if (a.amount === 0 && b.amount === 0) return a.id - b.id;
      if (a.amount === 0) return 1;
      if (b.amount === 0) return -1;
      return a.amount - b.amount;
    });
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
}

const user = async (users) => {
  try {
    const expense = await Expense.find({});
    const userData = [];
    for (let i = 0; i < users.length; i++) {
      const singleUser = {};
      const userid = String(users[i]._id);
      let total = 0;
      for (let j = 0; j < expense.length; j++) {
        const id = expense[i].userID;
        if (userid === id) {
          total += expense[i].amount;
        }
      }
      singleUser.id = i;
      singleUser.name = users[i].name;
      singleUser.amount = total;
      userData.push(singleUser)
    }
    return userData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createPayment, getPaymentID, getLeaderboard };