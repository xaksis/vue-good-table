import clone from 'lodash.clone';
import number from './number';

const percentage = clone(number);

percentage.format = function formatPercent(v) {
  return `${parseFloat(v * 100).toFixed(2)}%`;
};

export default percentage;
