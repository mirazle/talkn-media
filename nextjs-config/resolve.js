const path = require('path');

const resolve = (relativePath) => path.resolve(__dirname, '../', relativePath);
module.exports = resolve;
