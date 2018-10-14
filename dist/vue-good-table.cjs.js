/**
 * vue-good-table v2.15.3
 * (c) 2018-present xaksis <shay@crayonbits.com>
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var diacriticless = _interopDefault(require('diacriticless'));
var clone = _interopDefault(require('lodash.clonedeep'));
var assign = _interopDefault(require('lodash.assign'));
var dateFns = require('date-fns');
var each = _interopDefault(require('lodash.foreach'));
var filter = _interopDefault(require('lodash.filter'));
var isEqual = _interopDefault(require('lodash.isequal'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};

var def = {
  format: function format(x) {
    return x;
  },
  filterPredicate: function filterPredicate(rowval, filter$$1) {
    var skipDiacritics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    } // row value


    var rowValue = skipDiacritics ? String(rowval).toLowerCase() : diacriticless(String(rowval).toLowerCase()); // search term

    var searchTerm = skipDiacritics ? escapeRegExp(filter$$1).toLowerCase() : diacriticless(escapeRegExp(filter$$1).toLowerCase()); // comparison

    return rowValue.indexOf(searchTerm) > -1;
  },
  compare: function compare(x, y) {
    function cook(d) {
      if (typeof d === 'undefined' || d === null) return '';
      return diacriticless(d.toLowerCase());
    }

    x = cook(x);
    y = cook(y);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  }
};

var VgtPaginationPageInfo = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "footer__navigation__page-info"
    }, [_vm._v(" " + _vm._s(_vm.pageText) + " "), _c('input', {
      staticClass: "footer__navigation__page-info__current-entry",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.currentPage
      },
      on: {
        "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          $event.stopPropagation();
          return _vm.changePage($event);
        }
      }
    }), _vm._v(" " + _vm._s(_vm.pageInfo) + " ")]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-731a4dda',
  name: 'VgtPaginationPageInfo',
  props: {
    currentPage: {
      default: 1
    },
    lastPage: {
      default: 1
    },
    totalRecords: {
      default: 0
    },
    ofText: {
      default: 'of',
      type: String
    },
    pageText: {
      default: 'page',
      type: String
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    pageInfo: function pageInfo() {
      return "".concat(this.ofText, " ").concat(this.lastPage);
    }
  },
  methods: {
    changePage: function changePage(event) {
      var value = parseInt(event.target.value, 10); //! invalid number

      if (Number.isNaN(value) || value > this.lastPage || value < 1) {
        event.target.value = this.currentPage;
        return false;
      } //* valid number


      event.target.value = value;
      this.$emit('page-changed', value);
    }
  },
  mounted: function mounted() {},
  components: {}
};

var DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50];
var VgtPagination = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "vgt-wrap__footer vgt-clearfix"
    }, [_c('div', {
      staticClass: "footer__row-count vgt-pull-left"
    }, [_c('span', {
      staticClass: "footer__row-count__label"
    }, [_vm._v(_vm._s(_vm.rowsPerPageText))]), _vm._v(" "), _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.currentPerPage,
        expression: "currentPerPage"
      }],
      staticClass: "footer__row-count__select",
      attrs: {
        "autocomplete": "off",
        "name": "perPageSelect"
      },
      on: {
        "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.currentPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }, _vm.perPageChanged]
      }
    }, [_vm._l(_vm.rowsPerPageOptions, function (option, idx) {
      return _c('option', {
        key: 'rows-dropdown-option-' + idx,
        domProps: {
          "value": option
        }
      }, [_vm._v(" " + _vm._s(option) + " ")]);
    }), _vm._v(" "), _vm.paginateDropdownAllowAll ? _c('option', {
      domProps: {
        "value": _vm.total
      }
    }, [_vm._v(_vm._s(_vm.allText))]) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
      staticClass: "footer__navigation vgt-pull-right"
    }, [_c('a', {
      staticClass: "footer__navigation__page-btn",
      class: {
        disabled: !_vm.prevIsPossible
      },
      attrs: {
        "href": "javascript:undefined",
        "tabindex": "0"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.previousPage($event);
        }
      }
    }, [_c('span', {
      staticClass: "chevron",
      class: {
        'left': !_vm.rtl,
        'right': _vm.rtl
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.prevText))])]), _vm._v(" "), _vm.mode === 'pages' ? _c('pagination-page-info', {
      attrs: {
        "totalRecords": _vm.total,
        "lastPage": _vm.pagesCount,
        "currentPage": _vm.currentPage,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText
      },
      on: {
        "page-changed": _vm.changePage
      }
    }) : _c('div', {
      staticClass: "footer__navigation__info"
    }, [_vm._v(_vm._s(_vm.paginatedInfo))]), _vm._v(" "), _c('a', {
      staticClass: "footer__navigation__page-btn",
      class: {
        disabled: !_vm.nextIsPossible
      },
      attrs: {
        "href": "javascript:undefined",
        "tabindex": "0"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.nextPage($event);
        }
      }
    }, [_c('span', [_vm._v(_vm._s(_vm.nextText))]), _vm._v(" "), _c('span', {
      staticClass: "chevron",
      class: {
        'right': !_vm.rtl,
        'left': _vm.rtl
      }
    })])], 1)]);
  },
  staticRenderFns: [],
  name: 'VgtPagination',
  props: {
    styleClass: {
      default: 'table table-bordered'
    },
    total: {
      default: null
    },
    perPage: {},
    rtl: {
      default: false
    },
    customRowsPerPageDropdown: {
      default: function _default() {
        return [];
      }
    },
    paginateDropdownAllowAll: {
      default: true
    },
    mode: {
      default: 'records'
    },
    // text options
    nextText: {
      default: 'Next'
    },
    prevText: {
      default: 'Prev'
    },
    rowsPerPageText: {
      default: 'Rows per page:'
    },
    ofText: {
      default: 'of'
    },
    pageText: {
      default: 'page'
    },
    allText: {
      default: 'All'
    }
  },
  data: function data() {
    return {
      currentPage: 1,
      prevPage: 0,
      currentPerPage: 10,
      rowsPerPageOptions: []
    };
  },
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
    // Number of pages
    pagesCount: function pagesCount() {
      var quotient = Math.floor(this.total / this.currentPerPage);
      var remainder = this.total % this.currentPerPage;
      return remainder === 0 ? quotient : quotient + 1;
    },
    // Current displayed items
    paginatedInfo: function paginatedInfo() {
      var first = (this.currentPage - 1) * this.currentPerPage + 1;
      var last = Math.min(this.total, this.currentPage * this.currentPerPage);

      if (last === 0) {
        first = 0;
      }

      return "".concat(first, " - ").concat(last, " ").concat(this.ofText, " ").concat(this.total);
    },
    // Can go to next page
    nextIsPossible: function nextIsPossible() {
      return this.currentPage < this.pagesCount;
    },
    // Can go to previous page
    prevIsPossible: function prevIsPossible() {
      return this.currentPage > 1;
    }
  },
  methods: {
    // Change current page
    changePage: function changePage(pageNumber) {
      if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
        this.prevPage = this.currentPage;
        this.currentPage = pageNumber;
        this.pageChanged();
      }
    },
    // Go to next page
    nextPage: function nextPage() {
      if (this.nextIsPossible) {
        this.prevPage = this.currentPage;
        ++this.currentPage;
        this.pageChanged();
      }
    },
    // Go to previous page
    previousPage: function previousPage() {
      if (this.prevIsPossible) {
        this.prevPage = this.currentPage;
        --this.currentPage;
        this.pageChanged();
      }
    },
    // Indicate page changing
    pageChanged: function pageChanged() {
      this.$emit('page-changed', {
        currentPage: this.currentPage,
        prevPage: this.prevPage
      });
    },
    // Indicate per page changing
    perPageChanged: function perPageChanged() {
      // go back to first page
      this.$emit('per-page-changed', {
        currentPerPage: this.currentPerPage
      });
      this.changePage(1);
    },
    // Handle per page changing
    handlePerPage: function handlePerPage() {
      //* if there's a custom dropdown then we use that
      if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      } else {
        //* otherwise we use the default rows per page dropdown
        this.rowsPerPageOptions = clone(DEFAULT_ROWS_PER_PAGE_DROPDOWN);
      }

      if (this.perPage) {
        this.currentPerPage = this.perPage; // if perPage doesn't already exist, we add it

        var found = false;

        for (var i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this.rowsPerPageOptions[i] === this.perPage) {
            found = true;
          }
        }

        if (!found && this.perPage !== -1) {
          this.rowsPerPageOptions.push(this.perPage);
        }
      } else {
        // reset to default
        this.currentPerPage = 10;
      }
    }
  },
  mounted: function mounted() {
    this.handlePerPage();
  },
  components: {
    'pagination-page-info': VgtPaginationPageInfo
  }
};

var VgtGlobalSearch = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.showControlBar ? _c('div', {
      staticClass: "vgt-global-search vgt-clearfix"
    }, [_c('div', {
      staticClass: "vgt-global-search__input vgt-pull-left"
    }, [_vm.searchEnabled ? _c('span', {
      staticClass: "input__icon"
    }, [_c('div', {
      staticClass: "magnifying-glass"
    })]) : _vm._e(), _vm._v(" "), _vm.searchEnabled ? _c('input', {
      staticClass: "vgt-input vgt-pull-left",
      attrs: {
        "type": "text",
        "placeholder": _vm.globalSearchPlaceholder
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          _vm.updateValue($event.target.value);
        },
        "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          _vm.entered($event.target.value);
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "vgt-global-search__actions vgt-pull-right"
    }, [_vm._t("internal-table-actions")], 2)]) : _vm._e();
  },
  staticRenderFns: [],
  name: 'VgtGlobalSearch',
  props: ['value', 'searchEnabled', 'globalSearchPlaceholder'],
  data: function data() {
    return {
      globalSearchTerm: null
    };
  },
  computed: {
    showControlBar: function showControlBar() {
      if (this.searchEnabled) return true;
      if (this.$slots && this.$slots['internal-table-actions']) return true;
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

var VgtFilterRow = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.hasFilterRow ? _c('tr', [_vm.lineNumbers ? _c('th') : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th') : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
      return !column.hidden ? _c('th', {
        key: index,
        staticClass: "filter-th"
      }, [_vm.isFilterable(column) ? _c('div', [!_vm.isDropdown(column) ? _c('input', {
        staticClass: "vgt-input",
        attrs: {
          "type": "text",
          "placeholder": _vm.getPlaceholder(column)
        },
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "keyup": function keyup($event) {
            if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            _vm.updateFiltersOnEnter(column, $event.target.value);
          },
          "input": function input($event) {
            _vm.updateFiltersOnKeyup(column, $event.target.value);
          }
        }
      }) : _vm._e(), _vm._v(" "), _vm.isDropdownArray(column) ? _c('select', {
        staticClass: "vgt-select",
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "change": function change($event) {
            _vm.updateFilters(column, $event.target.value);
          }
        }
      }, [_c('option', {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', {
          key: i,
          domProps: {
            "value": option
          }
        }, [_vm._v(" " + _vm._s(option) + " ")]);
      })], 2) : _vm._e(), _vm._v(" "), _vm.isDropdownObjects(column) ? _c('select', {
        staticClass: "vgt-select",
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "input": function input($event) {
            _vm.updateFilters(column, $event.target.value, true);
          }
        }
      }, [_c('option', {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', {
          key: i,
          domProps: {
            "value": option.value
          }
        }, [_vm._v(_vm._s(option.text))]);
      })], 2) : _vm._e()]) : _vm._e()]) : _vm._e();
    })], 2) : _vm._e();
  },
  staticRenderFns: [],
  _scopeId: 'data-v-2949d74f',
  name: 'VgtFilterRow',
  props: ['lineNumbers', 'columns', 'typedColumns', 'globalSearchEnabled', 'selectable', 'mode'],
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
      // if (this.mode === 'remote' || !this.globalSearchEnabled) {
      for (var i = 0; i < this.columns.length; i++) {
        var col = this.columns[i];

        if (col.filterOptions && col.filterOptions.enabled) {
          return true;
        }
      } // }


      return false;
    }
  },
  methods: {
    reset: function reset() {
      var emitEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.columnFilters = {};

      if (emitEvent) {
        this.$emit('filter-changed', this.columnFilters);
      }
    },
    isFilterable: function isFilterable(column) {
      return column.filterOptions && column.filterOptions.enabled;
    },
    isDropdown: function isDropdown(column) {
      return this.isFilterable(column) && column.filterOptions.filterDropdownItems && column.filterOptions.filterDropdownItems.length;
    },
    isDropdownObjects: function isDropdownObjects(column) {
      return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) === 'object';
    },
    isDropdownArray: function isDropdownArray(column) {
      return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) !== 'object';
    },
    // get column's defined placeholder or default one
    getPlaceholder: function getPlaceholder(column) {
      var placeholder = this.isFilterable(column) && column.filterOptions.placeholder || "Filter ".concat(column.label);
      return placeholder;
    },
    updateFiltersOnEnter: function updateFiltersOnEnter(column, value) {
      if (this.timer) clearTimeout(this.timer);
      this.updateFiltersImmediately(column, value);
    },
    updateFiltersOnKeyup: function updateFiltersOnKeyup(column, value) {
      // if the trigger is enter, we don't filter on keyup
      if (column.filterOptions.trigger === 'enter') return;
      this.updateFilters(column, value);
    },
    // since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters: function updateFilters(column, value) {
      var _this = this;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.updateFiltersImmediately(column, value);
      }, 400);
    },
    updateFiltersImmediately: function updateFiltersImmediately(column, value) {
      this.$set(this.columnFilters, column.field, value);
      this.$emit('filter-changed', this.columnFilters);
    },
    populateInitialFilters: function populateInitialFilters() {
      for (var i = 0; i < this.columns.length; i++) {
        var col = this.columns[i]; // lets see if there are initial
        // filters supplied by user

        if (this.isFilterable(col) && typeof col.filterOptions.filterValue !== 'undefined' && col.filterOptions.filterValue !== null) {
          this.updateFiltersImmediately(col, col.filterOptions.filterValue);
          this.$set(col.filterOptions, 'filterValue', undefined);
        }
      }
    }
  },
  mounted: function mounted() {
    // take care of initial filters
    this.populateInitialFilters();
  }
};

var VgtTableHeader = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('thead', [_c('tr', [_vm.lineNumbers ? _c('th', {
      staticClass: "line-numbers"
    }) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', {
      staticClass: "vgt-checkbox-col"
    }, [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected,
        "indeterminate": _vm.allSelectedIndeterminate
      },
      on: {
        "change": _vm.toggleSelectAll
      }
    })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
      return !column.hidden ? _c('th', {
        key: index,
        class: _vm.getHeaderClasses(column, index),
        style: _vm.columnStyles[index],
        on: {
          "click": function click($event) {
            _vm.sort(index);
          }
        }
      }, [_vm._t("table-column", [_c('span', [_vm._v(_vm._s(column.label))])], {
        column: column
      })], 2) : _vm._e();
    })], 2), _vm._v(" "), _c("vgt-filter-row", {
      ref: "filter-row",
      tag: "tr",
      attrs: {
        "global-search-enabled": _vm.searchEnabled,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "columns": _vm.columns,
        "mode": _vm.mode,
        "typed-columns": _vm.typedColumns
      },
      on: {
        "filter-changed": _vm.filterRows
      }
    })]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-0c8b4370',
  name: 'VgtTableHeader',
  props: {
    lineNumbers: {
      default: false,
      type: Boolean
    },
    selectable: {
      default: false,
      type: Boolean
    },
    allSelected: {
      default: false,
      type: Boolean
    },
    allSelectedIndeterminate: {
      default: false,
      type: Boolean
    },
    columns: {
      type: Array
    },
    mode: {
      type: String
    },
    typedColumns: {},
    //* Sort related
    sortColumn: {
      type: Number
    },
    sortType: {
      type: String
    },
    // utility functions
    isSortableColumn: {
      type: Function
    },
    getClasses: {
      type: Function
    },
    //* search related
    searchEnabled: {
      type: Boolean
    },
    tableRef: {},
    paginated: {}
  },
  watch: {
    tableRef: {
      handler: function handler() {
        this.setColumnStyles();
      },
      immediate: true
    },
    paginated: {
      handler: function handler() {
        if (this.tableRef) {
          this.setColumnStyles();
        }
      },
      deep: true
    }
  },
  data: function data() {
    return {
      timer: null,
      checkBoxThStyle: {},
      lineNumberThStyle: {},
      columnStyles: []
    };
  },
  computed: {},
  methods: {
    reset: function reset() {
      this.$refs['filter-row'].reset(true);
    },
    toggleSelectAll: function toggleSelectAll() {
      this.$emit('on-toggle-select-all');
    },
    sort: function sort(index) {
      this.$emit('on-sort-change', index);
    },
    getHeaderClasses: function getHeaderClasses(column, index) {
      var isSortable = this.isSortableColumn(index);
      var classes = assign({}, this.getClasses(index, 'th'), {
        sorting: isSortable,
        'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
        'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc'
      });
      return classes;
    },
    filterRows: function filterRows(columnFilters) {
      this.$emit('filter-changed', columnFilters);
    },
    getWidthStyle: function getWidthStyle(dom) {
      if (window && window.getComputedStyle) {
        var cellStyle = window.getComputedStyle(dom, null);
        return {
          width: cellStyle.width
        };
      }

      return {
        width: 'auto'
      };
    },
    setColumnStyles: function setColumnStyles() {
      var _this = this;

      var colStyles = [];
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        for (var i = 0; i < _this.columns.length; i++) {
          if (_this.tableRef) {
            var skip = 0;
            if (_this.selectable) skip++;
            if (_this.lineNumbers) skip++;
            var cell = _this.tableRef.rows[0].cells[i + skip];
            colStyles.push(_this.getWidthStyle(cell));
          } else {
            colStyles.push({
              width: _this.columns[i].width ? _this.columns[i].width : 'auto'
            });
          }
        }

        _this.columnStyles = colStyles;
      }, 200);
    },
    getColumnStyle: function getColumnStyle(column, index) {
      var styleObject = {
        width: column.width ? column.width : 'auto'
      }; //* if fixed header we need to get width from original table

      if (this.tableRef) {
        if (this.selectable) index++;
        if (this.lineNumbers) index++;
        var cell = this.tableRef.rows[0].cells[index];
        var cellStyle = window.getComputedStyle(cell, null);
        styleObject.width = cellStyle.width;
      }

      return styleObject;
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.setColumnStyles);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
    window.removeEventListener('resize', this.setColumnStyles);
  },
  components: {
    'vgt-filter-row': VgtFilterRow
  }
};

var VgtHeaderRow = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_vm.headerRow.mode === 'span' ? _c('th', {
      staticClass: "vgt-left-align vgt-row-header",
      attrs: {
        "colspan": _vm.fullColspan
      }
    }, [_vm._t("table-header-row", [_vm.headerRow.html ? _c('span', {
      domProps: {
        "innerHTML": _vm._s(_vm.headerRow.label)
      }
    }) : _c('span', [_vm._v(" " + _vm._s(_vm.headerRow.label) + " ")])], {
      row: _vm.headerRow
    })], 2) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== 'span' && _vm.lineNumbers ? _c('th', {
      staticClass: "vgt-row-header"
    }) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== 'span' && _vm.selectable ? _c('th', {
      staticClass: "vgt-row-header"
    }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
      return _vm.headerRow.mode !== 'span' && !column.hidden ? _c('th', {
        key: i,
        staticClass: "vgt-row-header",
        class: _vm.getClasses(i, 'td')
      }, [_vm._t("table-header-row", [!column.html ? _c('span', [_vm._v(" " + _vm._s(_vm.collectFormatted(_vm.headerRow, column, true)) + " ")]) : _vm._e(), _vm._v(" "), column.html ? _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.collectFormatted(_vm.headerRow, column, true))
        }
      }) : _vm._e()], {
        row: _vm.headerRow,
        column: column,
        formattedRow: _vm.formattedRow(_vm.headerRow, true)
      })], 2) : _vm._e();
    })], 2);
  },
  staticRenderFns: [],
  name: 'VgtHeaderRow',
  props: {
    headerRow: {
      type: Object
    },
    columns: {
      type: Array
    },
    lineNumbers: {
      type: Boolean
    },
    selectable: {
      type: Boolean
    },
    collectFormatted: {
      type: Function
    },
    formattedRow: {
      type: Function
    },
    getClasses: {
      type: Function
    },
    fullColspan: {
      type: Number
    }
  },
  data: function data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted: function mounted() {},
  components: {}
};

var date = clone(def);
date.isRight = true;

date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return dateFns.parse("".concat(d), "".concat(column.dateInputFormat), new Date());
    }

    return d;
  }

  x = cook(x);
  y = cook(y);

  if (!dateFns.isValid(x)) {
    return -1;
  }

  if (!dateFns.isValid(y)) {
    return 1;
  }

  return dateFns.compareAsc(x, y);
};

date.format = function (v, column) {
  if (v === undefined || v === null) return ''; // convert to date

  var date = dateFns.parse(v, column.dateInputFormat, new Date());
  return dateFns.format(date, column.dateOutputFormat);
};

var date$1 = /*#__PURE__*/Object.freeze({
  default: date
});

