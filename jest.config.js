// @ts-check
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'html'],
  moduleNameMapper: {
    '^sitemap.json$': '<rootDir>/src/sitemap.json',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports',
        outputName: 'junit.xml',
      },
    ],
  ],
  testMatch: ['**/__tests__/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt)$': 'jest-raw-loader', // html-loader and html-loader-jest do not work well
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    // test 時に TypeScript の設定を一部変更して実行する設定
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
};

module.exports = config;
