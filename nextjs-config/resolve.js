const path = require('path');

const resolve = (relativePath) => {
  console.log('@@@@@@@@@@@@');
  console.log(relativePath);
  console.log(path.resolve(__dirname, '../', relativePath));
  return path.resolve(__dirname, '../', relativePath);
};
module.exports = resolve;
