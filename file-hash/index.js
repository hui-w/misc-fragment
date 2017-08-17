'use strict';
const hashFiles = require('./file-hash');
const showReport = require('./report');

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
  value: function() {
    function pad2(n) {
      // Always returns a string
      return (n < 10 ? '0' : '') + n;
    }

    return (
      this.getFullYear() +
      pad2(this.getMonth() + 1) +
      pad2(this.getDate()) +
      pad2(this.getHours()) +
      pad2(this.getMinutes()) +
      pad2(this.getSeconds())
    );
  }
});

// Main entry
try {
  if (process.argv.length === 3) {
    const filePath = process.argv[2];
    hashFiles(
      filePath,
      message => {
        console.log(message);
        //process.stdout.write(message + '\r');
      },
      fileData => {
        showReport(fileData, function() {
          console.log('Done');
        });
      }
    );
  } else {
    console.log('Invalid argument');
  }
} catch (error) {
  console.log('Main Error: ' + error.message);
}
