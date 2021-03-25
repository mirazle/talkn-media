const os = require('os');
console.log(os.hostname);
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-high-performance-animation'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
      },
    ],
    'plugin/no-low-performance-animation-properties': true,
    'value-keyword-case': null, // CSS in JSのcamelCase変数が壊れる
    'function-name-case': null, // CSS in JSで使うfunctionが壊れる
    'declaration-empty-line-before': null, // CSS in JSで宣言なくても怒る
  },
};
