const logEvents = require('./logger');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// Initialize the emitter
const myEmitter =  new MyEmitter();

// Add a listener for the log event

myEmitter.on('log', (msg) => {
    logEvents(msg);
});

setTimeout(() => {
   // Emit Event
   myEmitter.emit('log', 'Log Event Emitted'); 
}, 2000);