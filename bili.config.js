const { version } = require('./package')

const banner = `/**
 * vue-good-table v${version}
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */
`

module.exports = {
  banner,
  format: 'umd,cjs,es',
  compress: 'umd',
  plugins: ['vue'],
  vue: {
    css: 'dist/vue-good-table.css',
    cssSourceMap: false
  }
}
