import number from './number';

const percentage = Object.assign({}, number);

percentage.format = function (v) {
  if (v === undefined || v === null) return '';
  return `${parseFloat(v * 100).toFixed(2)}%`;
};

export default percentage;
