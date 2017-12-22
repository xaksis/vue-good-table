import clone from 'lodash.clone'
import number from './number'

var decimal = clone(number)
decimal.format = function formatDecimal (v) {
  return parseFloat(Math.round(v * 100) / 100).toFixed(2)
}

export default decimal
