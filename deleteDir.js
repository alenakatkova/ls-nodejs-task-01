const fs = require('fs');
const path = require('path');

/**
 * Функция удаляет заданную директорию и все файлы в ней
 * @param base {string} - название директории
 */

const deleteDir = (base) => {
  // Путь к базовой директории
  let baseDir = path.join(__dirname, base);

  // Получаем список всех файлов и папок в базовой директории
  const files = fs.readdirSync(baseDir);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);

    if (state.isDirectory()) {
      deleteDir(localBase);
    } else {
      fs.unlinkSync(localBase);
    }
  });

  fs.rmdirSync(baseDir, err => {
    if (err) {
      console.log('Delete error');
    }
  });
};

module.exports = deleteDir;
