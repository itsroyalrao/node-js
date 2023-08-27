const Signup = require('../models/signup');

const login = async (req, res) => {
  try {
    const user = await Signup.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, msg: "Email is incorrect!" });

    const passwordMatch = user.password === req.body.password;
    if (passwordMatch) return res.status(200).json({ success: true, msg: 'User login sucessful!' });
    else return res.status(401).json({ success: false, msg: 'Password do not match!' });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { login };