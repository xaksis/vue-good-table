const { version } = require('./package');

const banner = `/**
 * vue-good-table v${version}
 * (c) 2018-present xaksis <shay@crayonbits.com>
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */
`;

module.exports = {
  banner,
  output: {
    fileName: (context, defaultFileName) => {
      if (context.format === 'umd' || context.format === 'umd-min') {
        return 'vue-good-table[min].js';
      }
      return 'vue-good-table.[format].js';
    },
    moduleName: 'vue-good-table',
    format: [
      'cjs',
      'es',
      'umd',
      'umd-min',
    ],
  },
  plugins: {
    vue: {
      css: false,
    },
  },
};
