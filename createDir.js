const fs = require('fs');

/**
 * Функция создает директорию, если ее не существует
 * @param dirPath {string} - путь к папке
 */

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = createDir;
