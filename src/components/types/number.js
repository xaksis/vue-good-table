import def from './default';

const number = Object.assign({}, def);

number.isRight = true;

number.filterPredicate = function (rowval, filter) {
  return number.compare(rowval, filter) === 0;
};


number.compare = function (x, y) {
  function cook(d) {
    // if d is null or undefined we give it the smallest
    // possible value
    if (d === undefined || d === null) return -Infinity;
    return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d, 10);
  }

  x = typeof x === 'number' ? x : cook(x);
  y = typeof y === 'number' ? y : cook(y);
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

export default number;
