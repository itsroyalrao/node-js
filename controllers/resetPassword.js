const nodemailer = require("nodemailer");
const Signup = require('../models/signup');
const { v4: uuidv4 } = require('uuid');
const ResetPassword = require('../models/resetPassword');

const send_mail = async (req, res) => {
  try {
    const uuid = uuidv4();
    const { email } = req.body;

    const user = await Signup.find({ email: email })
    if (user.length !== 0) {
      let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD,
        }
      })

      let info = {
        from: process.env.GMAIL,
        to: email,
        subject: "Hello ✔",
        text: `http://localhost:3000/password/forgot-password/${uuid}`,
      }

      transport.sendMail(info, err => {
        if (err) console.log(err);
        else console.log('Email has sent');
      })

      const obj = {
        id: uuid,
        userId: user[0].email,
      }
      const resetPassword = await ResetPassword.create(obj);
      res.status(200).json(info);
    } else {
      res.status(404).json({ msg: "Email is not registered" });
    }
  } catch (e) {
    console.log(e.message);
  }
}

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;

    let changePassword = await ResetPassword.find({ id: id });
    changePassword[0].isActive = 'false';

    await changePassword[0].save();
    res.status(200).redirect('/changePassword.html');
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { send_mail, changePassword };











// const nodemailer = require("nodemailer");
// const Signup = require('../models/signup');
// const { v4: uuidv4 } = require('uuid');
// const ResetPassword = require('../models/resetPassword');

// const sendMail = async (req, res) => {
//   try {
//     const uuid = uuidv4();
//     const { email } = req.body;

//     const user = await Signup.find({ email: email })
//     if (user.length !== 0) {
//       let transport = await nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//           user: 'gudrun29@ethereal.email',
//           pass: 'rpXdYpYzNVTfxSpc4K'
//         }
//       })

//       let info = await transport.sendMail({
//         from: '<royal@ethereal.email>',
//         to: email,
//         subject: "Hello ✔",
//         text: "Hello world?",
//         html: "<b>Hello world?</b>",
//       })

//       const obj = {
//         id: uuid,
//         userId: user.email,
//       }
//       const resetPassword = await ResetPassword.create()
//       console.log(info.messageId);
//       res.status(200).json(info);
//     } else {
//       res.status(404).json({ msg: "Email is not registered" });
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// module.exports = sendMail;