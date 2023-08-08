console.clear();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const loginRoute = require('./routes/login');
const messageRoute = require('./routes/message');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(loginRoute);
app.use(messageRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
app.listen(4000);