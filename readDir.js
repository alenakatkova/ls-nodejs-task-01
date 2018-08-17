const fs = require('fs');
const path = require('path');
const copyFile = require('./copyFile');
const createDir = require('./createDir');
const currentState = require('./state');
let itemsCopied = 0;

/**
 * Функция просматривает все файлы и папки в базовой папке и копирует картинки в новую папку
 * @param base {string} - имя папки, из которой копируем картинки
 * @param destination {string} - имя папки, в которую копируем картинки
 */

const readDir = (base, destination) => {
  // Получаем путь до базовой и конечной папок
  let baseDir = path.join(__dirname, base);
  let destDir = path.join(__dirname, destination);

  // Получаем список всех файлов и папок в базовой папке
  const files = fs.readdirSync(baseDir);

  // Создаем конечную папку, если она не была создана ранее
  createDir(destDir);

  files.forEach(item => {
    // Проверяем, не является ли файл/папка срытым(ой)
    if (item.charAt(0) !== '.') {
      let localBase = path.join(base, item);
      let state = fs.statSync(localBase);

      if (state.isDirectory()) {
        readDir(localBase, destination);
      } else {
        // Определяем папку каталога, в которой будет лежать картинка. Создаем эту папку, если ее нет
        let catalogDirName = item.charAt(0).toLowerCase();
        let catalogDir = path.join(destDir, catalogDirName);
        createDir(catalogDir);

        // Копируем картинку из базовой папки в папку каталога
        const imgNewPath = path.join(catalogDir, item);
        copyFile(localBase, imgNewPath);

        console.log(`File "${item}" copied to dir "${catalogDirName}"`);
        currentState.filesCopied = ++itemsCopied;
      }
    }
  });
};

module.exports = readDir;
