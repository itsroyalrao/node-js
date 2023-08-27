const Signup = require('../models/signup');

const signup = async (req, res) => {
  try {
    const user = await Signup.findOne({ email: req.body.email });
    if (user) return res.status(500).json({ success: false, msg: 'User already exists!' });
    await Signup.create(req.body);
    res.status(200).json({ success: true, msg: 'User is added successfully!' })
  } catch (error) {
    console.log(error);
  }
}


module.exports = { signup };