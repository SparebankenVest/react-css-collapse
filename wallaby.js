module.exports = function (wallaby) {
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
    setup: function() {
      var jsdom = require('jsdom');

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
