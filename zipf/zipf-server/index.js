const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crawler = require('./crawler');
const CONSTANTS = require('./constants')

io.on('connection', (client) => {
    crawler(client, CONSTANTS.WEBSITE_TO_CRAWL);
    console.log('connected');

});
server.listen(CONSTANTS.SOCKET_PORT);
console.log('Startted Socket Coonection on', CONSTANTS.SOCKET_PORT)