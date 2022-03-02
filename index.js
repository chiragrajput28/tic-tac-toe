const express = require('express')
const { message } = require('statuses')
const app = express()
const server = require('http').createServer(app)
const webSockets = require('ws')
const wss = new webSockets.Server({server: server})

// whenever a new connection is made  
wss.on('connection', ws => {
    console.log('a new client connected');
    ws.send('Welcome new client');          // sending message to client

    ws.on('message', data => {              // when the server receives any message from client 
        console.log('received: %s', data);
        ws.send('got your message that is: ' + data)
        wss.clients.forEach(function each(client) {                 // client1 websocket sending message to other client2 websocket
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
  
});

app.get('/', (req, res) => {
    res.send('Hello world')
})

server.listen(5050, () => {
    console.log('listening to port: 5050');
})