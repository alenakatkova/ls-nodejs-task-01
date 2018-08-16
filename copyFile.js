const fs = require('fs');

/**
 * Функция копирует файл в заданную директорию
 * @param oldPath {string} - откуда копируем файл
 * @param newPath {string} - куда файл
 */

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
