import { format, parse, isValid, compareAsc } from 'date-fns';
import def from './default';

const date = Object.assign({}, def);

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
  if (isValid(date)) {
    return format(date, column.dateOutputFormat);
  }
  console.error(`Not a valid date: "${v}"`);
  return null;
};

export default date;
