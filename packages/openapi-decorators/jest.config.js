module.exports = {
  moduleNameMapper: {
    '^.+\\.(css|less|scss|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.jsx?$': 'babel-jest',
  },
  coverageReporters: ['lcov', 'text', 'cobertura', 'json-summary'],
  collectCoverageFrom: ['src/**/*.ts*', '!src/**/*.d.ts*', '!src/**/*.snap'],
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/tools/'],
}
