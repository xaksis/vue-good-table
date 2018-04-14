/**
 * vue-good-table v2.3.0
 * (c) 2018-present xaksis <shay@crayonbits.com>
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

import each from 'lodash.foreach';
import assign from 'lodash.assign';
import cloneDeep from 'lodash.clonedeep';
import filter from 'lodash.filter';
import diacriticless from 'diacriticless';
import { compareAsc, format, isValid, parse } from 'date-fns';
import clone from 'lodash.clone';

var defaultType = {
  format: function format$$1(x) {
    return x;
  },
  filterPredicate: function filterPredicate(rowval, filter$$1) {
    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    }

    // row value
    var rowValue = diacriticless(String(rowval).toLowerCase());

    // search term
    var searchTerm = diacriticless(filter$$1.toLowerCase());

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
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  }
};

var VueGoodPagination = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vgt-wrap__footer vgt-clearfix" }, [_c('div', { staticClass: "footer__row-count vgt-pull-left" }, [_c('span', { staticClass: "footer__row-count__label" }, [_vm._v(_vm._s(_vm.rowsPerPageText))]), _vm._v(" "), _c('select', { directives: [{ name: "model", rawName: "v-model", value: _vm.currentPerPage, expression: "currentPerPage" }], staticClass: "footer__row-count__select", attrs: { "autocomplete": "off", "name": "perPageSelect" }, on: { "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;return val;
          });_vm.currentPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }, _vm.perPageChanged] } }, [_vm._l(_vm.getRowsPerPageDropdown(), function (option, idx) {
      return _c('option', { key: 'rows-dropdown-option-' + idx, domProps: { "value": option } }, [_vm._v(" " + _vm._s(option) + " ")]);
    }), _vm._v(" "), _vm.paginateDropdownAllowAll ? _c('option', { attrs: { "value": "-1" } }, [_vm._v(_vm._s(_vm.allText))]) : _vm._e()], 2)]), _vm._v(" "), _c('div', { staticClass: "footer__navigation vgt-pull-right" }, [_c('a', { staticClass: "footer__navigation__page-btn", class: { disabled: !_vm.prevIsPossible }, attrs: { "href": "javascript:undefined", "tabindex": "0" }, on: { "click": function ($event) {
          $event.preventDefault();$event.stopPropagation();return _vm.previousPage($event);
        } } }, [_c('span', { staticClass: "chevron", class: { 'left': !_vm.rtl, 'right': _vm.rtl } }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.prevText))])]), _vm._v(" "), _c('div', { staticClass: "footer__navigation__info" }, [_vm._v(_vm._s(_vm.paginatedInfo))]), _vm._v(" "), _c('a', { staticClass: "footer__navigation__page-btn", class: { disabled: !_vm.nextIsPossible }, attrs: { "href": "javascript:undefined", "tabindex": "0" }, on: { "click": function ($event) {
          $event.preventDefault();$event.stopPropagation();return _vm.nextPage($event);
        } } }, [_c('span', [_vm._v(_vm._s(_vm.nextText))]), _vm._v(" "), _c('span', { staticClass: "chevron", class: { 'right': !_vm.rtl, 'left': _vm.rtl } })])])]);
  }, staticRenderFns: [],
  name: 'vue-good-pagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    customRowsPerPageDropdown: { default: function default$1$$1() {
        return [];
      } },
    paginateDropdownAllowAll: { default: true },

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
      this.handlePerPage();
      this.perPageChanged();
    },

    customRowsPerPageDropdown: function customRowsPerPageDropdown() {
      if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.lenght !== 0) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      }
    }

  },

  computed: {
    paginatedInfo: function paginatedInfo() {
      if (this.currentPerPage === -1) {
        return ("1 - " + (this.total) + " " + (this.ofText) + " " + (this.total));
      }
      var first = (this.currentPage - 1) * this.currentPerPage + 1 ? (this.currentPage - 1) * this.currentPerPage + 1 : 1;

      if (first > this.total) {
        // this probably happened as a result of filtering
        first = 1;
        this.currentPage = 1;
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
    // optionSelected(option) {
    //   return this.currentPerPage === option;
    // },

    reset: function reset() {},

    nextPage: function nextPage() {
      if (this.currentPerPage === -1) { return; }
      if (this.nextIsPossible) {
        ++this.currentPage;
        this.pageChanged();
      }
    },

    previousPage: function previousPage() {
      if (this.currentPage > 1) {
        --this.currentPage;
        this.pageChanged();
      }
    },

    pageChanged: function pageChanged() {
      this.$emit('page-changed', { currentPage: this.currentPage });
    },

    perPageChanged: function perPageChanged(event) {
      if (event) {
        this.currentPerPage = parseInt(event.target.value, 10);
      }
      this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
    },

    getRowsPerPageDropdown: function getRowsPerPageDropdown() {
      return this.rowsPerPageOptions;
    },

    handlePerPage: function handlePerPage() {
      var this$1 = this;

      this.rowsPerPageOptions = cloneDeep(this.defaultRowsPerPageDropdown);
      if (this.perPage) {
        this.currentPerPage = this.perPage;
        // if perPage doesn't already exist, we add it
        var found = false;
        for (var i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this$1.rowsPerPageOptions[i] === this$1.perPage) {
            found = true;
          }
        }
        if (!found) { this.rowsPerPageOptions.push(this.perPage); }
      } else {
        // reset to default
        this.currentPerPage = 10;
      }

      if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      }
    }
  },

  mounted: function mounted() {
    this.handlePerPage();
  }
};

var VgtGlobalSearch = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.showControlBar ? _c('div', { staticClass: "vgt-global-search vgt-clearfix" }, [_c('div', { staticClass: "vgt-global-search__input vgt-pull-left" }, [_vm.searchEnabled ? _c('span', { staticClass: "input__icon" }, [_c('div', { staticClass: "magnifying-glass" })]) : _vm._e(), _vm._v(" "), _vm.searchEnabled ? _c('input', { staticClass: "vgt-input vgt-pull-left", attrs: { "type": "text", "placeholder": _vm.globalSearchPlaceholder }, domProps: { "value": _vm.value }, on: { "input": function ($event) {
          _vm.updateValue($event.target.value);
        }, "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }_vm.entered($event.target.value);
        } } }) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "vgt-global-search__actions vgt-pull-right" }, [_vm._t("internal-table-actions")], 2)]) : _vm._e();
  }, staticRenderFns: [],
  name: 'VgtGlobalSearch',
  props: ['value', 'searchEnabled', 'globalSearchPlaceholder'],
  data: function data() {
    return {
      globalSearchTerm: null
    };
  },
  computed: {
    showControlBar: function showControlBar() {
      if (this.searchEnabled) { return true; }
      if (this.$slots && this.$slots['internal-table-actions']) { return true; }
      return false;
    }
  },
  methods: {
    updateValue: function updateValue(value) {
      this.$emit('input', value);
      this.$emit('on-keyup', value);
    },
    entered: function entered(value) {
      this.$emit('on-enter', value);
    }
  }
};

var VgtFilterRow = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.hasFilterRow ? _c('tr', [_vm.lineNumbers ? _c('th') : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th') : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
      return !column.hidden ? _c('th', { key: index, staticClass: "filter-th" }, [_vm.isFilterable(column) ? _c('div', [!_vm.isDropdown(column) ? _c('input', { staticClass: "vgt-input", attrs: { "type": "text", "placeholder": _vm.getPlaceholder(column) }, domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }) : _vm._e(), _vm._v(" "), _vm.isDropdownArray(column) ? _c('select', { staticClass: "vgt-select", domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }, [_c('option', { key: "-1", attrs: { "value": "" } }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', { key: i, domProps: { "value": option } }, [_vm._v(" " + _vm._s(option) + " ")]);
      })], 2) : _vm._e(), _vm._v(" "), _vm.isDropdownObjects(column) ? _c('select', { staticClass: "vgt-select", domProps: { "value": _vm.columnFilters[column.field] }, on: { "input": function ($event) {
            _vm.updateFilters(column, $event.target.value);
          } } }, [_c('option', { key: "-1", attrs: { "value": "" } }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', { key: i, domProps: { "value": option.value } }, [_vm._v(_vm._s(option.text))]);
      })], 2) : _vm._e()]) : _vm._e()]) : _vm._e();
    })], 2) : _vm._e();
  }, staticRenderFns: [], _scopeId: 'data-v-2949d74f',
  name: 'VgtFilterRow',
  props: ['lineNumbers', 'columns', 'typedColumns', 'globalSearchEnabled', 'selectable'],
  watch: {
    columns: {
      handler: function handler() {
        this.populateInitialFilters();
      },
      deep: true
    }
  },
  data: function data() {
    return {
      columnFilters: {},
      timer: null
    };
  },
  computed: {
    // to create a filter row, we need to
    // make sure that there is atleast 1 column
    // that requires filtering
    hasFilterRow: function hasFilterRow() {
      var this$1 = this;

      if (!this.globalSearchEnabled) {
        for (var i = 0; i < this.columns.length; i++) {
          var col = this$1.columns[i];
          if (col.filterOptions && col.filterOptions.enabled) {
            return true;
          }
        }
      }
      return false;
    }
  },
  methods: {
    isFilterable: function isFilterable(column) {
      return column.filterOptions && column.filterOptions.enabled;
    },

    isDropdown: function isDropdown(column) {
      return this.isFilterable(column) && column.filterOptions.filterDropdownItems && column.filterOptions.filterDropdownItems.length;
    },

    isDropdownObjects: function isDropdownObjects(column) {
      return this.isDropdown(column) && typeof column.filterOptions.filterDropdownItems[0] === 'object';
    },

    isDropdownArray: function isDropdownArray(column) {
      return this.isDropdown(column) && typeof column.filterOptions.filterDropdownItems[0] !== 'object';
    },

    // get column's defined placeholder or default one
    getPlaceholder: function getPlaceholder(column) {
      var placeholder = this.isFilterable(column) && column.filterOptions.placeholder || ("Filter " + (column.label));
      return placeholder;
    },

    // since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters: function updateFilters(column, value) {
      var this$1 = this;

      if (this.timer) { clearTimeout(this.timer); }
      this.timer = setTimeout(function () {
        this$1.updateFiltersImmediately(column, value);
      }, 400);
    },

    updateFiltersImmediately: function updateFiltersImmediately(column, value) {
      this.$set(this.columnFilters, column.field, value);
      this.$emit('filter-changed', this.columnFilters);
    },

    populateInitialFilters: function populateInitialFilters() {
      var this$1 = this;

      for (var i = 0; i < this.columns.length; i++) {
        var col = this$1.columns[i];
        // lets see if there are initial
        // filters supplied by user
        if (this$1.isFilterable(col) && typeof col.filterOptions.filterValue !== 'undefined' && col.filterOptions.filterValue !== null) {
          this$1.updateFiltersImmediately(col, col.filterOptions.filterValue);
          this$1.$set(col.filterOptions, 'filterValue', undefined);
        }
      }
    }
  },
  mounted: function mounted() {
    // take care of initial filters
    this.populateInitialFilters();
  }
};

var date = clone(defaultType);

date.isRight = true;

date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return parse(("" + d), ("" + (column.dateInputFormat)), new Date());
    }
    return d;
  }
  x = cook(x);
  y = cook(y);
  if (!isValid(x)) {
    return -1;
  }
  if (!isValid(y)) {
    return 1;
  }
  return compareAsc(x, y);
};

date.format = function (v, column) {
  // convert to date
  var date = parse(v, column.dateInputFormat, new Date());
  return format(date, column.dateOutputFormat);
};



var date$2 = Object.freeze({
	default: date
});

var number = clone(defaultType);

number.isRight = true;

number.filterPredicate = function (rowval, filter$$1) {
  return number.compare(rowval, filter$$1) === 0;
};

number.compare = function (x, y) {
  function cook(d) {
    // if d is null or undefined we give it the smallest
    // possible value
    if (d === undefined || d === null) { return -Infinity; }
    return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d, 10);
  }

  x = typeof x === 'number' ? x : cook(x);
  y = typeof y === 'number' ? y : cook(y);
  if (x < y) { return -1; }
  if (x > y) { return 1; }
  return 0;
};



var number$2 = Object.freeze({
	default: number
});

var decimal = clone(number);
decimal.format = function (v) {
  return parseFloat(Math.round(v * 100) / 100).toFixed(2);
};



var decimal$2 = Object.freeze({
	default: decimal
});

var percentage = clone(number);

percentage.format = function (v) {
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
  var compName = key.replace(/^\.\//, '').replace(/\.js/, '');
  dataTypes[compName] = coreDataTypes[key].default;
});

var GoodTable = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vgt-wrap", class: { 'rtl': _vm.rtl, 'nocturnal': _vm.theme === 'nocturnal' } }, [_vm.paginate && _vm.paginateOnTop ? _c('vue-good-pagination', { ref: "paginationTop", attrs: { "perPage": _vm.perPage, "rtl": _vm.rtl, "total": _vm.totalRows || _vm.totalRowCount, "nextText": _vm.nextText, "prevText": _vm.prevText, "rowsPerPageText": _vm.rowsPerPageText, "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown, "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll, "ofText": _vm.ofText, "allText": _vm.allText }, on: { "page-changed": _vm.pageChanged, "per-page-changed": _vm.perPageChanged } }) : _vm._e(), _vm._v(" "), _c('vgt-global-search', { attrs: { "search-enabled": _vm.searchEnabled && _vm.externalSearchQuery == null, "global-search-placeholder": _vm.searchPlaceholder }, on: { "on-keyup": _vm.searchTable, "on-enter": _vm.searchTable }, model: { value: _vm.globalSearchTerm, callback: function ($$v) {
          _vm.globalSearchTerm = $$v;
        }, expression: "globalSearchTerm" } }, [_c('template', { slot: "internal-table-actions" }, [_vm._t("table-actions")], 2)], 2), _vm._v(" "), _vm.selectedRowCount ? _c('div', { staticClass: "vgt-selection-info-row clearfix", class: _vm.selectionInfoClass }, [_vm._v(" " + _vm._s(_vm.selectionInfo) + " "), _c('a', { attrs: { "href": "" }, on: { "click": function ($event) {
          $event.preventDefault();_vm.unselectAll();_vm.unselectAllInternal();
        } } }, [_vm._v(" " + _vm._s(_vm.clearSelectionText) + " ")]), _vm._v(" "), _c('div', { staticClass: "vgt-selection-info-row__actions vgt-pull-right" }, [_vm._t("selected-row-actions")], 2)]) : _vm._e(), _vm._v(" "), _c('div', { class: { 'vgt-responsive': _vm.responsive } }, [_c('table', { ref: "table", class: _vm.tableStyleClasses }, [_c('thead', [_c('tr', [_vm.lineNumbers ? _c('th', { staticClass: "line-numbers" }) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', { staticClass: "vgt-checkbox-col" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.allSelected, expression: "allSelected" }], attrs: { "type": "checkbox" }, domProps: { "checked": Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : _vm.allSelected }, on: { "change": [function ($event) {
          var $$a = _vm.allSelected,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);if ($$el.checked) {
              $$i < 0 && (_vm.allSelected = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.allSelected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.allSelected = $$c;
          }
        }, _vm.toggleSelectAll] } })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index$$1) {
      return !column.hidden ? _c('th', { key: index$$1, class: _vm.getHeaderClasses(column, index$$1), style: { width: column.width ? column.width : 'auto' }, on: { "click": function ($event) {
            _vm.sort(index$$1);
          } } }, [_vm._t("table-column", [_c('span', [_vm._v(_vm._s(column.label))])], { column: column })], 2) : _vm._e();
    })], 2), _vm._v(" "), _c("vgt-filter-row", { tag: "tr", attrs: { "global-search-enabled": _vm.searchEnabled, "line-numbers": _vm.lineNumbers, "selectable": _vm.selectable, "columns": _vm.columns, "typed-columns": _vm.typedColumns }, on: { "filter-changed": _vm.filterRows } })]), _vm._v(" "), _vm._l(_vm.paginated, function (headerRow, index$$1) {
      return _c('tbody', { key: index$$1 }, [_vm.groupHeaderOnTop ? _c('tr', [headerRow.mode === 'span' ? _c('th', { staticClass: "vgt-left-align vgt-row-header", attrs: { "colspan": _vm.fullColspan } }, [_vm._v(" " + _vm._s(headerRow.label) + " ")]) : _vm._e(), _vm._v(" "), headerRow.mode !== 'span' && _vm.lineNumbers ? _c('th', { staticClass: "vgt-row-header" }) : _vm._e(), _vm._v(" "), headerRow.mode !== 'span' && _vm.selectable ? _c('th', { staticClass: "vgt-row-header" }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
        return headerRow.mode !== 'span' ? _c('th', { key: i, staticClass: "vgt-row-header", class: _vm.getClasses(i, 'td') }, [_vm._v(" " + _vm._s(_vm.collectFormatted(headerRow, column, true)) + " ")]) : _vm._e();
      })], 2) : _vm._e(), _vm._v(" "), _vm._l(headerRow.children, function (row, index$$1) {
        return _c('tr', { key: row.originalIndex, class: _vm.getRowStyleClass(row), on: { "mouseenter": function ($event) {
              _vm.onMouseenter(row, index$$1);
            }, "mouseleave": function ($event) {
              _vm.onMouseleave(row, index$$1);
            }, "click": function ($event) {
              _vm.click(row, index$$1);
            } } }, [_vm.lineNumbers ? _c('th', { staticClass: "line-numbers" }, [_vm._v(" " + _vm._s(_vm.getCurrentIndex(index$$1)) + " ")]) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', { staticClass: "vgt-checkbox-col" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: row.vgtSelected, expression: "row.vgtSelected" }], attrs: { "type": "checkbox" }, domProps: { "checked": Array.isArray(row.vgtSelected) ? _vm._i(row.vgtSelected, null) > -1 : row.vgtSelected }, on: { "change": function ($event) {
              var $$a = row.vgtSelected,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
                var $$v = null,
                    $$i = _vm._i($$a, $$v);if ($$el.checked) {
                  $$i < 0 && _vm.$set(row, "vgtSelected", $$a.concat([$$v]));
                } else {
                  $$i > -1 && _vm.$set(row, "vgtSelected", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.$set(row, "vgtSelected", $$c);
              }
            } } })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
          return !column.hidden && column.field ? _c('td', { key: i, class: _vm.getClasses(i, 'td') }, [_vm._t("table-row", [!column.html ? _c('span', [_vm._v(" " + _vm._s(_vm.collectFormatted(row, column)) + " ")]) : _vm._e(), _vm._v(" "), column.html ? _c('span', { domProps: { "innerHTML": _vm._s(_vm.collect(row, column.field)) } }) : _vm._e()], { row: row, column: column, formattedRow: _vm.formattedRow(row), index: index$$1 })], 2) : _vm._e();
        })], 2);
      }), _vm._v(" "), _vm.groupHeaderOnBottom ? _c('tr', [headerRow.mode === 'span' ? _c('th', { staticClass: "vgt-left-align vgt-row-header", attrs: { "colspan": _vm.columns.length } }, [_vm._v(" " + _vm._s(headerRow.label) + " ")]) : _vm._e(), _vm._v(" "), headerRow.mode !== 'span' && _vm.lineNumbers ? _c('th', { staticClass: "vgt-row-header" }) : _vm._e(), _vm._v(" "), headerRow.mode !== 'span' && _vm.selectable ? _c('th', { staticClass: "vgt-row-header" }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
        return headerRow.mode !== 'span' ? _c('th', { key: i, staticClass: "vgt-row-header", class: _vm.getClasses(i, 'td') }, [_vm._v(" " + _vm._s(_vm.collectFormatted(headerRow, column, true)) + " ")]) : _vm._e();
      })], 2) : _vm._e()], 2);
    }), _vm._v(" "), !_vm.paginated.length ? _c('tbody', [_c('tr', [_c('td', { attrs: { "colspan": _vm.fullColspan } }, [_vm._t("emptystate", [_c('div', { staticClass: "vgt-center-align vgt-text-disabled" }, [_vm._v(" No data for table ")])])], 2)])]) : _vm._e()], 2)]), _vm._v(" "), _vm.paginate && _vm.paginateOnBottom ? _c('vue-good-pagination', { ref: "paginationBottom", attrs: { "perPage": _vm.perPage, "rtl": _vm.rtl, "total": _vm.totalRows || _vm.totalRowCount, "nextText": _vm.nextText, "prevText": _vm.prevText, "rowsPerPageText": _vm.rowsPerPageText, "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown, "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll, "ofText": _vm.ofText, "allText": _vm.allText }, on: { "page-changed": _vm.pageChanged, "per-page-changed": _vm.perPageChanged } }) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: 'vue-good-table',
  props: {
    theme: { default: '' },
    mode: { default: 'local' }, // could be remote
    totalRows: {}, // required if mode = 'remote'
    styleClass: { default: 'vgt-table bordered' },
    columns: {},
    rows: {},
    lineNumbers: { default: false },
    responsive: { default: true },
    rtl: { default: false },
    rowStyleClass: { default: null, type: [Function, String] },

    groupOptions: {
      default: function default$1$$1() {
        return {
          enabled: false
        };
      }
    },

    selectOptions: {
      default: function default$2$$1() {
        return {
          enabled: false,
          selectionInfoClass: '',
          selectionText: 'rows selected',
          clearSelectionText: 'clear'
        };
      }
    },

    // sort
    sortOptions: {
      default: function default$3$$1() {
        return {
          enabled: true,
          initialSortBy: {}
        };
      }
    },

    // pagination
    paginationOptions: {
      default: function default$4$$1() {
        return {
          enabled: false,
          perPage: 10,
          perPageDropdown: null,
          position: 'bottom',
          dropdownAllowAll: true
        };
      }
    },

    searchOptions: {
      default: function default$5$$1() {
        return {
          enabled: false,
          trigger: null,
          externalQuery: null,
          searchFn: null,
          placeholder: 'Search Table'
        };
      }
    }
  },

  data: function () { return ({
    // text options
    nextText: 'Next',
    prevText: 'Prev',
    rowsPerPageText: 'Rows per page',
    ofText: 'of',
    allText: 'All',

    // internal select options
    selectable: false,
    selectionInfoClass: '',
    selectionText: 'rows selected',
    clearSelectionText: 'clear',

    // internal sort options
    sortable: true,
    defaultSortBy: null,

    // internal search options
    searchEnabled: false,
    searchTrigger: null,
    externalSearchQuery: null,
    searchFn: null,
    searchPlaceholder: 'Search Table',

    // internal pagination options
    perPage: null,
    paginate: false,
    paginateOnTop: false,
    paginateOnBottom: true,
    customRowsPerPageDropdown: [],
    paginateDropdownAllowAll: true,

    currentPage: 1,
    currentPerPage: 10,
    sortColumn: -1,
    sortType: 'asc',
    globalSearchTerm: '',
    filteredRows: [],
    columnFilters: {},
    forceSearch: false,
    sortChanged: false,
    dataTypes: dataTypes || {},

    // to keep track of select-all
    allSelected: false
  }); },

  watch: {
    rows: {
      handler: function handler() {
        this.filterRows(this.columnFilters, false);
      },
      deep: true
    },

    selectOptions: {
      handler: function handler() {
        this.initializeSelect();
      },
      deep: true,
      immediate: true
    },

    paginationOptions: {
      handler: function handler() {
        this.initializePagination();
      },
      deep: true,
      immediate: true
    },

    searchOptions: {
      handler: function handler() {
        this.initializeSearch();
      },
      deep: true,
      immediate: true
    },

    sortOptions: {
      handler: function handler() {
        this.initializeSort();
      },
      deep: true,
      immediate: true
    }
  },

  computed: {
    selectionInfo: function selectionInfo() {
      return ((this.selectedRowCount) + " " + (this.selectionText));
    },

    selectedRowCount: function selectedRowCount() {
      return this.selectedRows.length;
    },

    selectedRows: function selectedRows() {
      var selectedRows = [];
      each(this.processedRows, function (headerRow) {
        each(headerRow.children, function (row) {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows;
    },

    fullColspan: function fullColspan() {
      var fullColspan = this.columns.length;
      if (this.lineNumbers) { fullColspan++; }
      if (this.selectable) { fullColspan++; }
      return fullColspan;
    },
    groupHeaderOnTop: function groupHeaderOnTop() {
      if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === 'bottom') {
        return false;
      }
      if (this.groupOptions && this.groupOptions.enabled) { return true; }

      // will only get here if groupOptions is false
      return false;
    },
    groupHeaderOnBottom: function groupHeaderOnBottom() {
      if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === 'bottom') {
        return true;
      }
      return false;
    },
    totalRowCount: function totalRowCount() {
      var total = 0;
      each(this.processedRows, function (headerRow) {
        total += headerRow.children ? headerRow.children.length : 0;
      });
      return total;
    },
    tableStyleClasses: function tableStyleClasses() {
      var classes = this.styleClass;
      classes += " " + (this.theme);
      return classes;
    },

    searchTerm: function searchTerm() {
      return this.externalSearchQuery != null ? this.externalSearchQuery : this.globalSearchTerm;
    },

    //
    globalSearchAllowed: function globalSearchAllowed() {
      if (this.searchEnabled && !!this.globalSearchTerm && this.searchTrigger !== 'enter') {
        return true;
      }

      if (this.externalSearchQuery != null && this.searchTrigger !== 'enter') {
        return true;
      }

      if (this.forceSearch) {
        this.forceSearch = false;
        return true;
      }

      return false;
    },

    // this is done everytime sortColumn
    // or sort type changes
    //----------------------------------------
    processedRows: function processedRows() {
      var this$1 = this;

      // we only process rows when mode is local
      var computedRows = this.filteredRows;
      if (this.mode === 'remote') {
        return computedRows;
      }

      // take care of the global filter here also
      if (this.globalSearchAllowed) {
        // here also we need to de-construct and then
        // re-construct the rows.
        var allRows = [];
        each(this.filteredRows, function (headerRow) {
          allRows.push.apply(allRows, headerRow.children);
        });
        var filteredRows = [];
        each(allRows, function (row) {
          each(this$1.columns, function (col) {
            // if col does not have search disabled,
            if (!col.globalSearchDisabled) {
              // if a search function is provided,
              // use that for searching, otherwise,
              // use the default search behavior
              if (this$1.searchFn) {
                var foundMatch = this$1.searchFn(row, col, this$1.collectFormatted(row, col), this$1.searchTerm);
                if (foundMatch) {
                  filteredRows.push(row);
                  return false; // break the loop
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
                    return false; // break loop
                  }
                }
              }
            }
          });
        });

        // this is where we emit on search
        this.$emit('on-search', {
          searchTerm: this.searchTerm,
          rowCount: filteredRows.length
        });

        // here we need to reconstruct the nested structure
        // of rows
        computedRows = [];
        each(this.filteredRows, function (headerRow) {
          var i = headerRow.vgt_header_id;
          var children = filter(filteredRows, ['vgt_id', i]);
          if (children.length) {
            var newHeaderRow = cloneDeep(headerRow);
            newHeaderRow.children = children;
            computedRows.push(newHeaderRow);
          }
        });
      }

      // taking care of sort here only if sort has changed
      if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) && (
      // if search trigger is enter then we only sort
      // when enter is hit
      this.searchTrigger !== 'enter' || this.sortChanged)) {
        this.sortChanged = false;

        each(computedRows, function (cRows) {
          cRows.children.sort(function (x, y) {
            if (!this$1.columns[this$1.sortColumn]) { return 0; }

            var xvalue = this$1.collect(x, this$1.columns[this$1.sortColumn].field);
            var yvalue = this$1.collect(y, this$1.columns[this$1.sortColumn].field);

            // if user has provided a custom sort, use that instead of
            // built-in sort
            var ref = this$1.columns[this$1.sortColumn];
            var sortFn = ref.sortFn;
            if (sortFn && typeof sortFn === 'function') {
              return sortFn(xvalue, yvalue, this$1.columns[this$1.sortColumn]) * (this$1.sortType === 'desc' ? -1 : 1);
            }

            // built in sort
            var ref$1 = this$1.typedColumns[this$1.sortColumn];
            var typeDef = ref$1.typeDef;
            return typeDef.compare(xvalue, yvalue, this$1.columns[this$1.sortColumn]) * (this$1.sortType === 'desc' ? -1 : 1);
          });
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
      if (!this.processedRows.length) { return []; }

      if (this.mode === 'remote') {
        return this.processedRows;
      }

      // for every group, extract the child rows
      // to cater to paging
      var paginatedRows = [];
      each(this.processedRows, function (childRows) {
        paginatedRows.push.apply(paginatedRows, childRows.children);
      });

      if (this.paginate) {
        var pageStart = (this.currentPage - 1) * this.currentPerPage;

        // in case of filtering we might be on a page that is
        // not relevant anymore
        // also, if setting to all, current page will not be valid
        if (pageStart >= paginatedRows.length || this.currentPerPage === -1) {
          this.currentPage = 1;
          pageStart = 0;
        }

        // calculate page end now
        var pageEnd = paginatedRows.length + 1;

        // if the setting is set to 'all'
        if (this.currentPerPage !== -1) {
          pageEnd = this.currentPage * this.currentPerPage;
        }

        paginatedRows = paginatedRows.slice(pageStart, pageEnd);
      }
      // reconstruct paginated rows here
      var reconstructedRows = [];
      each(this.processedRows, function (headerRow) {
        var i = headerRow.vgt_header_id;
        var children = filter(paginatedRows, ['vgt_id', i]);
        if (children.length) {
          var newHeaderRow = cloneDeep(headerRow);
          newHeaderRow.children = children;
          reconstructedRows.push(newHeaderRow);
        }
      });
      return reconstructedRows;
    },

    originalRows: function originalRows() {
      var rows = cloneDeep(this.rows);
      var nestedRows = [];
      if (!this.groupOptions.enabled) {
        nestedRows = this.handleGrouped([{
          label: 'no groups',
          children: rows
        }]);
      } else {
        nestedRows = this.handleGrouped(rows);
      }
      // we need to preserve the original index of
      // rows so lets do that
      var index$$1 = 0;
      each(nestedRows, function (headerRow, i) {
        each(headerRow.children, function (row, j) {
          row.originalIndex = index$$1++;
        });
      });

      return nestedRows;
    },

    typedColumns: function typedColumns() {
      var this$1 = this;

      var columns = assign(this.columns, []);
      for (var i = 0; i < this.columns.length; i++) {
        var column = columns[i];
        column.typeDef = this$1.dataTypes[column.type] || defaultType;
      }
      return columns;
    },

    hasRowClickListener: function hasRowClickListener() {
      return this.$listeners && this.$listeners['on-row-click'];
    }
  },

  methods: {
    emitSelectNone: function emitSelectNone() {
      this.$emit('on-select-all', {
        selected: false,
        selectedRows: []
      });
    },

    unselectAllInternal: function unselectAllInternal() {
      var this$1 = this;

      this.emitSelectNone();
      each(this.originalRows, function (headerRow, i) {
        each(headerRow.children, function (row, j) {
          this$1.$set(row, 'vgtSelected', false);
        });
      });
    },

    unselectAll: function unselectAll() {
      if (this.selectable && this.allSelected) {
        this.allSelected = false;
        // this.unselectAllInternal();
      }
    },

    toggleSelectAll: function toggleSelectAll() {
      var this$1 = this;

      if (!this.allSelected) {
        this.unselectAllInternal();
        return;
      }
      each(this.paginated, function (headerRow) {
        each(headerRow.children, function (row) {
          this$1.$set(row, 'vgtSelected', true);
        });
      });
      var selectedRows = [];
      if (this.groupOptions.enabled) {
        selectedRows = cloneDeep(this.paginated);
      } else {
        selectedRows = cloneDeep(this.paginated[0].children);
      }
      this.$emit('on-select-all', {
        selected: this.allSelected,
        selectedRows: selectedRows
      });
    },

    changePage: function changePage(value) {
      if (this.paginationOptions.enabled) {
        var paginationWidget = this.$refs.paginationBottom;
        if (this.paginationOptions.position === 'top') {
          paginationWidget = this.$refs.paginationTop;
        }
        if (paginationWidget) {
          paginationWidget.currentPage = value;
          // we also need to set the currentPage
          // for table.
          this.currentPage = value;
        }
      }
    },

    pageChangedEvent: function pageChangedEvent() {
      return {
        currentPage: this.currentPage,
        currentPerPage: this.currentPerPage,
        total: Math.floor(this.totalRowCount / this.currentPerPage)
      };
    },

    pageChanged: function pageChanged(pagination) {
      // every time we change page we have to unselect all
      this.unselectAll();
      this.currentPage = pagination.currentPage;
      var pageChangedEvent = this.pageChangedEvent();
      this.$emit('on-page-change', pageChangedEvent);
    },

    perPageChanged: function perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
      var perPageChangedEvent = this.pageChangedEvent();
      this.$emit('on-per-page-change', perPageChangedEvent);
    },

    sort: function sort(index$$1) {
      if (!this.isSortableColumn(index$$1)) { return; }

      if (this.sortColumn === index$$1) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = 'asc';
        this.sortColumn = index$$1;
      }

      this.$emit('on-sort-change', {
        sortType: this.sortType,
        columnIndex: this.sortColumn
      });

      this.unselectAll();
      // every time we change sort we need to reset to page 1
      this.changePage(1);

      // if the mode is remote, we don't need to do anything
      // after this.
      if (this.mode === 'remote') { return; }
      this.sortChanged = true;
    },

    click: function click(row, index$$1) {
      var selected = false;
      if (this.selectable) {
        selected = !row.vgtSelected;
        this.$set(row, 'vgtSelected', selected);
        if (!selected) {
          // if we're unselecting a row, we need to unselect
          // selectall
          this.unselectAll();
        }
      }
      this.$emit('on-row-click', {
        row: row,
        pageIndex: index$$1,
        selected: selected
      });
    },

    onMouseenter: function onMouseenter(row, index$$1) {
      this.$emit('on-row-mouseenter', {
        row: row,
        pageIndex: index$$1
      });
    },

    onMouseleave: function onMouseleave(row, index$$1) {
      this.$emit('on-row-mouseleave', {
        row: row,
        pageIndex: index$$1
      });
    },

    searchTable: function searchTable() {
      this.unselectAll();
      this.unselectAllInternal();
      // every time we searchTable
      this.changePage(1);
      if (this.searchTrigger === 'enter') {
        // we reset the filteredRows here because
        // we want to search across everything.
        this.filteredRows = this.originalRows;
        this.forceSearch = true;
        this.sortChanged = true;
      }
    },

    // field can be:
    // 1. function
    // 2. regular property - ex: 'prop'
    // 3. nested property path - ex: 'nested.prop'
    collect: function collect(obj, field) {
      // utility function to get nested property
      function dig(obj, selector) {
        var result = obj;
        var splitter = selector.split('.');
        for (var i = 0; i < splitter.length; i++) {
          if (typeof result === 'undefined') {
            return undefined;
          }
          result = result[splitter[i]];
        }
        return result;
      }

      if (typeof field === 'function') { return field(obj); }
      if (typeof field === 'string') { return dig(obj, field); }
      return undefined;
    },

    collectFormatted: function collectFormatted(obj, column, headerRow) {
      if ( headerRow === void 0 ) headerRow = false;

      var value;
      if (headerRow && column.headerField) {
        value = this.collect(obj, column.headerField);
      } else {
        value = this.collect(obj, column.field);
      }
      if (value === undefined) { return ''; }

      // if user has supplied custom formatter,
      // use that here
      if (column.formatFn && typeof column.formatFn === 'function') {
        return column.formatFn(value);
      }

      // lets format the resultant data
      var type = column.typeDef;
      return type.format(value, column);
    },

    formattedRow: function formattedRow(row) {
      var this$1 = this;

      var formattedRow = {};
      for (var i = 0; i < this.typedColumns.length; i++) {
        var col = this$1.typedColumns[i];
        // what happens if field is
        if (col.field) {
          formattedRow[col.field] = this$1.collectFormatted(row, col);
        }
      }
      return formattedRow;
    },

    // Check if a column is sortable.
    isSortableColumn: function isSortableColumn(index$$1) {
      var ref = this.columns[index$$1];
      var sortable = ref.sortable;
      var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },

    // Get classes for the given header column.
    getHeaderClasses: function getHeaderClasses(column, index$$1) {
      var isSortable = this.isSortableColumn(index$$1);
      var classes = assign({}, this.getClasses(index$$1, 'th'), {
        sorting: isSortable,
        'sorting-desc': isSortable && this.sortColumn === index$$1 && this.sortType === 'desc',
        'sorting-asc': isSortable && this.sortColumn === index$$1 && this.sortType === 'asc'
      });
      return classes;
    },

    // Get classes for the given column index & element.
    getClasses: function getClasses(index$$1, element) {
      var ref = this.typedColumns[index$$1];
      var typeDef = ref.typeDef;
      var custom = ref[(element + "Class")];
      var isRight = typeDef.isRight;
      if (this.rtl) { isRight = true; }
      var classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight
      };
      classes[custom] = !!custom;
      return classes;
    },

    // method to filter rows
    filterRows: function filterRows(columnFilters, fromFilter) {
      var this$1 = this;
      if ( fromFilter === void 0 ) fromFilter = true;

      // this is invoked either as a result of changing filters
      // or as a result of modifying rows rows.
      this.columnFilters = columnFilters;
      var computedRows = cloneDeep(this.originalRows);

      // do we have a filter to care about?
      // if not we don't need to do anything
      if (this.columnFilters && Object.keys(this.columnFilters).length) {
        // every time we filter rows, we need to set current page
        // to 1
        this.changePage(1);
        this.unselectAll();
        // if mode is remote, we don't do any filtering here.
        // we need to emit an event and that's that.
        // but this only needs to be invoked if filter is changing
        // not when row object is modified.
        if (this.mode === 'remote' && fromFilter) {
          this.$emit('on-column-filter', {
            columnFilters: this.columnFilters
          });
          return;
        }

        var loop = function ( i ) {
          var col = this$1.typedColumns[i];
          if (this$1.columnFilters[col.field]) {
            computedRows = each(computedRows, function (headerRow) {
              var newChildren = headerRow.children.filter(function (row) {
                // If column has a custom filter, use that.
                if (col.filterOptions && typeof col.filterOptions.filterFn === 'function') {
                  return col.filterOptions.filterFn(this$1.collect(row, col.field), this$1.columnFilters[col.field]);
                }
                // Otherwise Use default filters
                var typeDef = col.typeDef;
                return typeDef.filterPredicate(this$1.collect(row, col.field), this$1.columnFilters[col.field]);
              });
              // should we remove the header?
              headerRow.children = newChildren;
            });
          }
        };

        for (var i = 0; i < this.typedColumns.length; i++) loop( i );
      }
      this.filteredRows = computedRows;
    },

    getCurrentIndex: function getCurrentIndex(index$$1) {
      return (this.currentPage - 1) * this.currentPerPage + index$$1 + 1;
    },

    getRowStyleClass: function getRowStyleClass(row) {
      var classes = '';
      if (this.hasRowClickListener) { classes += 'clickable'; }
      var rowStyleClasses;
      if (typeof this.rowStyleClass === 'function') {
        rowStyleClasses = this.rowStyleClass(row);
      } else {
        rowStyleClasses = this.rowStyleClass;
      }
      if (rowStyleClasses) {
        classes += " " + rowStyleClasses;
      }
      return classes;
    },

    handleGrouped: function handleGrouped(originalRows) {
      each(originalRows, function (headerRow, i) {
        headerRow.vgt_header_id = i;
        each(headerRow.children, function (childRow) {
          childRow.vgt_id = i;
        });
      });
      return originalRows;
    },

    handleRows: function handleRows() {
      if (!this.groupOptions.enabled) {
        this.filteredRows = this.handleGrouped([{
          label: 'no groups',
          children: this.originalRows
        }]);
      } else {
        this.filteredRows = this.handleGrouped(this.originalRows);
      }
    },

    initializePagination: function initializePagination() {
      var this$1 = this;

      var ref = this.paginationOptions;
      var enabled = ref.enabled;
      var perPage = ref.perPage;
      var position = ref.position;
      var perPageDropdown = ref.perPageDropdown;
      var dropdownAllowAll = ref.dropdownAllowAll;
      var nextLabel = ref.nextLabel;
      var prevLabel = ref.prevLabel;
      var rowsPerPageLabel = ref.rowsPerPageLabel;
      var ofLabel = ref.ofLabel;
      var allLabel = ref.allLabel;
      var setCurrentPage = ref.setCurrentPage;

      if (typeof enabled === 'boolean') {
        this.paginate = enabled;
      }

      if (typeof perPage === 'number') {
        this.perPage = perPage;
      }

      if (position === 'top') {
        this.paginateOnTop = true; // default is false
        this.paginateOnBottom = false; // default is true
      } else if (position === 'both') {
        this.paginateOnTop = true;
        this.paginateOnBottom = true;
      }

      if (Array.isArray(perPageDropdown) && perPageDropdown.length) {
        this.customRowsPerPageDropdown = perPageDropdown;
      }

      if (typeof dropdownAllowAll === 'boolean') {
        this.paginateDropdownAllowAll = dropdownAllowAll;
      }

      if (typeof nextLabel === 'string') {
        this.nextText = nextLabel;
      }

      if (typeof prevLabel === 'string') {
        this.prevText = prevLabel;
      }

      if (typeof rowsPerPageLabel === 'string') {
        this.rowsPerPageText = rowsPerPageLabel;
      }

      if (typeof ofLabel === 'string') {
        this.ofText = ofLabel;
      }

      if (typeof allLabel === 'string') {
        this.allText = allLabel;
      }

      if (typeof setCurrentPage === 'number') {
        setTimeout(function () {
          this$1.changePage(setCurrentPage);
        }, 500);
      }
    },

    initializeSearch: function initializeSearch() {
      var ref = this.searchOptions;
      var enabled = ref.enabled;
      var trigger = ref.trigger;
      var externalQuery = ref.externalQuery;
      var searchFn = ref.searchFn;
      var placeholder = ref.placeholder;

      if (typeof enabled === 'boolean') {
        this.searchEnabled = enabled;
      }

      if (trigger === 'enter') {
        this.searchTrigger = trigger;
      }

      if (typeof externalQuery === 'string') {
        this.externalSearchQuery = externalQuery;
      }

      if (typeof searchFn === 'function') {
        this.searchFn = searchFn;
      }

      if (typeof placeholder === 'string') {
        this.searchPlaceholder = placeholder;
      }
    },

    initializeSort: function initializeSort() {
      var ref = this.sortOptions;
      var enabled = ref.enabled;
      var initialSortBy = ref.initialSortBy;

      if (typeof enabled === 'boolean') {
        this.sortable = enabled;
      }

      if (typeof initialSortBy === 'object') {
        this.defaultSortBy = initialSortBy;
      }
    },

    initializeSelect: function initializeSelect() {
      var ref = this.selectOptions;
      var enabled = ref.enabled;
      var selectionInfoClass = ref.selectionInfoClass;
      var selectionText = ref.selectionText;
      var clearSelectionText = ref.clearSelectionText;

      if (typeof enabled === 'boolean') {
        this.selectable = enabled;
      }

      if (typeof selectionInfoClass === 'string') {
        this.selectionInfoClass = selectionInfoClass;
      }

      if (typeof selectionText === 'string') {
        this.selectionText = selectionText;
      }

      if (typeof clearSelectionText === 'string') {
        this.clearSelectionText = clearSelectionText;
      }
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.filteredRows = this.originalRows;

    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }

    // take care of default sort on mount
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
  },

  components: {
    'vue-good-pagination': VueGoodPagination,
    'vgt-global-search': VgtGlobalSearch,
    'vgt-filter-row': VgtFilterRow
  }
};

var GoodTablePlugin = {
  install: function install(Vue, options) {
    Vue.component(GoodTable.name, GoodTable);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GoodTablePlugin);
}

export { GoodTable };
export default GoodTablePlugin;
