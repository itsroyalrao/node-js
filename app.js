require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const expenseRoute = require('./routes/expense');
const paymentRoute = require('./routes/payment');

app.use(express.static("./public"));
app.use(express.json());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/expense', expenseRoute);
app.use('/payment', paymentRoute);

const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
}
start();