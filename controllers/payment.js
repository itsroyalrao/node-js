const Razorpay = require('razorpay');
const Payment = require('../models/payment');

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

module.exports = { createPayment, getPaymentID };