const bcrypt = require('bcrypt');
const Signup = require('../models/signup');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Signup.findOne({ email: email });
    if (user) return res.status(500).json({ success: false, msg: 'User already exists!' });
    bcrypt.hash(password, 10, async (err, encrypted) => {
      console.log(err);

      await Signup.create({ name, email, password: encrypted });
      res.status(200).json({ success: true, msg: 'User is added successfully!' })
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = { signup };