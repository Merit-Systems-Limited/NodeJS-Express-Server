const express  = require("express");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { logger } = require('./middleware/logger');
dotenv.config();
const server = express();
const PORT = process.env.PORT || 5222;

// Custom Middleware logger
server.use(logger);
// Cors
const whiteList = ['http://localhost:4200', 'http://localhost:5222','http://127.0.0.1:5222'];
// Set Cors Options
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else{
            callback(new Error('Not Allowed By CORS'));
        }
    },
    optionsSuccessStatus : 200
}
server.use(cors(corsOptions));
// Encoding middleware inbuilt to express
server.use(express.urlencoded({ extended: false }));
// JSON Middleware
server.use(express.json());

// Serving static files Middleware
server.use(express.static(path.join(__dirname, '/public')));

server.get('^/$|/index(.html)?', (req, res) => {
    console.log('Welcome Brian Koech');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

server.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// Handling Redirects
server.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Route handlers
server.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next()
},(req, res) => {
    res.send('Hello World');
});

const one = (req, res, next)=> {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished')
}
// Route chaining
server.get('/chain(.html)?', [one, two, three]); 

// Custom 404
server.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

server.listen(PORT, () => console.log(`Howdy, you server is running on : http://localhost:${PORT}`));

module.exports.server = server;