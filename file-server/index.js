var httpServer = require('./http/server');
var router = require('./http/router');
var requestHandlers = require('./http/requestHandlers');
var wsServer = require('./wsServer');

var HTTP_PORT = 8080;
var WS_PORT = 8081;

// Start the web server
var handle = {}
handle['/'] = requestHandlers.home;
handle['/get'] = requestHandlers.get;
handle['/~'] = requestHandlers.sendFile;

httpServer.start(router.route, handle, HTTP_PORT);

// Start the web socket server
wsServer.start(WS_PORT);
