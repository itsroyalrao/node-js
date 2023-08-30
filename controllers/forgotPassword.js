const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { email } = req.body;

  let transport = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'gudrun29@ethereal.email',
      pass: 'rpXdYpYzNVTfxSpc4K'
    }
  })

  let info = await transport.sendMail({
    from: '<gudrun29@ethereal.email>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  })

  console.log("Message sent:", info.messageId);
  res.status(200).json(info);
}

module.exports = sendMail;