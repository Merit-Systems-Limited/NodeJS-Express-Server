const logEvents = require('./logger');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const dotenv = require('dotenv');
const { contentType } = require('express/lib/response');
const { response } = require('express');
const res = require('express/lib/response');
dotenv.config();

const port = process.env.PORT || 5222;

const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        response.writeHead(200,{
            'Content-Type' : contentType
        });
        response.end(data);
    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        res.end();
    }
}

server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    const extension = path.extname(req.url)
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'tetxt/plain'
            break;
        default:
            contentType = 'text/html';
            break;
    }

    let filePath = contentType === 'text/html' && req.url === '/' 
                    ?  path.join(__dirname, 'views','index.html') 
                    : contentType === 'text/html' && req.url.slice(-1) === '/' 
                        ? path.join(__dirname, 'views',req.url,'index.html') 
                            : contentType === 'text/html'
                                ? path.join(__dirname, 'views', req.url)
                                : path.join(__dirname, req.url);
    // Make .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // Serve the file
        serveFile(filePath, contentType, res);
    }else{
        switch (path.parse(filePath)) {
            case 'old-page.html':
                res.writeHead(301, {'location' : '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'location' : '/'});
                res.end();
                break;
            default:
                //Serve a 404 response
                serveFile(path.join(__dirname, 'views','404.html'), 'text/html', res);
                break;
        }
    }
});



server.listen(port, () => {
    console.log(`Server running on port : http://localhost:${port}`);
});

// Initialize the emitter
const myEmitter =  new Emitter();

// myEmitter.on('log', (msg) => logEvents(msg));
// // Emit Event
// myEmitter.emit('log', 'Log Event Emitted'); 