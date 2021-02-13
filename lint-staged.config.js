const { CLIEngine } = require('eslint');
const cli = new CLIEngine({});

module.exports = {
  // @see https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore-
  '**/*.ts?(x)': [
    (files) => 'eslint --max-warnings=0 --fix ' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
    'stylelint --allow-empty-input --max-warnings=0 --fix',
    'prettier --write',
  ],
  '**/*.js': ['prettier --write'],
  'package.json': ['sort-package-json'],
  '**/*.json': ['prettier --write'],
  '**/*.{less,scss,css}': ['stylelint --allow-empty-input --max-warnings=0 --fix', 'prettier --write'],
  'src/internal-assets/**/*.html': ['htmlhint'],
};
