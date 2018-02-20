import clone from 'lodash.clone';
import def from './default';

const number = clone(def);

number.isRight = true;

number.filterPredicate = function defaultFilter(rowval, filter) {
  return number.compare(rowval, filter) === 0;
};


number.compare = function compareNumbers (x, y) {
  function cook (d) {
    // if d is null or undefined we give it the smallest 
    // possible value
    if (d === undefined || d === null) return -Infinity;
    return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d)
  }

  x = typeof x === 'number' ? x : cook(x);
  y = typeof y === 'number' ? y : cook(y);
  return (x < y ? -1 : (x > y ? 1 : 0));
};

export default number;
