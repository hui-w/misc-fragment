const ExifImage = require('./lib/exif').ExifImage;
const fs = require("fs");
const path = require("path");

const src_path = path.resolve('images_in');
const dest_path = path.resolve('images_out');

// Process the folder
const processFolder = (filePath) => {
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
          processFile(filePathName);
        } else if (stats.isDirectory()) {
          processFolder(filePathName);
        }
      })
    })
  })
};

// Process the file
const processFile = (filePathName) => {
  new ExifImage({ image: filePathName }, function(error, exifData) {
    if (error) {
      console.log('Error: ' + error.message);
    } else {
      // fs.writeFile(path.resolve('info.json'), JSON.stringify(exifData));
      const dateTime = exifData.exif.DateTimeOriginal;
      const newFileName = dateTime.split(':').join('-').replace(' ', '_') + '.jpg';
      copy(filePathName, path.resolve(dest_path, newFileName));
      console.log(newFileName);
    }
  });
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
  console.log('Error: ' + error.message);
}
