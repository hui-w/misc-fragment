const ExifImage = require('./lib/exif').ExifImage;
const fs = require('fs');
const path = require('path');

const src_path = path.resolve('C:\\Users\\hwang\\Pictures');
const dest_path = path.resolve('images_out');

// Process the folder
const processFolder = (filePath) => {
  try {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      files.forEach((fileName) => {
        const filePathName = path.join(filePath, fileName);
        fs.stat(filePathName, (err, stats) => {
          if (err) throw err;

          if (stats.isFile()) {
            getNameByExif(filePathName, stats.ctime);
          } else if (stats.isDirectory()) {
            processFolder(filePathName);
          }
        })
      })
    })
  } catch (error) {
    throw error;
  }
};

// Process the file
const getNameByExif = (filePathName, fileCreateTime) => {
  if (!/\.(jpg|jpeg|JPG|JPEG)$/.test(filePathName)) {
    return;
  }

  try {
    new ExifImage({ image: filePathName }, function(error, exifData) {
      if (error) {
        // console.log('Error: ' + error.message);
      } else {
        // fs.writeFile(path.resolve('info.json'), JSON.stringify(exifData));
        const dateTime = exifData.exif.DateTimeOriginal;
        if (dateTime) {
          const newFileName = dateTime.split(':').join('-').replace(' ', '_') + '.jpg';
          // copy(filePathName, path.resolve(dest_path, newFileName));
          console.log(newFileName);
        } else {
          console.log(fileCreateTime);
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

// Copy file
const copy = (src, dst) => {
  fs.writeFileSync(dst, fs.readFileSync(src));
}

// For big file
const copy2 = (src, dst) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

// Main entry
try {
  processFolder(src_path);
} catch (error) {
  console.log('Main Error: ' + error.message);
}
