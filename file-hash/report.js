'use strict';
const fs = require('fs');

/*
  * Generate the file report
*/
module.exports = function(fileData, onComplete) {
  fs.readFile('./static/report-template.html', 'utf8', function read(
    err,
    data
  ) {
    if (err) {
      throw err;
    }

    function buildFileList(files) {
      const rows = files
        .map(
          file =>
            `<tr class="main-info"><td colspan="5">${file.pathName}</td></tr>` +
            '<tr class="secondary-info">' +
            `<td>${file.birthtime.YYYYMMDDHHMMSS()}</td>` +
            `<td>${file.atime.YYYYMMDDHHMMSS()}</td>` +
            `<td>${file.mtime.YYYYMMDDHHMMSS()}</td>` +
            `<td>${file.ctime.YYYYMMDDHHMMSS()}</td>` +
            `<td>${file.size} bytes</td>` +
            '</tr>'
        )
        .join('');
      return (
        '<table class="duplicates">' +
        '  <thead>' +
        '    <tr>' +
        '      <th>Created</th>' +
        '      <th>Access</th>' +
        '      <th>Modifyed</th>' +
        '      <th>Change</th>' +
        '      <th>Size (bytes)</th>' +
        '    </tr>' +
        '  </thead>' +
        '  <tbody>' +
        rows +
        '  </tbody>' +
        '</table>'
      );
    }

    function numberWithCommas(x) {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }

    // Sort the fileData for output
    const sortedKeys = Object.keys(fileData.hash).sort(
      (a, b) =>
        fileData.hash[b].count === fileData.hash[a].count
          ? fileData.hash[b].size - fileData.hash[a].size
          : fileData.hash[b].count - fileData.hash[a].count
    );

    // Table rows
    const trs = sortedKeys
      .map((key, index) => {
        const row = fileData.hash[key];

        const rowNum = index + 1;
        let trClass = index % 2 !== 0 ? 'odd' : '';
        if (row.count > 1) {
          trClass += ' highlight';
        }
        const fileList =
          row.count > 1 ? buildFileList(row.files) : row.files[0].pathName;
        const fileSize = numberWithCommas(row.size);
        const duplicates = row.count > 1 ? row.count : '';

        return (
          `      ` +
          `<tr class="${trClass}">` +
          `<td class="num">${rowNum}</td>` +
          `<td class="path">${fileList}</td>` +
          `<td class="size">${fileSize}</td>` +
          `<td class="status">${duplicates}</td>` +
          `</tr>\n`
        );
      })
      .join('');

    const html = data
      .replace('${dateTime}', new Date())
      .replace('${trs}', trs)
      .replace('${fileCount}', fileData.fileCount)
      .replace('${directoryCount}', fileData.directoryCount);

    fs.writeFile('./output/report.html', html, function(err) {
      if (err) {
        return console.log(err);
      }

      // Copy the style file
      fs
        .createReadStream('./static/report-style.css')
        .pipe(fs.createWriteStream('./output/style.css'));

      if (typeof onComplete === 'function') {
        onComplete();
      }
    });
  });
};
