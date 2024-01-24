// jest.config.js

module.exports = {
  // ...otras configuraciones de Jest
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/empty.js'
  }
}
