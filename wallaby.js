/* eslint global-require: "off" */
module.exports = function configure(wallaby) {
  return {
    files: [
      'setup.js',
      'src/**',
      '!src/**/*.spec.js',
    ],
    tests: [
      'src/**/*.spec.js',
    ],
    testFramework: 'jest',
    env: {
      type: 'node',
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
    },
    setup(instance) {
      const jestConfig = require('./package.json').jest;

      instance.testFramework.configure(jestConfig);
    },
  };
};
