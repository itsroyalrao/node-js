console.clear();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/home', (req, res, next) => {
    res.send('<form action="/message" method="POST"><input type="text" name="titleName"><input type="text" name="titleValue"><button type="submit">Send</button></form>');
})
app.use('/message', (req, res, next) => {
    console.log(`${req.body.titleName} : ${req.body.titleValue}`);
    res.redirect('back');
})


app.listen(4000);