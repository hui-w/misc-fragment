const fileHash = require('file-hash');

// Main entry
try {
  if (process.argv.length === 3) {
    const filePath = process.argv[2];
    fileHash(filePath);
  } else {
    console.log('Invalid argument');
  }
} catch (error) {
  console.log('Main Error: ' + error.message);
}
