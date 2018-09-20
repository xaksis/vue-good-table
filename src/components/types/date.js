var format = require('date-fns/format');
var parse = require('date-fns/parse');
var isValid = require('date-fns/isValid');
var compareAsc = require('date-fns/compareAsc');
import clone from 'lodash.clone';
import def from './default';

const date = clone(def);

date.isRight = true;

date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return parse(`${d}`, `${column.dateInputFormat}`, new Date());
    }
    return d;
  }
  x = cook(x);
  y = cook(y);
  if (!isValid(x)) {
    return -1;
  }
  if (!isValid(y)) {
    return 1;
  }
  return compareAsc(x, y);
};

date.format = function (v, column) {
  if (v === undefined || v === null) return '';
  // convert to date
  const date = parse(v, column.dateInputFormat, new Date());
  return format(date, column.dateOutputFormat);
};

export default date;
