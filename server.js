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
    res.sendFile('./views/index.html',{ root: __dirname });
});

server.listen(PORT, () => console.log(`Howdy, you server is running on : http://localhost:${PORT}`));


module.exports.server = server;