const fs = require('fs');
const path = require('path');
const readDir = require('./readDir');

// Введенные пользователем аргументы
const userArgv = process.argv.slice(2);
const base = userArgv[0];
const destination = userArgv[1];
const oldDirAction = userArgv[2];

/**
 * Функция проверяет корректность введенных пользователем аргументов и запускает копирование файла
 */
const init = () => {
  if (userArgv.length < 2) {
    console.log('Please enter arguments: "base dir", "destination dir" and "delete" if you want ' +
      'to delete base dir after copying');
  } else if (!fs.existsSync(path.join(__dirname, base))) {
    console.log('Base directory doesn\'t exist');
  } else if (base === destination) {
    console.log('Base and destination directories must be different');
  } else if (oldDirAction && oldDirAction !== 'delete') {
    console.log('3rd argument must be "delete" or empty');
  } else {
    readDir(base, destination);
  }
};

init();
