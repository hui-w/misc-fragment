'use strict';

/*
  * Find out duplicated files
  * How to use: >node index.js [FolderName]
*/

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = (filePath, onMessage, onComplete) => {
  // The object to store all file data
  let fileData = {};

  let fileCount = 0;
  let directoryCount = 0;

  // The count of item to process
  let todoCount = 0;

  const todoIncrease = () => {
    todoCount++;
  };

  const todoReduce = () => {
    todoCount--;

    // Update the message
    sendMessage();

    if (todoCount == 0) {
      // The final output
      if (typeof onComplete === 'function') {
        onComplete(fileData);
      }
    }
  };

  const sendMessage = () => {
    if (typeof onMessage === 'function') {
      onComplete({
        fileCount,
        directoryCount
      });
    }
  };

  // Get all files and directories from the folder
  const readFolder = folderPath =>
    new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

  // Get the type of a file or directory
  const statFile = filePathName =>
    new Promise((resolve, reject) => {
      fs.stat(filePathName, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });

  // Process the folder
  const processFolder = folderPath => {
    readFolder(folderPath)
      .then(fileNames => {
        fileNames.forEach(fileName => {
          // Find new item
          todoIncrease();
          const filePathName = path.join(folderPath, fileName);
          statFile(filePathName)
            .then(stats => {
              if (stats.isFile()) {
                processFile(filePathName);
              } else if (stats.isDirectory()) {
                processFolder(filePathName);
              }
            })
            .catch(err => {
              throw err;
            });
        });

        // Folder processing complete
        directoryCount++;
        todoReduce();
      })
      .catch(err => {
        throw err;
      });
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

        // Add into fileData
        if (fileData[d]) {
          // Key already existing
          fileData[d].count++;
          fileData[d].files.push(filePathName);
        } else {
          // New key
          fileData[d] = {
            count: 1,
            files: [filePathName]
          };
        }

        // File processing complete
        fileCount++;
        todoReduce();
      });
    } catch (error) {
      throw error;
    }
  };

  todoIncrease();
  processFolder(filePath);
};
