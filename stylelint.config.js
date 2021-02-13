module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-high-performance-animation'],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
    'value-keyword-case': null, // CSS in JSのcamelCase変数が壊れる
    'function-name-case': null, // CSS in JSで使うfunctionが壊れる
    'declaration-empty-line-before': null, // CSS in JSで宣言なくても怒る
  },
};
