const WebSocketServer = require('ws').Server;

function start(port) {
  const wss = new WebSocketServer({ port: port });
  wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      const data = JSON.parse(message);
      console.log('- Message Received: %s', data.op, data.value);
      ws.send(JSON.stringify({
      	op: data.op,
      	value: data.value
      }))
    });
    ws.send('something');
  });
  console.log('Web Socket has started on %s.', port);
}

exports.start = start;
