'use strict';
const fs = require('fs');

/*
  * Generate the file report
*/
module.exports = function(fileData, onComplete) {
  fs.readFile('./template-report.html', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    const trs = Object.keys(fileData)
      .map(key => {
        const row = fileData[key];
        return `<tr><td>${row.count}</td><td>${row.files}</td></tr>`;
      })
      .join('');

    console.log(data);

    const html = data.replace('${trs}', trs);

    fs.writeFile('./report.html', html, function(err) {
      if (err) {
        return console.log(err);
      }

      if (typeof onComplete === 'function') {
        onComplete();
      }
    });
  });
};
