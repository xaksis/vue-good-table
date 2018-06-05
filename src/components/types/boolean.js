import clone from 'lodash.clone';
import def from './default';

const boolean = clone(def);

boolean.isRight = true;

boolean.filterPredicate = function (rowval, filter) {
  return boolean.compare(rowval, filter) === 0;
};


boolean.compare = function (x, y) {
  function cook(d) {
    // if d is null or undefined we give it the smallest
    // possible value
    if (typeof d !== 'boolean') return -Infinity;
    return d ? 1 : 0;
  }

  x = cook(x);
  y = cook(y);
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

export default boolean;
