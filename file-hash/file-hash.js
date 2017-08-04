'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/*
  * Find out duplicated files
  * How to use: >node index.js [FolderName]
*/
module.exports = function(filePath, onMessage, onComplete) {
  // The object to store all file data
  let fileData = {
    fileCount: 0,

    // The directory count and todoCount starts from 1 as there is a filePath passed in
    directoryCount: 1,

    hash: {}
  };

  let fileList = [];

  // The count of item to process
  let todoCount = 1;

  function sendMessage(message) {
    if (typeof onMessage === 'function') {
      onMessage(message);
    }
  }

  function todoIncrease() {
    todoCount++;
  }

  function todoReduce() {
    todoCount--;

    // Update the message
    sendMessage(
      `Found ${fileData.fileCount} files in ${fileData.directoryCount} directories`
    );

    // File list ready, start to process
    if (todoCount == 0) {
      // console.log(fileList);
      processFiles();
    }
  }

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

  // Hash the file
  const hashFile = filePathName =>
    new Promise((resolve, reject) => {
      try {
        const md5sum = crypto.createHash('md5');

        const s = fs.ReadStream(filePathName);
        s.on('data', function(d) {
          md5sum.update(d);
        });

        s.on('end', function() {
          const d = md5sum.digest('hex');

          resolve(d);
        });
      } catch (err) {
        reject(err);
      }
    });

  // Process the folder
  function processFolder(folderPath) {
    readFolder(folderPath)
      .then(fileNames => {
        if (fileNames.length == 0) {
          // This is an empty directory
          todoReduce();
        }

        // To through each item
        fileNames.forEach((fileName, index) => {
          const filePathName = path.join(folderPath, fileName);
          statFile(filePathName)
            .then(stats => {
              if (stats.isFile()) {
                const fileSizeInBytes = stats.size;
                //Convert the file size to megabytes (optional)
                const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

                // Add the file to the list and it will be handled later
                fileList.push({
                  filePathName,
                  size: fileSizeInBytes
                });

                // New file found
                fileData.fileCount++;
              } else if (stats.isDirectory()) {
                // Find new item
                todoIncrease();

                processFolder(filePathName);

                // New directory found
                fileData.directoryCount++;
              }

              if (index === fileNames.length - 1) {
                // Folder checking complete
                todoReduce();
              }
            })
            .catch(err => {
              throw err;
            });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  // Calc the md5 sum of the file
  function processFiles() {
    if (fileList.length <= 0) {
      // The final output
      if (typeof onComplete === 'function') {
        onComplete(fileData);
      }

      return;
    }

    // Get one file from the list
    const fileObj = fileList.pop();
    const filePathName = fileObj.filePathName;
    const fileNumber = fileData.fileCount - fileList.length;
    sendMessage(`Processing ${fileNumber} of ${fileData.fileCount}`);

    hashFile(filePathName)
      .then(d => {
        // Add into fileData
        if (fileData.hash[d]) {
          // Key already existing
          fileData.hash[d].count++;
          fileData.hash[d].files.push(filePathName);
        } else {
          // New key
          fileData.hash[d] = {
            count: 1,
            files: [filePathName],
            size: fileObj.size
          };
        }

        // Process next file if exists
        processFiles();
      })
      .catch(err => {
        throw err;
      });
  }

  processFolder(filePath);
};
