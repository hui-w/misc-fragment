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

        const rowNum = index + 1;
        const trClass = row.count > 1 ? 'highlight' : '';
        const fileList = row.count > 1 ? row.files.map(file => `<div>${file}</div>`).join('') : row.files[0];
        const duplicates = row.count > 1 ? row.count : '';

        return `      ` +
          `<tr class="${trClass}">` +
          `<td class="num">${rowNum}</td>` +
          `<td class="path">${fileList}</td>` +
          `<td class="size">${row.size}</td>` +
          `<td class="status">${duplicates}</td>` +
          `</tr>\n`;
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
