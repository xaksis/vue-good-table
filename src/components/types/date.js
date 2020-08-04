import dayjs from 'dayjs';
import clone from 'lodash.clonedeep';
import def from './default';

const date = clone(def);

date.isRight = true;

date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return dayjs(`${d}`, `${column.dateInputFormat}`, new Date());
    }
    return d;
  }
  x = cook(x);
  y = cook(y);
  if (!x.isValid()) {
    return -1;
  }
  if (!y.isValid()) {
    return 1;
  }

  if(x.isSame(y)) {
    return 0;
  }
  else if(x.isBefore(y)) {
      return -1;
  }
  else {
      return 1;
  }
};

date.format = function (v, column) {
  if (v === undefined || v === null) return '';
  // convert to date
  const date = dayjs(v, column.dateInputFormat);
  if (date.isValid()) {
    return date.format(column.dateOutputFormat);
  }
  console.error(`Not a valid date: "${v}"`);
  return null;
};

export default date;
