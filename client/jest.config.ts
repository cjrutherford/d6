module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.', // This ensures Jest looks for tests in the current directory
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(ts|js)$' : 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
};
