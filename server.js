const express  = require("express");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5222;

const server = express();
server.use(express.json());
server.use(cors());

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
// Custom 404
server.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
server.listen(PORT, () => console.log(`Howdy, you server is running on : http://localhost:${PORT}`));


module.exports.server = server;