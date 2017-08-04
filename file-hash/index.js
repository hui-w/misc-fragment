'use strict';
const hashFiles = require('./file-hash');
const showReport = require('./report');

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
