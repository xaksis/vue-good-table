import clone from 'lodash.clonedeep';
import number from './number';

const percentage = clone(number);

percentage.format = function (v) {
  if (v === undefined || v === null) return '';
  return `${parseFloat(v * 100).toFixed(2)}%`;
};

export default percentage;
