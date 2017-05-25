var http = require('http');
var url = require('url');

function start(route, handle, port) {
  function onRequest(request, response) {
    var urlObj = url.parse(request.url);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    console.log('= Request Received: ' + pathname + '; Query: ' + query);

    route(pathname, query, handle, response);
  }

  http.createServer(onRequest).listen(port);
  console.log('Server has started on %s.', port);
}

exports.start = start;
