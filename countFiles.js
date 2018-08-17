const fs = require('fs');
const path = require('path');

let amountOfFiles = 0;

const countFiles = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    if (file.charAt(0) !== '.') {
      fs.statSync(path.join(dir, file)).isDirectory()
        ? countFiles(path.join(dir, file))
        : amountOfFiles++;
    }
  });
  return amountOfFiles;
};

module.exports = countFiles;
