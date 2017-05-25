var server = require('./http/server');
var router = require('./http/router');
var requestHandlers = require('./http/requestHandlers');

var HTTP_PORT = 8080;
var WS_PORT = 8081;

// Start the web server
var handle = {}
handle['/'] = requestHandlers.home;
handle['/get'] = requestHandlers.get;
handle['/~'] = requestHandlers.sendFile;

server.start(router.route, handle, HTTP_PORT);

// Start the web socket server
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: WS_PORT });
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('- Message Received: %s', message);
  });
  ws.send('something');
});
console.log('Web Socket has started on %s.', WS_PORT);
