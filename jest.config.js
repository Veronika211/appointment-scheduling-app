// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@ui/(.*)': '<rootDir>/components/ui/$1',
    '@helpers/(.*)': '<rootDir>/helpers/$1',
    '@store/(.*)': '<rootDir>/store/$1',
    '@assets/(.*)': '<rootDir>/assets/$1',
    '@styles/(.*)': '<rootDir>/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
