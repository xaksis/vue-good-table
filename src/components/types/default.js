import diacriticless from 'diacriticless'
export default {
  format: function defaultFormat(x) {
    return x;
  },
  filterPredicate: function defaultFilter(rowval, filter) {
    // take care of nulls
    if(typeof(rowval) === 'undefined' || rowval === null) {
      return false;
    }
    
    // row value
    const rowValue = diacriticless(String(rowval).toLowerCase());

    // search term
    const searchTerm = diacriticless((filter).toLowerCase());

    // comparison
    return (rowValue.search(searchTerm) > -1);
  },

  compare: function compare (x, y) {
    function cook (d) {
      if(typeof(d) === 'undefined' || d === null) return '';
      return d.toLowerCase()
    }
    x = cook(x);
    y = cook(y);
    return (x < y ? -1 : (x > y ? 1 : 0));
  },
};