var number = clone(def);
number.isRight = true;

number.filterPredicate = function (rowval, filter$$1) {
  return number.compare(rowval, filter$$1) === 0;
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

var number$1 = /*#__PURE__*/Object.freeze({
  default: number
});

var decimal = clone(number);

decimal.format = function (v) {
  if (v === undefined || v === null) return '';
  return parseFloat(Math.round(v * 100) / 100).toFixed(2);
};

var decimal$1 = /*#__PURE__*/Object.freeze({
  default: decimal
});

var percentage = clone(number);

percentage.format = function (v) {
  if (v === undefined || v === null) return '';
  return "".concat(parseFloat(v * 100).toFixed(2), "%");
};

var percentage$1 = /*#__PURE__*/Object.freeze({
  default: percentage
});

var boolean = clone(def);
boolean.isRight = true;

boolean.filterPredicate = function (rowval, filter$$1) {
  return boolean.compare(rowval, filter$$1) === 0;
};

boolean.compare = function (x, y) {
  function cook(d) {
    if (typeof d === 'boolean') return d ? 1 : 0;
    if (typeof d === 'string') return d === 'true' ? 1 : 0;
    return -Infinity;
  }

  x = cook(x);
  y = cook(y);
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

var boolean$1 = /*#__PURE__*/Object.freeze({
  default: boolean
});

var index = {
  date: date$1,
  decimal: decimal$1,
  number: number$1,
  percentage: percentage$1,
  boolean: boolean$1
};

var dataTypes = {};
var coreDataTypes = index;
each(Object.keys(coreDataTypes), function (key) {
  var compName = key.replace(/^\.\//, '').replace(/\.js/, '');
  dataTypes[compName] = coreDataTypes[key].default;
});
var VueGoodTable = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "vgt-wrap",
      class: {
        'rtl': _vm.rtl,
        'nocturnal': _vm.theme === 'nocturnal',
        'black-rhino': _vm.theme === 'black-rhino'
      }
    }, [_vm.isTableLoading ? _c('div', {
      staticClass: "vgt-loading vgt-center-align"
    }, [_vm._t("loadingContent", [_c('span', {
      staticClass: "vgt-loading__content"
    }, [_vm._v(" Loading... ")])])], 2) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "vgt-inner-wrap",
      class: {
        'is-loading': _vm.isTableLoading
      }
    }, [_vm.paginate && _vm.paginateOnTop ? _vm._t("pagination-top", [_c('vgt-pagination', {
      ref: "paginationTop",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })], {
      pageChanged: _vm.pageChanged,
      perPageChanged: _vm.perPageChanged,
      total: _vm.totalRows || _vm.totalRowCount
    }) : _vm._e(), _vm._v(" "), _c('vgt-global-search', {
      attrs: {
        "search-enabled": _vm.searchEnabled && _vm.externalSearchQuery == null,
        "global-search-placeholder": _vm.searchPlaceholder
      },
      on: {
        "on-keyup": _vm.searchTableOnKeyUp,
        "on-enter": _vm.searchTableOnEnter
      },
      model: {
        value: _vm.globalSearchTerm,
        callback: function callback($$v) {
          _vm.globalSearchTerm = $$v;
        },
        expression: "globalSearchTerm"
      }
    }, [_c('template', {
      slot: "internal-table-actions"
    }, [_vm._t("table-actions")], 2)], 2), _vm._v(" "), _vm.selectedRowCount ? _c('div', {
      staticClass: "vgt-selection-info-row clearfix",
      class: _vm.selectionInfoClass
    }, [_vm._v(" " + _vm._s(_vm.selectionInfo) + " "), _c('a', {
      attrs: {
        "href": ""
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();

          _vm.unselectAllInternal(true);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.clearSelectionText) + " ")]), _vm._v(" "), _c('div', {
      staticClass: "vgt-selection-info-row__actions vgt-pull-right"
    }, [_vm._t("selected-row-actions")], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "vgt-fixed-header"
    }, [_vm.fixedHeader ? _c('table', {
      class: _vm.tableStyleClasses
    }, [_c("vgt-table-header", {
      ref: "table-header-secondary",
      tag: "thead",
      attrs: {
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "all-selected": _vm.allSelected,
        "all-selected-indeterminate": _vm.allSelectedIndeterminate,
        "mode": _vm.mode,
        "typed-columns": _vm.typedColumns,
        "sort-column": _vm.sortColumn,
        "sort-type": _vm.sortType,
        "isSortableColumn": _vm.isSortableColumn,
        "getClasses": _vm.getClasses,
        "searchEnabled": _vm.searchEnabled,
        "paginated": _vm.paginated,
        "table-ref": _vm.$refs.table
      },
      on: {
        "on-toggle-select-all": _vm.toggleSelectAll,
        "on-sort-change": _vm.sort,
        "filter-changed": _vm.filterRows
      },
      scopedSlots: _vm._u([{
        key: "table-column",
        fn: function fn(props) {
          return [_vm._t("table-column", [_c('span', [_vm._v(_vm._s(props.column.label))])], {
            column: props.column
          })];
        }
      }])
    })]) : _vm._e()]), _vm._v(" "), _c('div', {
      class: {
        'vgt-responsive': _vm.responsive
      },
      style: _vm.wrapperStyles
    }, [_c('table', {
      ref: "table",
      class: _vm.tableStyleClasses
    }, [_c("vgt-table-header", {
      ref: "table-header-primary",
      tag: "thead",
      attrs: {
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "all-selected": _vm.allSelected,
        "all-selected-indeterminate": _vm.allSelectedIndeterminate,
        "mode": _vm.mode,
        "typed-columns": _vm.typedColumns,
        "sort-column": _vm.sortColumn,
        "sort-type": _vm.sortType,
        "isSortableColumn": _vm.isSortableColumn,
        "getClasses": _vm.getClasses,
        "searchEnabled": _vm.searchEnabled
      },
      on: {
        "on-toggle-select-all": _vm.toggleSelectAll,
        "on-sort-change": _vm.sort,
        "filter-changed": _vm.filterRows
      },
      scopedSlots: _vm._u([{
        key: "table-column",
        fn: function fn(props) {
          return [_vm._t("table-column", [_c('span', [_vm._v(_vm._s(props.column.label))])], {
            column: props.column
          })];
        }
      }])
    }), _vm._v(" "), _vm._l(_vm.paginated, function (headerRow, index$$1) {
      return _c('tbody', {
        key: index$$1
      }, [_vm.groupHeaderOnTop ? _c('vgt-header-row', {
        attrs: {
          "header-row": headerRow,
          "columns": _vm.columns,
          "line-numbers": _vm.lineNumbers,
          "selectable": _vm.selectable,
          "collect-formatted": _vm.collectFormatted,
          "formatted-row": _vm.formattedRow,
          "get-classes": _vm.getClasses,
          "full-colspan": _vm.fullColspan
        },
        scopedSlots: _vm._u([{
          key: "table-header-row",
          fn: function fn(props) {
            return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
              column: props.column,
              formattedRow: props.formattedRow,
              row: props.row
            })] : undefined;
          }
        }])
      }) : _vm._e(), _vm._v(" "), _vm._l(headerRow.children, function (row, index$$1) {
        return _c('tr', {
          key: row.originalIndex,
          class: _vm.getRowStyleClass(row),
          on: {
            "mouseenter": function mouseenter($event) {
              _vm.onMouseenter(row, index$$1);
            },
            "mouseleave": function mouseleave($event) {
              _vm.onMouseleave(row, index$$1);
            },
            "dblclick": function dblclick($event) {
              _vm.onRowDoubleClicked(row, index$$1, $event);
            },
            "click": function click($event) {
              _vm.onRowClicked(row, index$$1, $event);
            }
          }
        }, [_vm.lineNumbers ? _c('th', {
          staticClass: "line-numbers"
        }, [_vm._v(" " + _vm._s(_vm.getCurrentIndex(index$$1)) + " ")]) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', {
          staticClass: "vgt-checkbox-col",
          on: {
            "click": function click($event) {
              $event.preventDefault();
              $event.stopPropagation();

              _vm.onCheckboxClicked(row, index$$1, $event);
            }
          }
        }, [_c('input', {
          attrs: {
            "type": "checkbox"
          },
          domProps: {
            "checked": row.vgtSelected
          }
        })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
          return !column.hidden && column.field ? _c('td', {
            key: i,
            class: _vm.getClasses(i, 'td', row),
            on: {
              "click": function click($event) {
                _vm.onCellClicked(row, column, index$$1, $event);
              }
            }
          }, [_vm._t("table-row", [!column.html ? _c('span', [_vm._v(" " + _vm._s(_vm.collectFormatted(row, column)) + " ")]) : _vm._e(), _vm._v(" "), column.html ? _c('span', {
            domProps: {
              "innerHTML": _vm._s(_vm.collect(row, column.field))
            }
          }) : _vm._e()], {
            row: row,
            column: column,
            formattedRow: _vm.formattedRow(row),
            index: index$$1
          })], 2) : _vm._e();
        })], 2);
      }), _vm._v(" "), _vm.groupHeaderOnBottom ? _c('vgt-header-row', {
        attrs: {
          "header-row": headerRow,
          "columns": _vm.columns,
          "line-numbers": _vm.lineNumbers,
          "selectable": _vm.selectable,
          "collect-formatted": _vm.collectFormatted,
          "formatted-row": _vm.formattedRow,
          "get-classes": _vm.getClasses,
          "full-colspan": _vm.fullColspan
        },
        scopedSlots: _vm._u([{
          key: "table-header-row",
          fn: function fn(props) {
            return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
              column: props.column,
              formattedRow: props.formattedRow,
              row: props.row
            })] : undefined;
          }
        }])
      }) : _vm._e()], 2);
    }), _vm._v(" "), _vm.showEmptySlot ? _c('tbody', [_c('tr', [_c('td', {
      attrs: {
        "colspan": _vm.fullColspan
      }
    }, [_vm._t("emptystate", [_c('div', {
      staticClass: "vgt-center-align vgt-text-disabled"
    }, [_vm._v(" No data for table ")])])], 2)])]) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
      staticClass: "vgt-wrap__actions-footer"
    }, [_vm._t("table-actions-bottom")], 2), _vm._v(" "), _vm.paginate && _vm.paginateOnBottom ? _vm._t("pagination-bottom", [_c('vgt-pagination', {
      ref: "paginationBottom",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })], {
      pageChanged: _vm.pageChanged,
      perPageChanged: _vm.perPageChanged,
      total: _vm.totalRows || _vm.totalRowCount
    }) : _vm._e()], 2)]);
  },
  staticRenderFns: [],
  name: 'vue-good-table',
  props: {
    isLoading: {
      default: false,
      type: Boolean
    },
    maxHeight: {
      default: null,
      type: String
    },
    fixedHeader: {
      default: false,
      type: Boolean
    },
    theme: {
      default: ''
    },
    mode: {
      default: 'local'
    },
    // could be remote
    totalRows: {},
    // required if mode = 'remote'
    styleClass: {
      default: 'vgt-table bordered'
    },
    columns: {},
    rows: {},
    lineNumbers: {
      default: false
    },
    responsive: {
      default: true
    },
    rtl: {
      default: false
    },
    rowStyleClass: {
      default: null,
      type: [Function, String]
    },
    groupOptions: {
      default: function _default() {
        return {
          enabled: false
        };
      }
    },
    selectOptions: {
      default: function _default() {
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
      default: function _default() {
        return {
          enabled: true,
          initialSortBy: {}
        };
      }
    },
    // pagination
    paginationOptions: {
      default: function _default() {
        return {
          enabled: false,
          perPage: 10,
          perPageDropdown: null,
          position: 'bottom',
          dropdownAllowAll: true,
          mode: 'records' // or pages

        };
      }
    },
    searchOptions: {
      default: function _default() {
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
  data: function data() {
    return {
      // loading state for remote mode
      tableLoading: false,
      // text options
      nextText: 'Next',
      prevText: 'Prev',
      rowsPerPageText: 'Rows per page',
      ofText: 'of',
      allText: 'All',
      pageText: 'page',
      // internal select options
      selectable: false,
      selectOnCheckboxOnly: false,
      selectAllByPage: true,
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
      searchSkipDiacritics: false,
      // internal pagination options
      perPage: null,
      paginate: false,
      paginateOnTop: false,
      paginateOnBottom: true,
      customRowsPerPageDropdown: [],
      paginateDropdownAllowAll: true,
      paginationMode: 'records',
      currentPage: 1,
      currentPerPage: 10,
      sortColumn: -1,
      sortType: 'asc',
      globalSearchTerm: '',
      filteredRows: [],
      columnFilters: {},
      forceSearch: false,
      sortChanged: false,
      dataTypes: dataTypes || {}
    };
  },
  watch: {
    rows: {
      handler: function handler() {
        this.tableLoading = false;
        this.filterRows(this.columnFilters, false);
      },
      deep: true,
      immediate: true
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
        if (this.searchOptions.externalQuery !== undefined && this.searchOptions.externalQuery !== this.searchTerm) {
          //* we need to set searchTerm to externalQuery first.
          this.externalSearchQuery = this.searchOptions.externalQuery;
          this.handleSearch();
        }

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
    },
    selectedRows: function selectedRows(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        this.$emit('on-selected-rows-change', {
          selectedRows: this.selectedRows
        });
      }
    }
  },
  computed: {
    wrapperStyles: function wrapperStyles() {
      return {
        overflow: 'scroll-y',
        maxHeight: this.maxHeight ? this.maxHeight : 'auto'
      };
    },
    hasHeaderRowTemplate: function hasHeaderRowTemplate() {
      return !!this.$slots['table-header-row'] || !!this.$scopedSlots['table-header-row'];
    },
    isTableLoading: function isTableLoading() {
      return this.isLoading || this.tableLoading;
    },
    showEmptySlot: function showEmptySlot() {
      if (!this.paginated.length) return true;
      if (this.paginated[0].label === 'no groups' && !this.paginated[0].children.length) return true;
      return false;
    },
    allSelected: function allSelected() {
      return this.selectedRowCount > 0 && (this.selectAllByPage && this.selectedPageRowsCount === this.totalPageRowCount || !this.selectAllByPage && this.selectedRowCount === this.totalRowCount);
    },
    allSelectedIndeterminate: function allSelectedIndeterminate() {
      return !this.allSelected && (this.selectAllByPage && this.selectedPageRowsCount > 0 || !this.selectAllByPage && this.selectedRowCount > 0);
    },
    selectionInfo: function selectionInfo() {
      return "".concat(this.selectedRowCount, " ").concat(this.selectionText);
    },
    selectedRowCount: function selectedRowCount() {
      return this.selectedRows.length;
    },
    selectedPageRowsCount: function selectedPageRowsCount() {
      return this.selectedPageRows.length;
    },
    selectedPageRows: function selectedPageRows() {
      var selectedRows = [];
      each(this.paginated, function (headerRow) {
        each(headerRow.children, function (row) {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows;
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
      return selectedRows.sort(function (r1, r2) {
        return r1.originalIndex - r2.originalIndex;
      });
    },
    fullColspan: function fullColspan() {
      var fullColspan = 0;

      for (var i = 0; i < this.columns.length; i += 1) {
        if (!this.columns[i].hidden) {
          fullColspan += 1;
        }
      }

      if (this.lineNumbers) fullColspan++;
      if (this.selectable) fullColspan++;
      return fullColspan;
    },
    groupHeaderOnTop: function groupHeaderOnTop() {
      if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === 'bottom') {
        return false;
      }

      if (this.groupOptions && this.groupOptions.enabled) return true; // will only get here if groupOptions is false

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
    totalPageRowCount: function totalPageRowCount() {
      var total = 0;
      each(this.paginated, function (headerRow) {
        total += headerRow.children ? headerRow.children.length : 0;
      });
      return total;
    },
    tableStyleClasses: function tableStyleClasses() {
      var classes = this.styleClass;
      classes += " ".concat(this.theme);
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
      var _this = this;

      // we only process rows when mode is local
      var computedRows = this.filteredRows;

      if (this.mode === 'remote') {
        return computedRows;
      } // take care of the global filter here also


      if (this.globalSearchAllowed) {
        // here also we need to de-construct and then
        // re-construct the rows.
        var allRows = [];
        each(this.filteredRows, function (headerRow) {
          allRows.push.apply(allRows, _toConsumableArray(headerRow.children));
        });
        var filteredRows = [];
        each(allRows, function (row) {
          each(_this.columns, function (col) {
            // if col does not have search disabled,
            if (!col.globalSearchDisabled) {
              // if a search function is provided,
              // use that for searching, otherwise,
              // use the default search behavior
              if (_this.searchFn) {
                var foundMatch = _this.searchFn(row, col, _this.collectFormatted(row, col), _this.searchTerm);

                if (foundMatch) {
                  filteredRows.push(row);
                  return false; // break the loop
                }
              } else {
                // comparison
                var matched = def.filterPredicate(_this.collectFormatted(row, col), _this.searchTerm, _this.searchSkipDiacritics);

                if (matched) {
                  filteredRows.push(row);
                  return false; // break loop
                }
              }
            }
          });
        }); // this is where we emit on search

        this.$emit('on-search', {
          searchTerm: this.searchTerm,
          rowCount: filteredRows.length
        }); // here we need to reconstruct the nested structure
        // of rows

        computedRows = [];
        each(this.filteredRows, function (headerRow) {
          var i = headerRow.vgt_header_id;
          var children = filter(filteredRows, ['vgt_id', i]);

          if (children.length) {
            var newHeaderRow = clone(headerRow);
            newHeaderRow.children = children;
            computedRows.push(newHeaderRow);
          }
        });
      } // taking care of sort here only if sort has changed


      if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) && ( // if search trigger is enter then we only sort
      // when enter is hit
      this.searchTrigger !== 'enter' || this.sortChanged)) {
        this.sortChanged = false;
        each(computedRows, function (cRows) {
          cRows.children.sort(function (x, y) {
            if (!_this.columns[_this.sortColumn]) return 0;

            var xvalue = _this.collect(x, _this.columns[_this.sortColumn].field);

            var yvalue = _this.collect(y, _this.columns[_this.sortColumn].field); // if user has provided a custom sort, use that instead of
            // built-in sort


            var sortFn = _this.columns[_this.sortColumn].sortFn;

            if (sortFn && typeof sortFn === 'function') {
              return sortFn(xvalue, yvalue, _this.columns[_this.sortColumn], x, y) * (_this.sortType === 'desc' ? -1 : 1);
            } // built in sort


            var typeDef = _this.typedColumns[_this.sortColumn].typeDef;
            return typeDef.compare(xvalue, yvalue, _this.columns[_this.sortColumn]) * (_this.sortType === 'desc' ? -1 : 1);
          });
        });
      } // if the filtering is event based, we need to maintain filter
      // rows


      if (this.searchTrigger === 'enter') {
        this.filteredRows = computedRows;
      }

      return computedRows;
    },
    paginated: function paginated() {
      if (!this.processedRows.length) return [];

      if (this.mode === 'remote') {
        return this.processedRows;
      } // for every group, extract the child rows
      // to cater to paging


      var paginatedRows = [];
      each(this.processedRows, function (childRows) {
        var _paginatedRows;

        (_paginatedRows = paginatedRows).push.apply(_paginatedRows, _toConsumableArray(childRows.children));
      });

      if (this.paginate) {
        var pageStart = (this.currentPage - 1) * this.currentPerPage; // in case of filtering we might be on a page that is
        // not relevant anymore
        // also, if setting to all, current page will not be valid

        if (pageStart >= paginatedRows.length || this.currentPerPage === -1) {
          this.currentPage = 1;
          pageStart = 0;
        } // calculate page end now


        var pageEnd = paginatedRows.length + 1; // if the setting is set to 'all'

        if (this.currentPerPage !== -1) {
          pageEnd = this.currentPage * this.currentPerPage;
        }

        paginatedRows = paginatedRows.slice(pageStart, pageEnd);
      } // reconstruct paginated rows here


      var reconstructedRows = [];
      each(this.processedRows, function (headerRow) {
        var i = headerRow.vgt_header_id;
        var children = filter(paginatedRows, ['vgt_id', i]);

        if (children.length) {
          var newHeaderRow = clone(headerRow);
          newHeaderRow.children = children;
          reconstructedRows.push(newHeaderRow);
        }
      });
      return reconstructedRows;
    },
    originalRows: function originalRows() {
      var rows = clone(this.rows);
      var nestedRows = [];

      if (!this.groupOptions.enabled) {
        nestedRows = this.handleGrouped([{
          label: 'no groups',
          children: rows
        }]);
      } else {
        nestedRows = this.handleGrouped(rows);
      } // we need to preserve the original index of
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
      var columns = assign(this.columns, []);

      for (var i = 0; i < this.columns.length; i++) {
        var column = columns[i];
        column.typeDef = this.dataTypes[column.type] || def;
      }

      return columns;
    },
    hasRowClickListener: function hasRowClickListener() {
      return this.$listeners && this.$listeners['on-row-click'];
    }
  },
  methods: {
    handleSearch: function handleSearch() {
      this.resetTable(); // for remote mode, we need to emit on-search

      if (this.mode === 'remote') {
        this.$emit('on-search', {
          searchTerm: this.searchTerm
        });
      }
    },
    reset: function reset() {
      this.initializeSort();
      this.changePage(1);
      this.$refs['table-header-primary'].reset(true);

      if (this.$refs['table-header-secondary']) {
        this.$refs['table-header-secondary'].reset(true);
      }
    },
    emitSelectedRows: function emitSelectedRows() {
      this.$emit('on-select-all', {
        selected: this.selectedRowCount === this.totalRowCount,
        selectedRows: this.selectedRows
      });
    },
    unselectAllInternal: function unselectAllInternal(forceAll) {
      var _this2 = this;

      var rows = this.selectAllByPage && !forceAll ? this.paginated : this.filteredRows;
      each(rows, function (headerRow, i) {
        each(headerRow.children, function (row, j) {
          _this2.$set(row, 'vgtSelected', false);
        });
      });
      this.emitSelectedRows();
    },
    toggleSelectAll: function toggleSelectAll() {
      var _this3 = this;

      if (this.allSelected) {
        this.unselectAllInternal();
        return;
      }

      var rows = this.selectAllByPage ? this.paginated : this.filteredRows;
      each(rows, function (headerRow) {
        each(headerRow.children, function (row) {
          _this3.$set(row, 'vgtSelected', true);
        });
      });
      this.emitSelectedRows();
    },
    changePage: function changePage(value) {
      if (this.paginationOptions.enabled) {
        var paginationWidget = this.$refs.paginationBottom;

        if (this.paginationOptions.position === 'top') {
          paginationWidget = this.$refs.paginationTop;
        }

        if (paginationWidget) {
          paginationWidget.currentPage = value; // we also need to set the currentPage
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
      this.currentPage = pagination.currentPage;
      var pageChangedEvent = this.pageChangedEvent();
      pageChangedEvent.prevPage = pagination.prevPage;
      this.$emit('on-page-change', pageChangedEvent);

      if (this.mode === 'remote') {
        this.tableLoading = true;
      }
    },
    perPageChanged: function perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
      var perPageChangedEvent = this.pageChangedEvent();
      this.$emit('on-per-page-change', perPageChangedEvent);

      if (this.mode === 'remote') {
        this.tableLoading = true;
      }
    },
    sort: function sort(index$$1) {
      if (!this.isSortableColumn(index$$1)) return;

      if (this.sortColumn === index$$1) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = 'asc';
        this.sortColumn = index$$1;
      }

      this.$emit('on-sort-change', {
        sortType: this.sortType,
        columnIndex: this.sortColumn
      }); // every time we change sort we need to reset to page 1

      this.changePage(1); // if the mode is remote, we don't need to do anything
      // after this. just set table loading to true

      if (this.mode === 'remote') {
        this.tableLoading = true;
        return;
      }

      this.sortChanged = true;
    },
    // checkbox click should always do the following
    onCheckboxClicked: function onCheckboxClicked(row, index$$1, event) {
      this.$set(row, 'vgtSelected', !row.vgtSelected);
      this.$emit('on-row-click', {
        row: row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onRowDoubleClicked: function onRowDoubleClicked(row, index$$1, event) {
      this.$emit('on-row-dblclick', {
        row: row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onRowClicked: function onRowClicked(row, index$$1, event) {
      if (this.selectable && !this.selectOnCheckboxOnly) {
        this.$set(row, 'vgtSelected', !row.vgtSelected);
      }

      this.$emit('on-row-click', {
        row: row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onCellClicked: function onCellClicked(row, column, rowIndex, event) {
      this.$emit('on-cell-click', {
        row: row,
        column: column,
        rowIndex: rowIndex,
        event: event
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
    searchTableOnEnter: function searchTableOnEnter() {
      if (this.searchTrigger === 'enter') {
        this.handleSearch(); // we reset the filteredRows here because
        // we want to search across everything.

        this.filteredRows = clone(this.originalRows);
        this.forceSearch = true;
        this.sortChanged = true;
      }
    },
    searchTableOnKeyUp: function searchTableOnKeyUp() {
      if (this.searchTrigger !== 'enter') {
        this.handleSearch();
      }
    },
    resetTable: function resetTable() {
      this.unselectAllInternal(true); // every time we searchTable

      this.changePage(1);
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
          if (typeof result === 'undefined' || result === null) {
            return undefined;
          }

          result = result[splitter[i]];
        }

        return result;
      }

      if (typeof field === 'function') return field(obj);
      if (typeof field === 'string') return dig(obj, field);
      return undefined;
    },
    collectFormatted: function collectFormatted(obj, column) {
      var headerRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var value;

      if (headerRow && column.headerField) {
        value = this.collect(obj, column.headerField);
      } else {
        value = this.collect(obj, column.field);
      }

      if (value === undefined) return ''; // if user has supplied custom formatter,
      // use that here

      if (column.formatFn && typeof column.formatFn === 'function') {
        return column.formatFn(value);
      } // lets format the resultant data


      var type = column.typeDef; // this will only happen if we try to collect formatted
      // before types have been initialized. for example: on
      // load when external query is specified.

      if (!type) {
        type = this.dataTypes[column.type] || def;
      }

      return type.format(value, column);
    },
    formattedRow: function formattedRow(row) {
      var isHeaderRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var formattedRow = {};

      for (var i = 0; i < this.typedColumns.length; i++) {
        var col = this.typedColumns[i]; // what happens if field is

        if (col.field) {
          formattedRow[col.field] = this.collectFormatted(row, col, isHeaderRow);
        }
      }

      return formattedRow;
    },
    // Check if a column is sortable.
    isSortableColumn: function isSortableColumn(index$$1) {
      var sortable = this.columns[index$$1].sortable;
      var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },
    // Get classes for the given column index & element.
    getClasses: function getClasses(index$$1, element, row) {
      var _this$typedColumns$in = this.typedColumns[index$$1],
          typeDef = _this$typedColumns$in.typeDef,
          custom = _this$typedColumns$in["".concat(element, "Class")];

      var isRight = typeDef.isRight;
      if (this.rtl) isRight = true;
      var classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight
      }; // for td we need to check if value is
      // a function.

      if (typeof custom === 'function') {
        classes[custom(row)] = true;
      } else if (typeof custom === 'string') {
        classes[custom] = true;
      }

      return classes;
    },
    // method to filter rows
    filterRows: function filterRows(columnFilters) {
      var _this4 = this;

      var fromFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // if (!this.rows.length) return;
      // this is invoked either as a result of changing filters
      // or as a result of modifying rows.
      this.columnFilters = columnFilters;
      var computedRows = clone(this.originalRows); // do we have a filter to care about?
      // if not we don't need to do anything

      if (this.columnFilters && Object.keys(this.columnFilters).length) {
        // every time we filter rows, we need to set current page
        // to 1
        // if the mode is remote, we only need to reset, if this is
        // being called from filter, not when rows are changing
        if (this.mode !== 'remote' || fromFilter) {
          this.changePage(1);
        } // we need to emit an event and that's that.
        // but this only needs to be invoked if filter is changing
        // not when row object is modified.


        if (fromFilter) {
          this.$emit('on-column-filter', {
            columnFilters: this.columnFilters
          });
        } // if mode is remote, we don't do any filtering here.


        if (this.mode === 'remote') {
          if (fromFilter) {
            this.tableLoading = true;
          } else {
            // if remote filtering has already been taken care of.
            this.filteredRows = computedRows;
          }

          return;
        }

        var _loop = function _loop(i) {
          var col = _this4.typedColumns[i];

          if (_this4.columnFilters[col.field]) {
            computedRows = each(computedRows, function (headerRow) {
              var newChildren = headerRow.children.filter(function (row) {
                // If column has a custom filter, use that.
                if (col.filterOptions && typeof col.filterOptions.filterFn === 'function') {
                  return col.filterOptions.filterFn(_this4.collect(row, col.field), _this4.columnFilters[col.field]);
                } // Otherwise Use default filters


                var typeDef = col.typeDef;
                return typeDef.filterPredicate(_this4.collect(row, col.field), _this4.columnFilters[col.field]);
              }); // should we remove the header?

              headerRow.children = newChildren;
            });
          }
        };

        for (var i = 0; i < this.typedColumns.length; i++) {
          _loop(i);
        }
      }

      this.filteredRows = computedRows;
    },
    getCurrentIndex: function getCurrentIndex(index$$1) {
      return (this.currentPage - 1) * this.currentPerPage + index$$1 + 1;
    },
    getRowStyleClass: function getRowStyleClass(row) {
      var classes = '';
      if (this.hasRowClickListener) classes += 'clickable';
      var rowStyleClasses;

      if (typeof this.rowStyleClass === 'function') {
        rowStyleClasses = this.rowStyleClass(row);
      } else {
        rowStyleClasses = this.rowStyleClass;
      }

      if (rowStyleClasses) {
        classes += " ".concat(rowStyleClasses);
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
    // handleRows() {
    //   if (!this.groupOptions.enabled) {
    //     this.filteredRows = this.handleGrouped([{
    //       label: 'no groups',
    //       children: this.originalRows,
    //     }]);
    //   } else {
    //     this.filteredRows = this.handleGrouped(this.originalRows);
    //   }
    // },
    handleDefaultSort: function handleDefaultSort() {
      for (var index$$1 = 0; index$$1 < this.columns.length; index$$1++) {
        var col = this.columns[index$$1];

        if (col.field === this.defaultSortBy.field) {
          this.sortColumn = index$$1;
          this.sortType = this.defaultSortBy.type || 'asc';
          this.sortChanged = true;
          break;
        }
      }
    },
    initializePagination: function initializePagination() {
      var _this5 = this;

      var _this$paginationOptio = this.paginationOptions,
          enabled = _this$paginationOptio.enabled,
          perPage = _this$paginationOptio.perPage,
          position = _this$paginationOptio.position,
          perPageDropdown = _this$paginationOptio.perPageDropdown,
          dropdownAllowAll = _this$paginationOptio.dropdownAllowAll,
          nextLabel = _this$paginationOptio.nextLabel,
          prevLabel = _this$paginationOptio.prevLabel,
          rowsPerPageLabel = _this$paginationOptio.rowsPerPageLabel,
          ofLabel = _this$paginationOptio.ofLabel,
          pageLabel = _this$paginationOptio.pageLabel,
          allLabel = _this$paginationOptio.allLabel,
          setCurrentPage = _this$paginationOptio.setCurrentPage,
          mode = _this$paginationOptio.mode;

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

      if (typeof mode === 'string') {
        this.paginationMode = mode;
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

      if (typeof pageLabel === 'string') {
        this.pageText = pageLabel;
      }

      if (typeof allLabel === 'string') {
        this.allText = allLabel;
      }

      if (typeof setCurrentPage === 'number') {
        setTimeout(function () {
          _this5.changePage(setCurrentPage);
        }, 500);
      }
    },
    initializeSearch: function initializeSearch() {
      var _this$searchOptions = this.searchOptions,
          enabled = _this$searchOptions.enabled,
          trigger = _this$searchOptions.trigger,
          externalQuery = _this$searchOptions.externalQuery,
          searchFn = _this$searchOptions.searchFn,
          placeholder = _this$searchOptions.placeholder,
          skipDiacritics = _this$searchOptions.skipDiacritics;

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

      if (typeof skipDiacritics === 'boolean') {
        this.searchSkipDiacritics = skipDiacritics;
      }
    },
    initializeSort: function initializeSort() {
      var _this$sortOptions = this.sortOptions,
          enabled = _this$sortOptions.enabled,
          initialSortBy = _this$sortOptions.initialSortBy;

      if (typeof enabled === 'boolean') {
        this.sortable = enabled;
      }

      if (_typeof(initialSortBy) === 'object') {
        this.defaultSortBy = initialSortBy;
        this.handleDefaultSort();
      }
    },
    initializeSelect: function initializeSelect() {
      var _this$selectOptions = this.selectOptions,
          enabled = _this$selectOptions.enabled,
          selectionInfoClass = _this$selectOptions.selectionInfoClass,
          selectionText = _this$selectOptions.selectionText,
          clearSelectionText = _this$selectOptions.clearSelectionText,
          selectOnCheckboxOnly = _this$selectOptions.selectOnCheckboxOnly,
          selectAllByPage = _this$selectOptions.selectAllByPage;

      if (typeof enabled === 'boolean') {
        this.selectable = enabled;
      }

      if (typeof selectOnCheckboxOnly === 'boolean') {
        this.selectOnCheckboxOnly = selectOnCheckboxOnly;
      }

      if (typeof selectAllByPage === 'boolean') {
        this.selectAllByPage = selectAllByPage;
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
    },
    initializeColumns: function initializeColumns() {
      // take care of default sort on mount
      if (this.defaultSortBy) {
        this.handleDefaultSort();
      }
    }
  },
  mounted: function mounted() {
    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }
  },
  components: {
    'vgt-pagination': VgtPagination,
    'vgt-global-search': VgtGlobalSearch,
    'vgt-header-row': VgtHeaderRow,
    'vgt-table-header': VgtTableHeader
  }
};

var VueGoodTablePlugin = {
  install: function install(Vue, options) {
    Vue.component(VueGoodTable.name, VueGoodTable);
  }
}; // Automatic installation if Vue has been added to the global scope.

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueGoodTablePlugin);
}

exports.default = VueGoodTablePlugin;
exports.VueGoodTable = VueGoodTable;
