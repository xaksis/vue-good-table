/**
 * vue-good-table v1.20.0
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var each = _interopDefault(require('lodash.foreach'));
var diacriticless = _interopDefault(require('diacriticless'));
var esm = require('date-fns/esm');
var clone = _interopDefault(require('lodash.clone'));

var VueGoodPagination = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vgt-table-footer vgt-clearfix" }, [_c('div', { staticClass: "datatable-length vgt-pull-left" }, [_c('label', [_c('span', [_vm._v(_vm._s(_vm.rowsPerPageText))]), _vm._v(" "), _c('select', { staticClass: "browser-default", on: { "change": _vm.perPageChanged } }, [_vm._l(_vm.getRowsPerPageDropdown(), function (option) {
      return _c('option', { key: 'rows-dropdown-option-' + option, domProps: { "selected": _vm.perPage && _vm.currentPerPage === option || _vm.currentPerPage === option, "value": option } }, [_vm._v(" " + _vm._s(option) + " ")]);
    }), _vm._v(" "), _c('option', { attrs: { "value": "-1" } }, [_vm._v(_vm._s(_vm.allText))])], 2)])]), _vm._v(" "), _c('div', { staticClass: "pagination-controls pull-right" }, [_c('a', { staticClass: "page-btn", class: { disabled: !_vm.prevIsPossible }, attrs: { "href": "javascript:undefined", "tabindex": "0" }, on: { "click": function ($event) {
          $event.preventDefault();$event.stopPropagation();_vm.previousPage($event);
        } } }, [_c('span', { staticClass: "chevron", class: { 'left': !_vm.rtl, 'right': _vm.rtl } }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.prevText))])]), _vm._v(" "), _c('div', { staticClass: "info" }, [_vm._v(_vm._s(_vm.paginatedInfo))]), _vm._v(" "), _c('a', { staticClass: "page-btn", class: { disabled: !_vm.nextIsPossible }, attrs: { "href": "javascript:undefined", "tabindex": "0" }, on: { "click": function ($event) {
          $event.preventDefault();$event.stopPropagation();_vm.nextPage($event);
        } } }, [_c('span', [_vm._v(_vm._s(_vm.nextText))]), _vm._v(" "), _c('span', { staticClass: "chevron", class: { 'right': !_vm.rtl, 'left': _vm.rtl } })])])]);
  }, staticRenderFns: [], _scopeId: 'data-v-849a166c',
  name: 'vue-good-pagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    customRowsPerPageDropdown: { default: function () {
        return [];
      } },

    // text options
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    allText: { default: 'All' }
  },

  data: function () { return ({
    currentPage: 1,
    currentPerPage: 10,
    rowsPerPageOptions: [],
    defaultRowsPerPageDropdown: [10, 20, 30, 40, 50]
  }); },

  watch: {
    perPage: function perPage() {
      if (this.perPage) {
        this.currentPerPage = this.perPage;
      } else {
        //reset to default
        this.currentPerPage = 10;
      }
      this.perPageChanged();
    },

    customRowsPerPageDropdown: function customRowsPerPageDropdown() {
      if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.lenght !== 0) { this.rowsPerPageOptions = this.customRowsPerPageDropdown; }
    }

  },

  computed: {
    paginatedInfo: function paginatedInfo() {
      if (this.currentPerPage === -1) {
        return ("1 - " + (this.total) + " " + (this.ofText) + " " + (this.total));
      }
      var first = (this.currentPage - 1) * this.currentPerPage ? (this.currentPage - 1) * this.currentPerPage : 1;

      if (first > this.total) {
        // this probably happened as a result of filtering 
        this.currentPage = 1;
        first = 1;
      }

      var last = Math.min(this.total, this.currentPerPage * this.currentPage);
      return (first + " - " + last + " " + (this.ofText) + " " + (this.total));
    },
    nextIsPossible: function nextIsPossible() {
      return this.total > this.currentPerPage * this.currentPage;
    },
    prevIsPossible: function prevIsPossible() {
      return this.currentPage > 1;
    }
  },

  methods: {

    reset: function reset() {},

    nextPage: function nextPage() {
      if (this.currentPerPage === -1) { return; }
      if (this.nextIsPossible) { ++this.currentPage; }
      this.pageChanged();
    },

    previousPage: function previousPage() {
      if (this.currentPage > 1) { --this.currentPage; }
      this.pageChanged();
    },

    pageChanged: function pageChanged() {
      this.$emit('page-changed', { currentPage: this.currentPage });
    },

    perPageChanged: function perPageChanged(event) {
      if (event) {
        this.currentPerPage = parseInt(event.target.value);
      }
      this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
    },

    getRowsPerPageDropdown: function getRowsPerPageDropdown() {
      return this.rowsPerPageOptions;
    }

  },

  mounted: function mounted() {
    this.rowsPerPageOptions = this.defaultRowsPerPageDropdown;

    if (this.perPage) {
      this.currentPerPage = this.perPage;
      this.rowsPerPageOptions.push(this.perPage);
    }

    if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0) { this.rowsPerPageOptions = this.customRowsPerPageDropdown; }
  }
};

var defaultType = {
  format: function defaultFormat(x) {
    return x;
  },
  filterPredicate: function defaultFilter(rowval, filter) {
    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    }

    // row value
    var rowValue = diacriticless(String(rowval).toLowerCase());

    // search term
    var searchTerm = diacriticless(filter.toLowerCase());

    // comparison
    return rowValue.search(searchTerm) > -1;
  },

  compare: function compare(x, y) {
    function cook(d) {
      if (typeof d === 'undefined' || d === null) { return ''; }
      return d.toLowerCase();
    }
    x = cook(x);
    y = cook(y);
    return x < y ? -1 : x > y ? 1 : 0;
  }
};

var date = clone(defaultType);

date.isRight = true;

date.compare = function compare(x, y, column) {
  function cook(d) {
    if (column && column.inputFormat) {
      return esm.parse(("" + d), ("" + (column.inputFormat)), new Date());
    }
    return d;
  }
  x = cook(x);
  y = cook(y);
  if (!esm.isValid(x)) {
    return -1;
  }
  if (!esm.isValid(y)) {
    return 1;
  }
  return esm.compareAsc(x, y);
};

date.format = function formatDate(v, column) {
  // convert to date
  var date = esm.parse(v, column.inputFormat, new Date());
  return esm.format(date, column.outputFormat);
};



var date$2 = Object.freeze({
	default: date
});

var number = clone(defaultType);

number.isRight = true;

number.filterPredicate = function defaultFilter(rowval, filter) {
  return number.compare(rowval, filter) === 0;
};

number.compare = function compareNumbers(x, y) {
  function cook(d) {
    // if d is null or undefined we give it the smallest 
    // possible value
    if (d === undefined || d === null) { return -Infinity; }
    return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d);
  }

  x = typeof x === 'number' ? x : cook(x);
  y = typeof y === 'number' ? y : cook(y);
  return x < y ? -1 : x > y ? 1 : 0;
};



var number$2 = Object.freeze({
	default: number
});

var decimal = clone(number);
decimal.format = function formatDecimal(v) {
  return parseFloat(Math.round(v * 100) / 100).toFixed(2);
};



var decimal$2 = Object.freeze({
	default: decimal
});

var percentage = clone(number);

percentage.format = function formatPercent(v) {
  return ((parseFloat(v * 100).toFixed(2)) + "%");
};



var percentage$2 = Object.freeze({
	default: percentage
});

var index = {
  date: date$2,
  decimal: decimal$2,
  number: number$2,
  percentage: percentage$2
};

// here we load each data type module.
var dataTypes = {};
var coreDataTypes = index;
each(Object.keys(coreDataTypes), function (key) {
  var compName = key.replace(/^\.\//, "").replace(/\.js/, "");
  dataTypes[compName] = coreDataTypes[key].default;
});

var GoodTable = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "good-table", class: { 'rtl': _vm.rtl } }, [_vm.title || _vm.$slots['table-actions'] ? _c('div', { staticClass: "table-header vgt-clearfix" }, [_c('h2', { staticClass: "table-title vgt-pull-left" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', { staticClass: "actions vgt-pull-right" }, [_vm._t("table-actions")], 2)]) : _vm._e(), _vm._v(" "), _vm.paginate && _vm.paginateOnTop ? _c('vue-good-pagination', { attrs: { "perPage": _vm.perPage, "rtl": _vm.rtl, "total": _vm.processedRows.length, "nextText": _vm.nextText, "prevText": _vm.prevText, "rowsPerPageText": _vm.rowsPerPageText, "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown, "ofText": _vm.ofText, "allText": _vm.allText }, on: { "page-changed": _vm.pageChanged, "per-page-changed": _vm.perPageChanged } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "vgt-global-search" }, [_c('div', { staticClass: "vgt-global-search__actions" }, [_vm._t("table-actions")], 2)]), _vm._v(" "), _c('div', { class: { 'responsive': _vm.responsive } }, [_c('table', { ref: "table", class: _vm.tableStyleClasses }, [_c('thead', [_vm.globalSearch && _vm.externalSearchQuery == null ? _c('tr', [_c('td', { attrs: { "colspan": _vm.lineNumbers ? _vm.columns.length + 1 : _vm.columns.length } }, [_c('div', { staticClass: "global-search" }, [_vm._m(0), _vm._v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.globalSearchTerm, expression: "globalSearchTerm" }], staticClass: "vgt-input", attrs: { "type": "text", "placeholder": _vm.globalSearchPlaceholder }, domProps: { "value": _vm.globalSearchTerm }, on: { "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.searchTable();
        }, "input": function ($event) {
          if ($event.target.composing) {
            return;
          }_vm.globalSearchTerm = $event.target.value;
        } } })])])]) : _vm._e(), _vm._v(" "), _c('tr', [_vm.lineNumbers ? _c('th', { staticClass: "line-numbers" }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index$$1) {
      return !column.hidden ? _c('th', { key: index$$1, class: _vm.getHeaderClasses(column, index$$1), style: { width: column.width ? column.width : 'auto' }, on: { "click": function ($event) {
            _vm.sort(index$$1);
          } } }, [_vm._t("table-column", [_c('span', [_vm._v(_vm._s(column.label))])], { column: column })], 2) : _vm._e();
    }), _vm._v(" "), _vm._t("thead-tr")], 2), _vm._v(" "), _vm.hasFilterRow ? _c('tr', [_vm.lineNumbers ? _c('th') : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index$$1) {
      return !column.hidden ? _c('th', { key: index$$1 }, [column.filterable ? _c('div', { class: _vm.getHeaderClasses(column, index$$1) }, [!column.filterDropdown ? _c('input', { staticClass: "vgt-input", attrs: { "type": "text", "placeholder": _vm.getPlaceholder(column) }, domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }) : _vm._e(), _vm._v(" "), column.filterDropdown && typeof column.filterOptions[0] !== 'object' ? _c('select', { staticClass: "vgt-select", domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }, [_c('option', { key: "-1", attrs: { "value": "" } }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions, function (option, i) {
        return _c('option', { key: i, domProps: { "value": option } }, [_vm._v(" " + _vm._s(option) + " ")]);
      })], 2) : _vm._e(), _vm._v(" "), column.filterDropdown && typeof column.filterOptions[0] === 'object' ? _c('select', { staticClass: "vgt-select", domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }, [_c('option', { key: "-1", attrs: { "value": "" } }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions, function (option, i) {
        return _c('option', { key: i, domProps: { "value": option.value } }, [_vm._v(_vm._s(option.text))]);
      })], 2) : _vm._e()]) : _vm._e()]) : _vm._e();
    })], 2) : _vm._e()]), _vm._v(" "), _c('tbody', [_vm._l(_vm.paginated, function (row, index$$1) {
      return _c('tr', { key: index$$1, class: _vm.getRowStyleClass(row), on: { "click": function ($event) {
            _vm.click(row, index$$1);
          } } }, [_vm.lineNumbers ? _c('th', { staticClass: "line-numbers" }, [_vm._v(_vm._s(_vm.getCurrentIndex(index$$1)))]) : _vm._e(), _vm._v(" "), _vm._t("table-row-before", null, { row: row, index: index$$1 }), _vm._v(" "), _vm._t("table-row", _vm._l(_vm.columns, function (column, i) {
        return !column.hidden && column.field ? _c('td', { key: i, class: _vm.getClasses(i, 'td') }, [!column.html ? _c('span', [_vm._v(_vm._s(_vm.collectFormatted(row, column)))]) : _vm._e(), _vm._v(" "), column.html ? _c('span', { domProps: { "innerHTML": _vm._s(_vm.collect(row, column.field)) } }) : _vm._e()]) : _vm._e();
      }), { row: row, formattedRow: _vm.formattedRow(row), index: index$$1 }), _vm._v(" "), _vm._t("table-row-after", null, { row: row, index: index$$1 })], 2);
    }), _vm._v(" "), _vm.processedRows.length === 0 ? _c('tr', [_c('td', { attrs: { "colspan": _vm.columns.length } }, [_vm._t("emptystate", [_c('div', { staticClass: "vgt-center-align text-disabled" }, [_vm._v(" No data for table. ")])])], 2)]) : _vm._e()], 2)])]), _vm._v(" "), _vm.paginate && !_vm.paginateOnTop ? _c('vue-good-pagination', { attrs: { "perPage": _vm.perPage, "rtl": _vm.rtl, "total": _vm.processedRows.length, "nextText": _vm.nextText, "prevText": _vm.prevText, "rowsPerPageText": _vm.rowsPerPageText, "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown, "ofText": _vm.ofText, "allText": _vm.allText }, on: { "page-changed": _vm.pageChanged, "per-page-changed": _vm.perPageChanged } }) : _vm._e()], 1);
  }, staticRenderFns: [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "global-search-icon" }, [_c('div', { staticClass: "magnifying-glass" })]);
  }],
  name: 'vue-good-table',
  components: {
    VueGoodPagination: VueGoodPagination
  },
  props: {
    customRowsPerPageDropdown: { default: function () {
        return [];
      } },
    styleClass: { default: 'vgt-table bordered' },
    title: '',
    columns: {},
    rows: {},
    onClick: {},
    perPage: {},
    sortable: { default: true },
    paginate: { default: false },
    paginateOnTop: { default: false },
    lineNumbers: { default: false },
    defaultSortBy: { default: null },
    responsive: { default: true },
    rtl: { default: false },
    rowStyleClass: { default: null, type: [Function, String] },

    // search
    globalSearch: { default: false },
    searchTrigger: { default: null },
    externalSearchQuery: { default: null },
    globalSearchFn: { type: Function, default: null },

    // text options
    globalSearchPlaceholder: { default: 'Search Table' },
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    allText: { default: 'All' }
  },

  data: function () { return ({
    currentPage: 1,
    currentPerPage: 10,
    sortColumn: -1,
    sortType: 'asc',
    globalSearchTerm: '',
    columnFilters: {},
    filteredRows: [],
    timer: null,
    forceSearch: false,
    sortChanged: false,
    dataTypes: dataTypes || {}
  }); },

  methods: {
    pageChangedEvent: function pageChangedEvent() {
      return {
        currentPage: this.currentPage,
        currentPerPage: this.currentPerPage,
        total: Math.floor(this.rows.length / this.currentPerPage)
      };
    },

    pageChanged: function pageChanged(pagination) {
      this.currentPage = pagination.currentPage;
      var pageChangedEvent = this.pageChangedEvent();
      this.$emit('pageChanged', pageChangedEvent);
    },

    perPageChanged: function perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
      var perPageChangedEvent = this.pageChangedEvent();
      this.$emit('perPageChanged', perPageChangedEvent);
    },

    sort: function sort(index$$1) {
      if (!this.isSortableColumn(index$$1)) { return; }
      if (this.sortColumn === index$$1) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = 'asc';
        this.sortColumn = index$$1;
      }
      this.sortChanged = true;
    },

    click: function click(row, index$$1) {
      if (this.onClick) { this.onClick(row, index$$1); }
    },

    searchTable: function searchTable() {
      if (this.searchTrigger == 'enter') {
        this.forceSearch = true;
        this.sortChanged = true;
      }
    },

    // field can be:
    // 1. function
    // 2. regular property - ex: 'prop'
    // 3. nested property path - ex: 'nested.prop'
    collect: function collect(obj, field) {

      //utility function to get nested property
      function dig(obj, selector) {
        var result = obj;
        var splitter = selector.split('.');
        for (var i = 0; i < splitter.length; i++) { if (typeof result === 'undefined') { return undefined; }else { result = result[splitter[i]]; } }
        return result;
      }

      if (typeof field === 'function') { return field(obj); }else if (typeof field === 'string') { return dig(obj, field); }else { return undefined; }
    },

    collectFormatted: function collectFormatted(obj, column) {
      var value = this.collect(obj, column.field);
      if (value === undefined) { return ''; }

      // if user has supplied custom formatter, 
      // use that here
      if (column.formatFn && typeof column.formatFn === 'function') {
        return column.formatFn(value);
      }

      //lets format the resultant data
      var type = column.typeDef;
      return type.format(value, column);
    },

    formattedRow: function formattedRow(row) {
      var this$1 = this;

      var formattedRow = {};
      for (var col of this$1.typedColumns) {
        if (col.field) {
          formattedRow[col.field] = this$1.collectFormatted(row, col);
        }
      }
      return formattedRow;
    },

    //Check if a column is sortable.
    isSortableColumn: function isSortableColumn(index$$1) {
      var sortable = this.columns[index$$1].sortable;
      var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },

    //Get classes for the given header column.
    getHeaderClasses: function getHeaderClasses(column, index$$1) {
      var isSortable = this.isSortableColumn(index$$1);
      var classes = Object.assign({}, this.getClasses(index$$1, 'th'), {
        'sorting': isSortable,
        'sorting-desc': isSortable && this.sortColumn === index$$1 && this.sortType === 'desc',
        'sorting-asc': isSortable && this.sortColumn === index$$1 && this.sortType === 'asc'
      });
      return classes;
    },

    //Get classes for the given column index & element.
    getClasses: function getClasses(index$$1, element) {
      var ref = this.typedColumns[index$$1];
      var typeDef = ref.typeDef;
      var custom = ref[element + 'Class'];
      var isRight = typeDef.isRight;
      if (this.rtl) { isRight = true; }
      var classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight
      };
      classes[custom] = !!custom;
      return classes;
    },

    //since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters: function updateFilters(column, value) {
      var _this = this;
      if (this.timer) { clearTimeout(this.timer); }
      this.timer = setTimeout(function () {
        _this.$set(_this.columnFilters, column.field, value);
      }, 400);
    },

    //method to filter rows
    filterRows: function filterRows() {
      var this$1 = this;

      var computedRows = this.originalRows;

      if (this.hasFilterRow) {
        for (var col of this$1.typedColumns) {
          if (col.filterable && this$1.columnFilters[col.field]) {
            computedRows = computedRows.filter(function (row) {

              // If column has a custom filter, use that.
              if (col.filter) {
                return col.filter(this$1.collect(row, col.field), this$1.columnFilters[col.field]);
              } else {

                // Use default filters
                var typeDef = col.typeDef;
                return typeDef.filterPredicate(this$1.collect(row, col.field), this$1.columnFilters[col.field]);
              }
            });
          }
        }
      }
      this.filteredRows = computedRows;
    },

    //get column's defined placeholder or default one
    getPlaceholder: function getPlaceholder(column) {
      var placeholder = column.placeholder || 'Filter ' + column.label;
      return placeholder;
    },

    getCurrentIndex: function getCurrentIndex(index$$1) {
      return (this.currentPage - 1) * this.currentPerPage + index$$1 + 1;
    },

    getRowStyleClass: function getRowStyleClass(row) {
      var classes = '';
      this.onClick ? classes += 'clickable' : '';
      var rowStyleClasses;
      if (typeof this.rowStyleClass === 'function') {
        rowStyleClasses = this.rowStyleClass(row);
      } else {
        rowStyleClasses = this.rowStyleClass;
      }
      if (rowStyleClasses) {
        classes += ' ' + rowStyleClasses;
      }
      return classes;
    },

    populateInitialFilters: function populateInitialFilters() {
      var this$1 = this;

      for (var col of this$1.columns) {
        // lets see if there are initial 
        // filters supplied by user
        if (typeof col.filterValue !== 'undefined' && col.filterValue !== null) {
          this$1.updateFilters(col, col.filterValue);
          this$1.$set(col, 'filterValue', undefined);
        }
      }
    }
  },

  watch: {
    columnFilters: {
      handler: function () {
        this.filterRows();
      },
      deep: true
    },
    rows: {
      handler: function () {
        this.filterRows();
      },
      deep: true
    },
    columns: {
      handler: function () {
        this.populateInitialFilters();
      },
      deep: true
    }
  },

  computed: {
    tableStyleClasses: function tableStyleClasses() {
      var classes = this.styleClass;
      classes += this.responsive ? ' responsive' : '';
      return classes;
    },

    searchTerm: function searchTerm() {
      return this.externalSearchQuery != null ? this.externalSearchQuery : this.globalSearchTerm;
    },

    //
    globalSearchAllowed: function globalSearchAllowed() {
      if (this.globalSearch && !!this.globalSearchTerm && this.searchTrigger != 'enter') {
        return true;
      }

      if (this.externalSearchQuery != null && this.searchTrigger != 'enter') {
        return true;
      }

      if (this.forceSearch) {
        this.forceSearch = false;
        return true;
      }

      return false;
    },

    // to create a filter row, we need to
    // make sure that there is atleast 1 column
    // that requires filtering
    hasFilterRow: function hasFilterRow() {
      var this$1 = this;

      if (!this.globalSearch) {
        for (var col of this$1.columns) {
          if (col.filterable) {
            return true;
          }
        }
      }
      return false;
    },

    // this is done everytime sortColumn
    // or sort type changes
    //----------------------------------------
    processedRows: function processedRows() {
      var this$1 = this;

      var computedRows = this.filteredRows;

      // take care of the global filter here also
      if (this.globalSearchAllowed) {
        var filteredRows = [];
        for (var row of this$1.originalRows) {
          for (var col of this$1.columns) {

            //if col has search disabled,
            //skip the column.
            if (col.globalSearchDisabled) {
              continue;
            }

            // if a search function is provided,
            // use that for searching, otherwise,
            // use the default search behavior
            if (this$1.globalSearchFn) {
              var foundMatch = this$1.globalSearchFn(row, col, this$1.collectFormatted(row, col), this$1.searchTerm);
              if (foundMatch) {
                filteredRows.push(row);
                break;
              }
            } else {
              // lets get the formatted row/col value
              var tableValue = this$1.collectFormatted(row, col);
              if (typeof tableValue !== 'undefined' && tableValue !== null) {
                // table value
                tableValue = diacriticless(String(tableValue).toLowerCase());

                // search term
                var searchTerm = diacriticless(this$1.searchTerm.toLowerCase());

                // comparison
                if (tableValue.search(searchTerm) > -1) {
                  filteredRows.push(row);
                  break;
                }
              }
            }
          }
        }
        computedRows = filteredRows;
      }

      //taking care of sort here only if sort has changed
      if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) && (

      // if search trigger is enter then we only sort
      // when enter is hit
      this.searchTrigger !== 'enter' || this.sortChanged)) {

        this.sortChanged = false;

        computedRows = computedRows.sort(function (x, y) {
          if (!this$1.columns[this$1.sortColumn]) { return 0; }

          var xvalue = this$1.collect(x, this$1.columns[this$1.sortColumn].field);
          var yvalue = this$1.collect(y, this$1.columns[this$1.sortColumn].field);

          // if user has provided a custom sort, use that instead of
          // built-in sort
          var sortFn = this$1.columns[this$1.sortColumn].sortFn;
          if (sortFn && typeof sortFn === 'function') {
            return sortFn(xvalue, yvalue, this$1.columns[this$1.sortColumn]) * (this$1.sortType === 'desc' ? -1 : 1);
          }

          // built in sort
          var typeDef = this$1.typedColumns[this$1.sortColumn].typeDef;
          return typeDef.compare(xvalue, yvalue, this$1.columns[this$1.sortColumn]) * (this$1.sortType === 'desc' ? -1 : 1);
        });
      }

      // if the filtering is event based, we need to maintain filter
      // rows
      if (this.searchTrigger === 'enter') {
        this.filteredRows = computedRows;
      }

      return computedRows;
    },

    paginated: function paginated() {
      var paginatedRows = this.processedRows;

      if (this.paginate) {
        var pageStart = (this.currentPage - 1) * this.currentPerPage;

        // in case of filtering we might be on a page that is
        // not relevant anymore
        // also, if setting to all, current page will not be valid
        if (pageStart >= this.processedRows.length || this.currentPerPage === -1) {
          this.currentPage = 1;
          pageStart = 0;
        }

        //calculate page end now
        var pageEnd = paginatedRows.length + 1;

        //if the setting is set to 'all'
        if (this.currentPerPage !== -1) {
          pageEnd = this.currentPage * this.currentPerPage;
        }

        paginatedRows = paginatedRows.slice(pageStart, pageEnd);
      }
      return paginatedRows;
    },

    originalRows: function originalRows() {
      var rows = JSON.parse(JSON.stringify(this.rows));

      // we need to preserve the original index of rows so lets do that
      for (var index$$1 = 0; index$$1 < rows.length; index$$1++) {
        rows[index$$1].originalIndex = index$$1;
      }

      return rows;
    },

    typedColumns: function typedColumns() {
      var this$1 = this;

      var columns = Object.assign(this.columns, []);
      for (var column of columns) {
        column.typeDef = this$1.dataTypes[column.type] || defaultType;
      }
      return columns;
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.filteredRows = this.originalRows;

    // take care of initial filters
    this.populateInitialFilters();

    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }

    //take care of default sort on mount
    if (this.defaultSortBy) {
      for (var index$$1 = 0; index$$1 < this.columns.length; index$$1++) {
        var col = this$1.columns[index$$1];
        if (col.field === this$1.defaultSortBy.field) {
          this$1.sortColumn = index$$1;
          this$1.sortType = this$1.defaultSortBy.type || 'asc';
          this$1.sortChanged = true;
          break;
        }
      }
    }
  }
};

var GoodTablePlugin = {
  install: function (Vue, options) {
    Vue.component(GoodTable.name, GoodTable);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GoodTablePlugin);
}

exports['default'] = GoodTablePlugin;
exports.VueGoodTable = GoodTable;
