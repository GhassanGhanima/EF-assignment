module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(scss|css)$': '<rootDir>/__mocks__/styleMock.ts', // Mock SCSS imports
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts', // Mock image imports
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
  };
  