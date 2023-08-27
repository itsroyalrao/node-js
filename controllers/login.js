const bcrypt = require('bcrypt');
const Signup = require('../models/signup');

const login = async (req, res) => {
  try {
    const user = await Signup.findOne({ email: req.body.email });
    if (!user) return res.status(200).json({ success: false, msg: "Email is incorrect!" });
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(user.password);
    if (passwordMatch) return res.status(200).json({ success: true, msg: 'Logged in successfully!' });
    else return res.status(200).json({ success: true, msg: 'Password do not match!' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { login };