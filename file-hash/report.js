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
      .map((key, index) => {
        const row = fileData.hash[key];
        if (row.count > 1) {
          const fileList = row.files.map(file => `<div>${file}</div>`).join('');
          return `      <tr class="warning"><td>${index + 1}</td><td>${fileList}</td><td>${row.count}</td></tr>\n`;
        } else {
          return `      <tr><td>${index + 1}</td><td>${row.files[0]}</td><td>${row.count}</td></tr>\n`;
        }
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
