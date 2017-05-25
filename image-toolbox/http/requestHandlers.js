var querystring = require('querystring');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');

function getText(response) {
  var text = 'Winnie the Witch';
  console.log('= [Handler: getText]');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(text);
  response.end();
}

function getImage(response) {
  console.log('= [Handler: getImage]');
  fs.readFile('./www/images/abracadabra.jpg', 'binary', function(error, file) {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'image/jpg' });
      response.write(file, 'binary');
      response.end();
    }
  });
}

function getBigImage(response) {
  console.log('= [Handler: getBigImage]');
  fs.readFile('./www/images/view.jpg', 'binary', function(error, file) {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'image/jpg' });
      response.write(file, 'binary');
      response.end();
    }
  });
}

function get(query, response) {
  // console.log('Query: ' + query);
  var queryObj = querystring.parse(query);
  for (key in queryObj) {
    // console.log('key: ' + key + ', value: ' + queryObj[key]);
  }
  var type = queryObj['type'];
  switch (type) {
    case 'text':
      getText(response);
      break;

    case 'image':
      getImage(response);
      break;

    case 'bigimage':
      getBigImage(response);
      break;

    default:
      var text = 'handler type ' + type + ' is unknown.';
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write(text);
      response.end();
      break;
  }
}

function home(query, response) {
  /*
    console.log('Hello World');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end();
    */
  sendFile('index.html', response);
}

function sendFile(pathname, response) {
  var realPath = path.join('www', pathname);
  var ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : 'unknown';

  fs.exists(realPath, function(exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('This request URL ' + pathname + ' was not found on this server.');
      response.end();
    } else {
      fs.readFile(realPath, 'binary', function(err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.end(err);
        } else {
          var contentType = mine[ext] || 'text/plain';
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });
}

exports.get = get;
exports.home = home;
exports.sendFile = sendFile;
