console.clear();

const http = require('http');
const express = require('express');

const app = express();
app.use((request, response, next) => {
    console.log(`In the middleware`);
    next();
})
app.use((request, response, next) => {
    console.log(`In another middleware`);
    response.send('<h1>hello from express js...</h1>');
})

const server = http.createServer(app);
server.listen(4000);