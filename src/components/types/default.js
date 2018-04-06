import diacriticless from 'diacriticless';

export default {
  format(x) {
    return x;
  },
  filterPredicate(rowval, filter) {
    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    }

    // row value
    const rowValue = diacriticless(String(rowval).toLowerCase());

    // search term
    const searchTerm = diacriticless((filter).toLowerCase());

    // comparison
    return (rowValue.search(searchTerm) > -1);
  },

  compare(x, y) {
    function cook(d) {
      if (typeof d === 'undefined' || d === null) return '';
      return d.toLowerCase();
    }
    x = cook(x);
    y = cook(y);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  },
};
