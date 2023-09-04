require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const expenseRoute = require('./routes/expense');
const paymentRoute = require('./routes/payment');
const resetpassword = require('./routes/resetPassword');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(express.static("./public"));
app.use(express.json());
// app.use(helmet());   // blocking axios
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/expense', expenseRoute);
app.use('/payment', paymentRoute);
app.use('/password', resetpassword);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
}
start();