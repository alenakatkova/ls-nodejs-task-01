const readline = require('readline');

const getDirNames = (callback) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Базовая папка: ', (base) => {
    rl.question('Конечная папка: ', (destination) => {
      rl.close();
      callback(base, destination);
    });
  });
};

module.exports = getDirNames;