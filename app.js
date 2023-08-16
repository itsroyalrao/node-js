console.clear();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
<<<<<<< HEAD
const db = require('./util/database');
=======
>>>>>>> origin/main

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

<<<<<<< HEAD
db.execute('SELECT * FROM products');

=======
>>>>>>> origin/main
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

<<<<<<< HEAD
app.listen(4000);
=======
app.listen(4000);
>>>>>>> origin/main
