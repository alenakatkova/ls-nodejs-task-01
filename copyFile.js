const fs = require('fs');

const copyFile = (oldPath, newPath) => {
  fs.readFile(oldPath, (err, data) => {
    if (err) {
      console.log('Ошибка чтения файла');
    }
    fs.writeFile(newPath, data, err => {
      if (err) {
        console.log('Ошибка копирования файла');
      }
    });
  });
};

module.exports = copyFile;
