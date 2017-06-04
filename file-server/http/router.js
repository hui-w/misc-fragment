function route(pathname, query, handle, response) {
  // console.log('Route for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    // User defined handler
    handle[pathname](query, response);
  } else {
    // Respond with the file content
    handle['/~'](pathname, response);
    /* console.log('No request handler found for ' + pathname);
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 not found');
      response.end();
      */
  }
}

exports.route = route;
