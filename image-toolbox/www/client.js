var ws = new WebSocket('ws://127.0.0.1:8081/');

ws.onopen = function() {
  console.log('WebSocket Open');
  sendMessage('connect', 'Message from the client');
};

ws.onmessage = function(evt) {
  handleMessage(evt.data);
};

ws.onclose = function() {
  console.log('WebSocket Closed');
};

ws.onerror = function(err) {
  console.log('WebSocket Error: ' + err);
};

// Util
function sendMessage(op, value) {
  if (ws.readyState != 1) {
    console.log('WebSocket is not connected');
    return;
  }

  var obj = {
    op: op,
    value: txtPath.value
  };
  ws.send(JSON.stringify(obj));
}

function handleMessage(data) {
  console.log(data);
}

function process() {
  var txtPath = document.getElementById('txtPath');
  if (txtPath) {
    sendMessage('start', txtPath.value);
  }
}
