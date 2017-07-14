/*
  * Find out duplicated files
  * How to use: >node index.js [FolderName]
*/

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// The count of item to process
var queueSize = 0;

const queueIncrease = () => {
  queueSize++;
};

const queueReduce = () => {
  queueSize--;

  if (queueSize == 0) {
    console.log('done');
  }
};

// Recursively process the folder
const processFolder = filePath => {
  try {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      files.forEach(fileName => {
        // Find new item
        queueIncrease();
        const filePathName = path.join(filePath, fileName);
        fs.stat(filePathName, (err, stats) => {
          if (err) throw err;

          if (stats.isFile()) {
            processFile(filePathName);
          } else if (stats.isDirectory()) {
            processFolder(filePathName);
          }
        });
      });

      // Folder processing complete
      queueReduce();
    });
  } catch (error) {
    throw error;
  }
};

// Calc the md5 sum of the file
const processFile = filePathName => {
  try {
    //console.log(filePathName);
    //return;
    const md5sum = crypto.createHash('md5');

    const s = fs.ReadStream(filePathName);
    s.on('data', function(d) {
      md5sum.update(d);
    });

    s.on('end', function() {
      const d = md5sum.digest('hex');
      console.log(d + '  ' + filePathName);

      // File processing complete
      queueReduce();
    });
  } catch (error) {
    throw error;
  }
};

// Main entry
try {
  if (process.argv.length === 3) {
    const filePath = process.argv[2];
    queueIncrease();
    processFolder(filePath);
  } else {
    console.log('Invalid argument');
  }
} catch (error) {
  console.log('Main Error: ' + error.message);
}
