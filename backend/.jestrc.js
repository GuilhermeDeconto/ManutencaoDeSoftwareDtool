
module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  errorOnDeprecated: true,
  notify: true,
  notifyMode: "failure",
  testEnvironment: "node",
};
