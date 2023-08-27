const Signup = require('../models/signup');

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const signupDetails = await Signup.create(req.body);
    res.status(200).json({ signupDetails })
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser }