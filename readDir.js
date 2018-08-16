const fs = require('fs');
const path = require('path');

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
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  // Работаем поочередно с каждым(ой) файлом/папкой из базовой папки
  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);

    if (state.isDirectory()) {
      readDir(localBase, destination);
    } else {
      // Определяем папку каталога, в которой будет лежать картинка. Создаем эту папку, если она не была создана ранее
      let catalogDirName = item.charAt(0);
      let catalogDir = path.join(destDir, catalogDirName);
      if (!fs.existsSync(catalogDir)) {
        fs.mkdirSync(catalogDir);
      }

      // Копируем картинку из базовой папки в папку каталога
      const imgNewPath = path.join(catalogDir, item);
      fs.readFile(localBase, (err, data) => {
        if (err) throw err;
        fs.writeFile(imgNewPath, data, err => {
          if (err) {
            console.log(err);
          }
        });
      });

      console.log(`I am copying file "${item}" into directory "${catalogDirName}"`);
    }
  });
};

module.exports = readDir;
