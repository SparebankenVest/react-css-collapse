/* eslint global-require: "off" */
module.exports = function configure(wallaby) {
  return {
    files: [
      'src/**',
    ],
    tests: [
      'test/**/*.spec.js',
    ],
    testFramework: 'mocha',
    compilers: {
      '**/*.js*': wallaby.compilers.babel(),
    },
    env: {
      type: 'node',
    },
    setup() {
      const jsdom = require('jsdom');
      const Enzyme = require('enzyme');
      const Adapter = require('enzyme-adapter-react-16');

      Enzyme.configure({ adapter: new Adapter() });

      global.document = jsdom.jsdom('');
      global.window = document.defaultView;

      Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          global[property] = document.defaultView[property];
        }
      });
    },
    debug: true,
  };
};
