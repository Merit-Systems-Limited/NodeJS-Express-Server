const express  = require("express");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5222;

const server = express();
server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    console.log('Welcome Brian Koech');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
server.get('/new', (req, res) => {
    console.log('Welcome Brian Koech');
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

server.listen(PORT, () => console.log(`Howdy, you server is running on : http://localhost:${PORT}`));


module.exports.server = server;