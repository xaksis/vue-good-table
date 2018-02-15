export default {
  format: function defaultFormat (x) {
    return x
  },
  filterPredicate: function defaultFilter (rowval, filter) {
    var v = rowval
      .toLowerCase()
      .startsWith(
        (filter).toLowerCase()
      )
    return v
  },
  compare: function compare (x, y) {
    function cook (d) {
      if (!d) return '';
      return d.toLowerCase()
    }
    x = cook(x)
    y = cook(y)
    return (x < y ? -1 : (x > y ? 1 : 0))
  }
}
