import { format, parse, isValid, compareAsc } from 'date-fns/esm';
import clone from 'lodash.clone';
import def from './default';

const date = clone(def);

date.isRight = true;

date.compare = function compare(x, y, column) {
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

date.format = function formatDate(v, column) {
  // convert to date
  const date = parse(v, column.dateInputFormat, new Date());
  return format(date, column.dateOutputFormat);
};

export default date;
