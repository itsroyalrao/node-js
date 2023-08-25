const express = require('express')
const app = express();
const productRoutes = require('./routes/products');
const connectDB = require('./db/connect');
require("dotenv").config();

app.use(express.static('./public'));
app.use(express.json());

app.use('/products', productRoutes);

const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`app listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
}
start();