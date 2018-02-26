const { version } = require('./package')

const banner = `/**
 * vue-good-table v${version}
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */
`

module.exports = {
  name: 'vue-good-table',
  banner,
  format: [
    "cjs",
    "es",
    "umd",
    "umd-min"
  ],
  compress: 'umd',
  plugins: ['vue'],
  vue: {
    css: true,
  }
}