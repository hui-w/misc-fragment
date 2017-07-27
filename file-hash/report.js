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

    // Summary

    // Table rows
    const trs = Object.keys(fileData.hash)
      .map(key => {
        const row = fileData.hash[key];
        return `<tr><td>${row.count}</td><td>${row.files}</td></tr>\n`;
      })
      .join('');

    const html = data
      .replace('${dateTime}', new Date())
      .replace('${trs}', trs)
      .replace('${fileCount}', fileData.fileCount)
      .replace('${directoryCount}', fileData.directoryCount);

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
