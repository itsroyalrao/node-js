
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();

    const url = req.url;

    if (url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body><h4>Welcome home</h4></body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>About Us</title></head>');
        res.write('<body><h4>Welcome to About Us page</h4></body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/node') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node JS</title></head>');
        res.write('<body><h4>Welcome to my Node Js project</h4></body>');
        res.write('</html>');
        return res.end();
    }
})

server.listen(4000)