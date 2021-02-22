const path = require('path');

const resolve = (relativePath) => {
  return path.resolve(__dirname, '../', relativePath);
};
module.exports = resolve;
