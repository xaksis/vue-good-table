/**
 * vue-good-table v2.16.0
 * (c) 2018-present xaksis <shay@crayonbits.com>
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

import diacriticless from 'diacriticless';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import assign from 'lodash.assign';
import { format, parse, isValid, compareAsc } from 'date-fns';
import each from 'lodash.foreach';
import filter from 'lodash.filter';

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};

var def = {
  format: function format$$1(x) {
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

var VgtPaginationPageInfo = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"footer__navigation__page-info"},[_vm._v(" "+_vm._s(_vm.pageText)+" "),_c('input',{staticClass:"footer__navigation__page-info__current-entry",attrs:{"type":"text"},domProps:{"value":_vm.currentPage},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.stopPropagation();return _vm.changePage($event)}}}),_vm._v(" "+_vm._s(_vm.pageInfo)+" ")])},staticRenderFns: [],_scopeId: 'data-v-731a4dda',
  name: 'VgtPaginationPageInfo',
  props: {
    currentPage: {
      default: 1,
    },
    lastPage: {
      default: 1,
    },
    totalRecords: {
      default: 0,
    },
    ofText: {
      default: 'of',
      type: String,
    },
    pageText: {
      default: 'page',
      type: String,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    pageInfo() {
      return `${this.ofText} ${this.lastPage}`;
    },
  },
  methods: {
    changePage(event) {
      const value = parseInt(event.target.value, 10);

      //! invalid number
      if (Number.isNaN(value)
        || value > this.lastPage
        || value < 1) {
        event.target.value = this.currentPage > this.lastPage ? 1 : this.currentPage;
        return false;
      }

      //* valid number
      event.target.value = value;
      this.$emit('page-changed', value);
    },
  },
  mounted() {
  },
  components: {
  },
};

const DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50];

var VgtPagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vgt-wrap__footer vgt-clearfix"},[_c('div',{staticClass:"footer__row-count vgt-pull-left"},[_c('span',{staticClass:"footer__row-count__label"},[_vm._v(_vm._s(_vm.rowsPerPageText))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentPerPage),expression:"currentPerPage"}],staticClass:"footer__row-count__select",attrs:{"autocomplete":"off","name":"perPageSelect"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.currentPerPage=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.perPageChanged]}},[_vm._l((_vm.rowsPerPageOptions),function(option,idx){return _c('option',{key:'rows-dropdown-option-' + idx,domProps:{"value":option}},[_vm._v(" "+_vm._s(option)+" ")])}),_vm._v(" "),(_vm.paginateDropdownAllowAll)?_c('option',{domProps:{"value":_vm.total}},[_vm._v(_vm._s(_vm.allText))]):_vm._e()],2)]),_vm._v(" "),_c('div',{staticClass:"footer__navigation vgt-pull-right"},[_c('a',{staticClass:"footer__navigation__page-btn",class:{ disabled: !_vm.prevIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.previousPage($event)}}},[_c('span',{staticClass:"chevron",class:{ 'left': !_vm.rtl, 'right': _vm.rtl }}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.prevText))])]),_vm._v(" "),(_vm.mode === 'pages')?_c('pagination-page-info',{attrs:{"totalRecords":_vm.total,"lastPage":_vm.pagesCount,"currentPage":_vm.currentPage,"ofText":_vm.ofText,"pageText":_vm.pageText},on:{"page-changed":_vm.changePage}}):_c('div',{staticClass:"footer__navigation__info"},[_vm._v(_vm._s(_vm.paginatedInfo))]),_vm._v(" "),_c('a',{staticClass:"footer__navigation__page-btn",class:{ disabled: !_vm.nextIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.nextPage($event)}}},[_c('span',[_vm._v(_vm._s(_vm.nextText))]),_vm._v(" "),_c('span',{staticClass:"chevron",class:{ 'right': !_vm.rtl, 'left': _vm.rtl }})])],1)])},staticRenderFns: [],
  name: 'VgtPagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    customRowsPerPageDropdown: { default() { return []; } },
    paginateDropdownAllowAll: { default: true },
    mode: { default: 'records' },

    // text options
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    pageText: { default: 'page' },
    allText: { default: 'All' },
  },

  data: () => ({
    currentPage: 1,
    prevPage: 0,
    currentPerPage: 10,
    rowsPerPageOptions: [],
  }),

  watch: {
    perPage: {
      handler(newValue, oldValue) {
        this.handlePerPage();
        this.perPageChanged();
      },
      immediate: true,
    },

    customRowsPerPageDropdown() {
      this.handlePerPage();
    },
  },

  computed: {
    // Number of pages
    pagesCount() {
      const quotient = Math.floor(this.total / this.currentPerPage);
      const remainder = this.total % this.currentPerPage;

      return remainder === 0 ? quotient : quotient + 1;
    },

    // Current displayed items
    paginatedInfo() {
      let first = ((this.currentPage - 1) * this.currentPerPage) + 1;
      const last = Math.min(this.total, this.currentPage * this.currentPerPage);

      if(first > last) {
         first = 1;
      }

      if (last === 0) {
        first = 0;
      }

      return `${first} - ${last} ${this.ofText} ${this.total}`;
    },

    // Can go to next page
    nextIsPossible() {
      return this.currentPage < this.pagesCount;
    },

    // Can go to previous page
    prevIsPossible() {
      return this.currentPage > 1;
    },
  },

  methods: {
    // Change current page
    changePage(pageNumber, emit = true) {
      if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
        this.prevPage = this.currentPage;
        this.currentPage = pageNumber;
        if (emit) this.pageChanged();
      }
    },

    // Go to next page
    nextPage() {
      if (this.nextIsPossible) {
        this.prevPage = this.currentPage;
        ++this.currentPage;
        this.pageChanged();
      }
    },

    // Go to previous page
    previousPage() {
      if (this.prevIsPossible) {
        this.prevPage = this.currentPage;
        --this.currentPage;
        this.pageChanged();
      }
    },

    // Indicate page changing
    pageChanged() {
      this.$emit('page-changed', {
        currentPage: this.currentPage,
        prevPage: this.prevPage,
      });
    },

    // Indicate per page changing
    perPageChanged() {
      // go back to first page
      this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
      this.changePage(1, false);
    },

    // Handle per page changing
    handlePerPage() {
      //* if there's a custom dropdown then we use that
      if (this.customRowsPerPageDropdown !== null
        && (Array.isArray(this.customRowsPerPageDropdown)
        && this.customRowsPerPageDropdown.length !== 0)) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      } else {
        //* otherwise we use the default rows per page dropdown
        this.rowsPerPageOptions = cloneDeep(DEFAULT_ROWS_PER_PAGE_DROPDOWN);
      }

      if (this.perPage) {
        this.currentPerPage = this.perPage;
        // if perPage doesn't already exist, we add it
        let found = false;
        for (let i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this.rowsPerPageOptions[i] === this.perPage) {
            found = true;
          }
        }
        if (!found && this.perPage !== -1) {
          this.rowsPerPageOptions.unshift(this.perPage);
        }
      } else {
        // reset to default
        this.currentPerPage = 10;
      }
    },
  },

  mounted() {
  },

  components: {
    'pagination-page-info': VgtPaginationPageInfo,
  },
};

var VgtGlobalSearch = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showControlBar)?_c('div',{staticClass:"vgt-global-search vgt-clearfix"},[_c('div',{staticClass:"vgt-global-search__input vgt-pull-left"},[(_vm.searchEnabled)?_c('span',{staticClass:"input__icon"},[_c('div',{staticClass:"magnifying-glass"})]):_vm._e(),_vm._v(" "),(_vm.searchEnabled)?_c('input',{staticClass:"vgt-input vgt-pull-left",attrs:{"type":"text","placeholder":_vm.globalSearchPlaceholder},domProps:{"value":_vm.value},on:{"input":function($event){_vm.updateValue($event.target.value);},"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }_vm.entered($event.target.value);}}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"vgt-global-search__actions vgt-pull-right"},[_vm._t("internal-table-actions")],2)]):_vm._e()},staticRenderFns: [],
  name: 'VgtGlobalSearch',
  props: [
    'value',
    'searchEnabled',
    'globalSearchPlaceholder',
  ],
  data() {
    return {
      globalSearchTerm: null,
    };
  },
  computed: {
    showControlBar() {
      if (this.searchEnabled) return true;
      if (this.$slots && this.$slots['internal-table-actions']) return true;
      return false;
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
      this.$emit('on-keyup', value);
    },
    entered(value) {
      this.$emit('on-enter', value);
    },
  },
};

var VgtFilterRow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasFilterRow)?_c('tr',[(_vm.lineNumbers)?_c('th'):_vm._e(),_vm._v(" "),(_vm.selectable)?_c('th'):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:index,staticClass:"filter-th"},[(_vm.isFilterable(column))?_c('div',[(!_vm.isDropdown(column))?_c('input',{staticClass:"vgt-input",attrs:{"type":"text","placeholder":_vm.getPlaceholder(column)},domProps:{"value":_vm.columnFilters[column.field]},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }_vm.updateFiltersOnEnter(column, $event.target.value);},"input":function($event){_vm.updateFiltersOnKeyup(column, $event.target.value);}}}):_vm._e(),_vm._v(" "),(_vm.isDropdownArray(column))?_c('select',{staticClass:"vgt-select",domProps:{"value":_vm.columnFilters[column.field]},on:{"change":function($event){_vm.updateFilters(column, $event.target.value);}}},[_c('option',{key:"-1",attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions.filterDropdownItems),function(option,i){return _c('option',{key:i,domProps:{"value":option}},[_vm._v(" "+_vm._s(option)+" ")])})],2):_vm._e(),_vm._v(" "),(_vm.isDropdownObjects(column))?_c('select',{staticClass:"vgt-select",domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value, true);}}},[_c('option',{key:"-1",attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions.filterDropdownItems),function(option,i){return _c('option',{key:i,domProps:{"value":option.value}},[_vm._v(_vm._s(option.text))])})],2):_vm._e()]):_vm._e()]):_vm._e()})],2):_vm._e()},staticRenderFns: [],_scopeId: 'data-v-2949d74f',
  name: 'VgtFilterRow',
  props: [
    'lineNumbers',
    'columns',
    'typedColumns',
    'globalSearchEnabled',
    'selectable',
    'mode',
  ],
  watch: {
    columns: {
      handler(newValue, oldValue) {
        if (!isEqual(newValue, oldValue)) {
          this.populateInitialFilters();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      columnFilters: {},
      timer: null,
    };
  },
  computed: {
    // to create a filter row, we need to
    // make sure that there is atleast 1 column
    // that requires filtering
    hasFilterRow() {
      // if (this.mode === 'remote' || !this.globalSearchEnabled) {
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        if (col.filterOptions && col.filterOptions.enabled) {
          return true;
        }
      }
      // }
      return false;
    },
  },
  methods: {
    reset(emitEvent = false) {
      this.columnFilters = {};
      if (emitEvent) {
        this.$emit('filter-changed', this.columnFilters);
      }
    },

    isFilterable(column) {
      return column.filterOptions
        && column.filterOptions.enabled;
    },

    isDropdown(column) {
      return this.isFilterable(column)
        && column.filterOptions.filterDropdownItems
        && column.filterOptions.filterDropdownItems.length;
    },

    isDropdownObjects(column) {
      return this.isDropdown(column)
        && typeof column.filterOptions.filterDropdownItems[0] === 'object';
    },

    isDropdownArray(column) {
      return this.isDropdown(column)
        && typeof column.filterOptions.filterDropdownItems[0] !== 'object';
    },

    // get column's defined placeholder or default one
    getPlaceholder(column) {
      const placeholder = (this.isFilterable(column) && column.filterOptions.placeholder) || `Filter ${column.label}`;
      return placeholder;
    },

    updateFiltersOnEnter(column, value) {
      if (this.timer) clearTimeout(this.timer);
      this.updateFiltersImmediately(column, value);
    },

    updateFiltersOnKeyup(column, value) {
      // if the trigger is enter, we don't filter on keyup
      if (column.filterOptions.trigger === 'enter') return;
      this.updateFilters(column, value);
    },

    // since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters(column, value) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateFiltersImmediately(column, value);
      }, 400);
    },

    updateFiltersImmediately(column, value) {
      this.$set(this.columnFilters, column.field, value);
      this.$emit('filter-changed', this.columnFilters);
    },

    populateInitialFilters() {
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        // lets see if there are initial
        // filters supplied by user
        if (this.isFilterable(col)
          && typeof col.filterOptions.filterValue !== 'undefined'
          && col.filterOptions.filterValue !== null) {
          this.$set(this.columnFilters, col.field, col.filterOptions.filterValue);
          // this.updateFilters(col, col.filterOptions.filterValue);
          this.$set(col.filterOptions, 'filterValue', undefined);
        }
      }
      //* lets emit event once all filters are set
      this.$emit('filter-changed', this.columnFilters);
    },
  },
  mounted() {
  },
};

function getNextSort(currentSort) {
  if (currentSort === 'asc') return 'desc'; // if (currentSort === 'desc') return null;

  return 'asc';
}

function getIndex(sortArray, column) {
  for (var i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }

  return -1;
}

var primarySort = function (sortArray, column) {
  if (sortArray.length && sortArray.length === 1 && sortArray[0].field === column.field) {
    var type = getNextSort(sortArray[0].type);

    if (type) {
      sortArray[0].type = getNextSort(sortArray[0].type);
    } else {
      sortArray = [];
    }
  } else {
    sortArray = [{
      field: column.field,
      type: 'asc'
    }];
  }

  return sortArray;
};

var secondarySort = function (sortArray, column) {
  //* this means that primary sort exists, we're
  //* just adding a secondary sort
  var index = getIndex(sortArray, column);

  if (index === -1) {
    sortArray.push({
      field: column.field,
      type: 'asc'
    });
  } else {
    var type = getNextSort(sortArray[index].type);

    if (type) {
      sortArray[index].type = type;
    } else {
      sortArray.splice(index, 1);
    }
  }

  return sortArray;
};

var VgtTableHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"}):_vm._e(),_vm._v(" "),(_vm.selectable)?_c('th',{staticClass:"vgt-checkbox-col"},[(_vm.hasCheckboxTemplate)?_vm._t("table-checkbox-column",null,{checked:_vm.allSelected,indeterminate:_vm.allSelectedIndeterminate,toggle:_vm.toggleSelectAll}):_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":_vm.allSelected,"indeterminate":_vm.allSelectedIndeterminate},on:{"change":_vm.toggleSelectAll}})],2):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:index,class:_vm.getHeaderClasses(column, index),style:(_vm.columnStyles[index]),on:{"click":function($event){_vm.sort($event, column);}}},[_vm._t("table-column",[_c('span',[_vm._v(_vm._s(column.label))])],{column:column})],2):_vm._e()})],2),_vm._v(" "),_c("vgt-filter-row",{ref:"filter-row",tag:"tr",attrs:{"global-search-enabled":_vm.searchEnabled,"line-numbers":_vm.lineNumbers,"selectable":_vm.selectable,"columns":_vm.columns,"mode":_vm.mode,"typed-columns":_vm.typedColumns},on:{"filter-changed":_vm.filterRows}})])},staticRenderFns: [],_scopeId: 'data-v-0c8b4370',
  name: 'VgtTableHeader',
  props: {
    lineNumbers: {
      default: false,
      type: Boolean,
    },
    selectable: {
      default: false,
      type: Boolean,
    },
    allSelected: {
      default: false,
      type: Boolean,
    },
    allSelectedIndeterminate: {
      default: false,
      type: Boolean,
    },
    columns: {
      type: Array,
    },
    mode: {
      type: String,
    },
    typedColumns: {},

    //* Sort related
    sortable: {
      type: Boolean,
    },
    // sortColumn: {
    //   type: Number,
    // },
    // sortType: {
    //   type: String,
    // },

    // utility functions
    // isSortableColumn: {
    //   type: Function,
    // },
    getClasses: {
      type: Function,
    },

    //* search related
    searchEnabled: {
      type: Boolean,
    },

    tableRef: {},

    paginated: {},
  },
  watch: {
    tableRef: {
      handler() {
        this.setColumnStyles();
      },
      immediate: true,
    },
    paginated: {
      handler() {
        if (this.tableRef) {
          this.setColumnStyles();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      timer: null,
      checkBoxThStyle: {},
      lineNumberThStyle: {},
      columnStyles: [],
      sorts: [],
    };
  },
  computed: {
    hasCheckboxTemplate() {
      return !!this.$slots['table-checkbox-column']
        || !!this.$scopedSlots['table-checkbox-column'];
    },
  },
  methods: {
    reset() {
      this.$refs['filter-row'].reset(true);
    },
    toggleSelectAll() {
      this.$emit('on-toggle-select-all');
    },
    isSortableColumn(column) {
      const { sortable } = column;
      const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },
    sort(e, column) {
      //* if column is not sortable, return right here
      if (!this.isSortableColumn(column)) return;

      if (e.shiftKey) {
        this.sorts = secondarySort(this.sorts, column);
      } else {
        this.sorts = primarySort(this.sorts, column);
      }
      this.$emit('on-sort-change', this.sorts);
    },

    setInitialSort(sorts) {
      this.sorts = sorts;
      this.$emit('on-sort-change', this.sorts);
    },

    getColumnSort(column) {
      for (let i = 0; i < this.sorts.length; i += 1) {
        if (this.sorts[i].field === column.field) {
          return this.sorts[i].type || 'asc';
        }
      }
      return null;
    },

    getHeaderClasses(column, index) {
      const classes = assign({}, this.getClasses(index, 'th'), {
        'sorting sorting-desc': this.getColumnSort(column) === 'desc',
        'sorting sorting-asc': this.getColumnSort(column) === 'asc',
      });
      return classes;
    },

    filterRows(columnFilters) {
      this.$emit('filter-changed', columnFilters);
    },

    getWidthStyle(dom) {
      if (window && window.getComputedStyle) {
        const cellStyle = window.getComputedStyle(dom, null);
        return {
          width: cellStyle.width,
        };
      }
      return {
        width: 'auto',
      };
    },

    setColumnStyles() {
      const colStyles = [];
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        for (let i = 0; i < this.columns.length; i++) {
          if (this.tableRef) {
            let skip = 0;
            if (this.selectable) skip++;
            if (this.lineNumbers) skip++;
            const cell = this.tableRef.rows[0].cells[i + skip];
            colStyles.push(this.getWidthStyle(cell));
          } else {
            colStyles.push({
              width: this.columns[i].width ? this.columns[i].width : 'auto',
            });
          }
        }
        this.columnStyles = colStyles;
      }, 200);
    },

    getColumnStyle(column, index) {
      const styleObject = {
        width: column.width ? column.width : 'auto',
      };
      //* if fixed header we need to get width from original table
      if (this.tableRef) {
        if (this.selectable) index++;
        if (this.lineNumbers) index++;

        const cell = this.tableRef.rows[0].cells[index];
        const cellStyle = window.getComputedStyle(cell, null);
        styleObject.width = cellStyle.width;
      }
      return styleObject;
    },
  },
  mounted() {
    window.addEventListener('resize', this.setColumnStyles);
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
    window.removeEventListener('resize', this.setColumnStyles);
  },
  components: {
    'vgt-filter-row': VgtFilterRow,
  },
};

var VgtHeaderRow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[(_vm.headerRow.mode === 'span')?_c('th',{staticClass:"vgt-left-align vgt-row-header",attrs:{"colspan":_vm.fullColspan}},[_vm._t("table-header-row",[(_vm.headerRow.html)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.headerRow.label)}}):_c('span',[_vm._v(" "+_vm._s(_vm.headerRow.label)+" ")])],{row:_vm.headerRow})],2):_vm._e(),_vm._v(" "),(_vm.headerRow.mode !== 'span' && _vm.lineNumbers)?_c('th',{staticClass:"vgt-row-header"}):_vm._e(),_vm._v(" "),(_vm.headerRow.mode !== 'span' && _vm.selectable)?_c('th',{staticClass:"vgt-row-header"}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,i){return (_vm.headerRow.mode !== 'span' && !column.hidden)?_c('th',{key:i,staticClass:"vgt-row-header",class:_vm.getClasses(i, 'td')},[_vm._t("table-header-row",[(!column.html)?_c('span',[_vm._v(" "+_vm._s(_vm.collectFormatted(_vm.headerRow, column, true))+" ")]):_vm._e(),_vm._v(" "),(column.html)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.collectFormatted(_vm.headerRow, column, true))}}):_vm._e()],{row:_vm.headerRow,column:column,formattedRow:_vm.formattedRow(_vm.headerRow, true)})],2):_vm._e()})],2)},staticRenderFns: [],
  name: 'VgtHeaderRow',
  props: {
    headerRow: {
      type: Object,
    },
    columns: {
      type: Array,
    },
    lineNumbers: {
      type: Boolean,
    },
    selectable: {
      type: Boolean,
    },
    collectFormatted: {
      type: Function,
    },
    formattedRow: {
      type: Function,
    },
    getClasses: {
      type: Function,
    },
    fullColspan: {
      type: Number,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  components: {
  },
};

var date = cloneDeep(def);
date.isRight = true;

date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return parse("".concat(d), "".concat(column.dateInputFormat), new Date());
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
  if (v === undefined || v === null) return ''; // convert to date

  var date = parse(v, column.dateInputFormat, new Date());
  return format(date, column.dateOutputFormat);
};

var date$1 = /*#__PURE__*/Object.freeze({
  default: date
});

var number = cloneDeep(def);
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

var decimal = cloneDeep(number);

decimal.format = function (v) {
  if (v === undefined || v === null) return '';
  return parseFloat(Math.round(v * 100) / 100).toFixed(2);
};

var decimal$1 = /*#__PURE__*/Object.freeze({
  default: decimal
});

var percentage = cloneDeep(number);

percentage.format = function (v) {
  if (v === undefined || v === null) return '';
  return "".concat(parseFloat(v * 100).toFixed(2), "%");
};

var percentage$1 = /*#__PURE__*/Object.freeze({
  default: percentage
});

var boolean = cloneDeep(def);
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

const dataTypes = {};
const coreDataTypes = index;
each(Object.keys(coreDataTypes), (key) => {
  const compName = key.replace(/^\.\//, '').replace(/\.js/, '');
  dataTypes[compName] = coreDataTypes[key].default;
});

var VueGoodTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vgt-wrap",class:{ 'rtl': _vm.rtl, 'nocturnal': _vm.theme==='nocturnal', 'black-rhino': _vm.theme==='black-rhino', }},[(_vm.isTableLoading)?_c('div',{staticClass:"vgt-loading vgt-center-align"},[_vm._t("loadingContent",[_c('span',{staticClass:"vgt-loading__content"},[_vm._v(" Loading... ")])])],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"vgt-inner-wrap",class:{'is-loading': _vm.isTableLoading}},[(_vm.paginate && _vm.paginateOnTop)?_vm._t("pagination-top",[_c('vgt-pagination',{ref:"paginationTop",attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.totalRows || _vm.totalRowCount,"mode":_vm.paginationMode,"nextText":_vm.nextText,"prevText":_vm.prevText,"rowsPerPageText":_vm.rowsPerPageText,"customRowsPerPageDropdown":_vm.customRowsPerPageDropdown,"paginateDropdownAllowAll":_vm.paginateDropdownAllowAll,"ofText":_vm.ofText,"pageText":_vm.pageText,"allText":_vm.allText},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}})],{pageChanged:_vm.pageChanged,perPageChanged:_vm.perPageChanged,total:_vm.totalRows || _vm.totalRowCount}):_vm._e(),_vm._v(" "),_c('vgt-global-search',{attrs:{"search-enabled":_vm.searchEnabled && _vm.externalSearchQuery == null,"global-search-placeholder":_vm.searchPlaceholder},on:{"on-keyup":_vm.searchTableOnKeyUp,"on-enter":_vm.searchTableOnEnter},model:{value:(_vm.globalSearchTerm),callback:function ($$v) {_vm.globalSearchTerm=$$v;},expression:"globalSearchTerm"}},[_c('template',{slot:"internal-table-actions"},[_vm._t("table-actions")],2)],2),_vm._v(" "),(_vm.selectedRowCount)?_c('div',{staticClass:"vgt-selection-info-row clearfix",class:_vm.selectionInfoClass},[_vm._v(" "+_vm._s(_vm.selectionInfo)+" "),_c('a',{attrs:{"href":""},on:{"click":function($event){$event.preventDefault();_vm.unselectAllInternal(true);}}},[_vm._v(" "+_vm._s(_vm.clearSelectionText)+" ")]),_vm._v(" "),_c('div',{staticClass:"vgt-selection-info-row__actions vgt-pull-right"},[_vm._t("selected-row-actions")],2)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"vgt-fixed-header"},[(_vm.fixedHeader)?_c('table',{class:_vm.tableStyleClasses},[_c("vgt-table-header",{ref:"table-header-secondary",tag:"thead",attrs:{"columns":_vm.columns,"line-numbers":_vm.lineNumbers,"selectable":_vm.selectable,"all-selected":_vm.allSelected,"all-selected-indeterminate":_vm.allSelectedIndeterminate,"mode":_vm.mode,"sortable":_vm.sortable,"typed-columns":_vm.typedColumns,"getClasses":_vm.getClasses,"searchEnabled":_vm.searchEnabled,"paginated":_vm.paginated,"table-ref":_vm.$refs.table},on:{"on-toggle-select-all":_vm.toggleSelectAll,"on-sort-change":_vm.changeSort,"filter-changed":_vm.filterRows},scopedSlots:_vm._u([{key:"table-column",fn:function(props){return [_vm._t("table-column",[_c('span',[_vm._v(_vm._s(props.column.label))])],{column:props.column})]}}])})]):_vm._e()]),_vm._v(" "),_c('div',{class:{'vgt-responsive': _vm.responsive},style:(_vm.wrapperStyles)},[_c('table',{ref:"table",class:_vm.tableStyleClasses},[_c("vgt-table-header",{ref:"table-header-primary",tag:"thead",attrs:{"columns":_vm.columns,"line-numbers":_vm.lineNumbers,"selectable":_vm.selectable,"all-selected":_vm.allSelected,"all-selected-indeterminate":_vm.allSelectedIndeterminate,"mode":_vm.mode,"sortable":_vm.sortable,"typed-columns":_vm.typedColumns,"getClasses":_vm.getClasses,"searchEnabled":_vm.searchEnabled},on:{"on-toggle-select-all":_vm.toggleSelectAll,"on-sort-change":_vm.changeSort,"filter-changed":_vm.filterRows},scopedSlots:_vm._u([{key:"table-checkbox-column",fn:function(props){return _vm.selectable?[_vm._t("table-checkbox-column",null,{checked:props.checked,indeterminate:props.indeterminate,toggle:props.toggle})]:undefined}},{key:"table-column",fn:function(props){return [_vm._t("table-column",[_c('span',[_vm._v(_vm._s(props.column.label))])],{column:props.column})]}}])}),_vm._v(" "),_vm._l((_vm.paginated),function(headerRow,index$$1){return _c('tbody',{key:index$$1},[(_vm.groupHeaderOnTop)?_c('vgt-header-row',{attrs:{"header-row":headerRow,"columns":_vm.columns,"line-numbers":_vm.lineNumbers,"selectable":_vm.selectable,"collect-formatted":_vm.collectFormatted,"formatted-row":_vm.formattedRow,"get-classes":_vm.getClasses,"full-colspan":_vm.fullColspan},scopedSlots:_vm._u([{key:"table-header-row",fn:function(props){return _vm.hasHeaderRowTemplate?[_vm._t("table-header-row",null,{column:props.column,formattedRow:props.formattedRow,row:props.row})]:undefined}}])}):_vm._e(),_vm._v(" "),_vm._l((headerRow.children),function(row,index$$1){return _c('tr',{key:row.originalIndex,class:_vm.getRowStyleClass(row),on:{"mouseenter":function($event){_vm.onMouseenter(row, index$$1);},"mouseleave":function($event){_vm.onMouseleave(row, index$$1);},"dblclick":function($event){_vm.onRowDoubleClicked(row, index$$1, $event);},"click":function($event){_vm.onRowClicked(row, index$$1, $event);}}},[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"},[_vm._v(" "+_vm._s(_vm.getCurrentIndex(index$$1))+" ")]):_vm._e(),_vm._v(" "),(_vm.selectable)?_c('th',{staticClass:"vgt-checkbox-col",on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.onCheckboxClicked(row, index$$1, $event);}}},[(_vm.hasCheckboxRowTemplate)?_vm._t("table-checkbox-row",null,{column:row.column,formattedRow:row.formattedRow,row:row}):_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":row.vgtSelected}})],2):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,i){return (!column.hidden && column.field)?_c('td',{key:i,class:_vm.getClasses(i, 'td', row),on:{"click":function($event){_vm.onCellClicked(row, column, index$$1, $event);}}},[_vm._t("table-row",[(!column.html)?_c('span',[_vm._v(" "+_vm._s(_vm.collectFormatted(row, column))+" ")]):_vm._e(),_vm._v(" "),(column.html)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.collect(row, column.field))}}):_vm._e()],{row:row,column:column,formattedRow:_vm.formattedRow(row),index:index$$1})],2):_vm._e()})],2)}),_vm._v(" "),(_vm.groupHeaderOnBottom)?_c('vgt-header-row',{attrs:{"header-row":headerRow,"columns":_vm.columns,"line-numbers":_vm.lineNumbers,"selectable":_vm.selectable,"collect-formatted":_vm.collectFormatted,"formatted-row":_vm.formattedRow,"get-classes":_vm.getClasses,"full-colspan":_vm.fullColspan},scopedSlots:_vm._u([{key:"table-header-row",fn:function(props){return _vm.hasHeaderRowTemplate?[_vm._t("table-header-row",null,{column:props.column,formattedRow:props.formattedRow,row:props.row})]:undefined}}])}):_vm._e()],2)}),_vm._v(" "),(_vm.showEmptySlot)?_c('tbody',[_c('tr',[_c('td',{attrs:{"colspan":_vm.fullColspan}},[_vm._t("emptystate",[_c('div',{staticClass:"vgt-center-align vgt-text-disabled"},[_vm._v(" No data for table ")])])],2)])]):_vm._e()],2)]),_vm._v(" "),_c('div',{staticClass:"vgt-wrap__actions-footer"},[_vm._t("table-actions-bottom")],2),_vm._v(" "),(_vm.paginate && _vm.paginateOnBottom)?_vm._t("pagination-bottom",[_c('vgt-pagination',{ref:"paginationBottom",attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.totalRows || _vm.totalRowCount,"mode":_vm.paginationMode,"nextText":_vm.nextText,"prevText":_vm.prevText,"rowsPerPageText":_vm.rowsPerPageText,"customRowsPerPageDropdown":_vm.customRowsPerPageDropdown,"paginateDropdownAllowAll":_vm.paginateDropdownAllowAll,"ofText":_vm.ofText,"pageText":_vm.pageText,"allText":_vm.allText},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}})],{pageChanged:_vm.pageChanged,perPageChanged:_vm.perPageChanged,total:_vm.totalRows || _vm.totalRowCount}):_vm._e()],2)])},staticRenderFns: [],
  name: 'vue-good-table',
  props: {
    isLoading: { default: false, type: Boolean },
    maxHeight: { default: null, type: String },
    fixedHeader: { default: false, type: Boolean },
    theme: { default: '' },
    mode: { default: 'local' }, // could be remote
    totalRows: { }, // required if mode = 'remote'
    styleClass: { default: 'vgt-table bordered' },
    columns: { },
    rows: { },
    lineNumbers: { default: false },
    responsive: { default: true },
    rtl: { default: false },
    rowStyleClass: { default: null, type: [Function, String] },

    groupOptions: {
      default() {
        return {
          enabled: false,
        };
      },
    },

    selectOptions: {
      default() {
        return {
          enabled: false,
          selectionInfoClass: '',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
        };
      },
    },

    // sort
    sortOptions: {
      default() {
        return {
          enabled: true,
          initialSortBy: {},
        };
      },
    },

    // pagination
    paginationOptions: {
      default() {
        return {
          enabled: false,
          perPage: 10,
          perPageDropdown: null,
          position: 'bottom',
          dropdownAllowAll: true,
          mode: 'records', // or pages
        };
      },
    },

    searchOptions: {
      default() {
        return {
          enabled: false,
          trigger: null,
          externalQuery: null,
          searchFn: null,
          placeholder: 'Search Table',
        };
      },
    },
  },

  data: () => ({
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
    sorts: [],
    globalSearchTerm: '',
    filteredRows: [],
    columnFilters: {},
    forceSearch: false,
    sortChanged: false,
    dataTypes: dataTypes || {},
  }),

  watch: {
    rows: {
      handler() {
        this.tableLoading = false;
        this.filterRows(this.columnFilters, false);
      },
      deep: true,
      immediate: true,
    },

    selectOptions: {
      handler() {
        this.initializeSelect();
      },
      deep: true,
      immediate: true,
    },

    paginationOptions: {
      handler() {
        this.initializePagination();
      },
      deep: true,
      immediate: true,
    },

    searchOptions: {
      handler() {
        if (this.searchOptions.externalQuery !== undefined
          && this.searchOptions.externalQuery !== this.searchTerm) {
          //* we need to set searchTerm to externalQuery first.
          this.externalSearchQuery = this.searchOptions.externalQuery;
          this.handleSearch();
        }
        this.initializeSearch();
      },
      deep: true,
      immediate: true,
    },

    sortOptions: {
      handler(newValue, oldValue) {
        if (!isEqual(newValue, oldValue)) {
          this.initializeSort();
        }
      },
      deep: true,
    },

    selectedRows(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        this.$emit('on-selected-rows-change', {
          selectedRows: this.selectedRows,
        });
      }
    },
  },

  computed: {
    wrapperStyles() {
      return {
        overflow: 'scroll-y',
        maxHeight: this.maxHeight ? this.maxHeight : 'auto',
      };
    },

    hasHeaderRowTemplate() {
      return !!this.$slots['table-header-row']
        || !!this.$scopedSlots['table-header-row'];
    },
    hasCheckboxRowTemplate() {
      return !!this.$slots['table-checkbox-row']
        || !!this.$scopedSlots['table-checkbox-row'];
    },

    isTableLoading() {
      return this.isLoading || this.tableLoading;
    },

    showEmptySlot() {
      if (!this.paginated.length) return true;

      if (this.paginated[0].label === 'no groups'
        && !this.paginated[0].children.length) return true;

      return false;
    },

    allSelected() {
      return this.selectedRowCount > 0 &&
        ((this.selectAllByPage && this.selectedPageRowsCount === this.totalPageRowCount)
          || (!this.selectAllByPage && this.selectedRowCount === this.totalRowCount));
    },

    allSelectedIndeterminate() {
      return !this.allSelected &&
        ((this.selectAllByPage && this.selectedPageRowsCount > 0)
        || (!this.selectAllByPage && this.selectedRowCount > 0));
    },

    selectionInfo() {
      return `${this.selectedRowCount} ${this.selectionText}`;
    },

    selectedRowCount() {
      return this.selectedRows.length;
    },

    selectedPageRowsCount() {
      return this.selectedPageRows.length;
    },

    selectedPageRows() {
      const selectedRows = [];
      each(this.paginated, (headerRow) => {
        each(headerRow.children, (row) => {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows;
    },

    selectedRows() {
      const selectedRows = [];
      each(this.processedRows, (headerRow) => {
        each(headerRow.children, (row) => {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows.sort((r1, r2) => r1.originalIndex - r2.originalIndex);
    },

    fullColspan() {
      let fullColspan = 0;
      for (let i = 0; i < this.columns.length; i += 1) {
        if (!this.columns[i].hidden) {
          fullColspan += 1;
        }
      }
      if (this.lineNumbers) fullColspan++;
      if (this.selectable) fullColspan++;
      return fullColspan;
    },
    groupHeaderOnTop() {
      if (this.groupOptions
        && this.groupOptions.enabled
        && this.groupOptions.headerPosition
        && this.groupOptions.headerPosition === 'bottom') {
        return false;
      }
      if (this.groupOptions && this.groupOptions.enabled) return true;

      // will only get here if groupOptions is false
      return false;
    },
    groupHeaderOnBottom() {
      if (this.groupOptions
        && this.groupOptions.enabled
        && this.groupOptions.headerPosition
        && this.groupOptions.headerPosition === 'bottom') {
        return true;
      }
      return false;
    },
    totalRowCount() {
      let total = 0;
      each(this.processedRows, (headerRow) => {
        total += headerRow.children ? headerRow.children.length : 0;
      });
      return total;
    },
    totalPageRowCount() {
      let total = 0;
      each(this.paginated, (headerRow) => {
        total += headerRow.children ? headerRow.children.length : 0;
      });
      return total;
    },
    tableStyleClasses() {
      let classes = this.styleClass;
      classes += ` ${this.theme}`;
      return classes;
    },

    searchTerm() {
      return (this.externalSearchQuery != null) ? this.externalSearchQuery : this.globalSearchTerm;
    },

    //
    globalSearchAllowed() {
      if (this.searchEnabled
        && !!this.globalSearchTerm
        && this.searchTrigger !== 'enter') {
        return true;
      }

      if (this.externalSearchQuery != null
          && this.searchTrigger !== 'enter') {
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
    processedRows() {
      // we only process rows when mode is local
      let computedRows = this.filteredRows;
      if (this.mode === 'remote') {
        return computedRows;
      }

      // take care of the global filter here also
      if (this.globalSearchAllowed) {
        // here also we need to de-construct and then
        // re-construct the rows.
        const allRows = [];
        each(this.filteredRows, (headerRow) => {
          allRows.push(...headerRow.children);
        });
        const filteredRows = [];
        each(allRows, (row) => {
          each(this.columns, (col) => {
            // if col does not have search disabled,
            if (!col.globalSearchDisabled) {
              // if a search function is provided,
              // use that for searching, otherwise,
              // use the default search behavior
              if (this.searchFn) {
                const foundMatch = this.searchFn(
                  row,
                  col,
                  this.collectFormatted(row, col),
                  this.searchTerm
                );
                if (foundMatch) {
                  filteredRows.push(row);
                  return false; // break the loop
                }
              } else {
                // comparison
                const matched = def.filterPredicate(
                  this.collectFormatted(row, col),
                  this.searchTerm,
                  this.searchSkipDiacritics
                );
                if (matched) {
                  filteredRows.push(row);
                  return false; // break loop
                }
              }
            }
          });
        });

        // this is where we emit on search
        this.$emit('on-search', {
          searchTerm: this.searchTerm,
          rowCount: filteredRows.length,
        });

        // here we need to reconstruct the nested structure
        // of rows
        computedRows = [];
        each(this.filteredRows, (headerRow) => {
          const i = headerRow.vgt_header_id;
          const children = filter(filteredRows, ['vgt_id', i]);
          if (children.length) {
            const newHeaderRow = cloneDeep(headerRow);
            newHeaderRow.children = children;
            computedRows.push(newHeaderRow);
          }
        });
      }
      if (this.sorts.length) {
        //* we need to sort
        computedRows.forEach((cRows) => {
          cRows.children.sort((xRow, yRow) => {
            //* we need to get column for each sort
            let sortValue;
            for (let i = 0; i < this.sorts.length; i += 1) {
              const column = this.getColumnForField(this.sorts[i].field);
              const xvalue = this.collect(xRow, this.sorts[i].field);
              const yvalue = this.collect(yRow, this.sorts[i].field);

              //* if a custom sort function has been provided we use that
              const { sortFn } = column;
              if (sortFn && typeof sortFn === 'function') {
                sortValue = sortValue || sortFn(xvalue, yvalue, column, xRow, yRow)
                  * (this.sorts[i].type === 'desc' ? -1 : 1);
              }

              //* else we use our own sort
              sortValue = sortValue || column.typeDef.compare(xvalue, yvalue, column) * (this.sorts[i].type === 'desc' ? -1 : 1);
            }
            return sortValue;
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

    paginated() {
      if (!this.processedRows.length) return [];

      if (this.mode === 'remote') {
        return this.processedRows;
      }

      // for every group, extract the child rows
      // to cater to paging
      let paginatedRows = [];
      each(this.processedRows, (childRows) => {
        paginatedRows.push(...childRows.children);
      });

      if (this.paginate) {
        let pageStart = (this.currentPage - 1) * this.currentPerPage;

        // in case of filtering we might be on a page that is
        // not relevant anymore
        // also, if setting to all, current page will not be valid
        if (pageStart >= paginatedRows.length
          || this.currentPerPage === -1) {
          this.currentPage = 1;
          pageStart = 0;
        }

        // calculate page end now
        let pageEnd = paginatedRows.length + 1;

        // if the setting is set to 'all'
        if (this.currentPerPage !== -1) {
          pageEnd = this.currentPage * this.currentPerPage;
        }

        paginatedRows = paginatedRows.slice(pageStart, pageEnd);
      }
      // reconstruct paginated rows here
      const reconstructedRows = [];
      each(this.processedRows, (headerRow) => {
        const i = headerRow.vgt_header_id;
        const children = filter(paginatedRows, ['vgt_id', i]);
        if (children.length) {
          const newHeaderRow = cloneDeep(headerRow);
          newHeaderRow.children = children;
          reconstructedRows.push(newHeaderRow);
        }
      });
      return reconstructedRows;
    },

    originalRows() {
      const rows = cloneDeep(this.rows);
      let nestedRows = [];
      if (!this.groupOptions.enabled) {
        nestedRows = this.handleGrouped([{
          label: 'no groups',
          children: rows,
        }]);
      } else {
        nestedRows = this.handleGrouped(rows);
      }
      // we need to preserve the original index of
      // rows so lets do that
      let index$$1 = 0;
      each(nestedRows, (headerRow, i) => {
        each(headerRow.children, (row, j) => {
          row.originalIndex = index$$1++;
        });
      });

      return nestedRows;
    },

    typedColumns() {
      const columns = assign(this.columns, []);
      for (let i = 0; i < this.columns.length; i++) {
        const column = columns[i];
        column.typeDef = this.dataTypes[column.type] || def;
      }
      return columns;
    },

    hasRowClickListener() {
      return this.$listeners && this.$listeners['on-row-click'];
    },
  },

  methods: {
    getColumnForField(field) {
      for (let i = 0; i < this.typedColumns.length; i += 1) {
        if (this.typedColumns[i].field === field) return this.typedColumns[i];
      }
    },

    handleSearch() {
      this.resetTable();
      // for remote mode, we need to emit on-search
      if (this.mode === 'remote') {
        this.$emit('on-search', {
          searchTerm: this.searchTerm,
        });
      }
    },

    reset() {
      this.initializeSort();
      this.changePage(1);
      this.$refs['table-header-primary'].reset(true);
      if (this.$refs['table-header-secondary']) {
        this.$refs['table-header-secondary'].reset(true);
      }
    },

    emitSelectedRows() {
      this.$emit('on-select-all', {
        selected: this.selectedRowCount === this.totalRowCount,
        selectedRows: this.selectedRows,
      });
    },

    unselectAllInternal(forceAll) {
      const rows = this.selectAllByPage && !forceAll ? this.paginated : this.filteredRows;
      each(rows, (headerRow, i) => {
        each(headerRow.children, (row, j) => {
          this.$set(row, 'vgtSelected', false);
        });
      });
      this.emitSelectedRows();
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.unselectAllInternal();
        return;
      }
      const rows = this.selectAllByPage ? this.paginated : this.filteredRows;
      each(rows, (headerRow) => {
        each(headerRow.children, (row) => {
          this.$set(row, 'vgtSelected', true);
        });
      });
      this.emitSelectedRows();
    },

    changePage(value) {
      if (this.paginationOptions.enabled) {
        let paginationWidget = this.$refs.paginationBottom;
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

    pageChangedEvent() {
      return {
        currentPage: this.currentPage,
        currentPerPage: this.currentPerPage,
        total: Math.floor(this.totalRowCount / this.currentPerPage),
      };
    },

    pageChanged(pagination) {
      this.currentPage = pagination.currentPage;
      const pageChangedEvent = this.pageChangedEvent();
      pageChangedEvent.prevPage = pagination.prevPage;
      this.$emit('on-page-change', pageChangedEvent);
      if (this.mode === 'remote') {
        this.tableLoading = true;
      }
    },

    perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
      const perPageChangedEvent = this.pageChangedEvent();
      this.$emit('on-per-page-change', perPageChangedEvent);
      if (this.mode === 'remote') {
        this.tableLoading = true;
      }
    },

    changeSort(sorts) {
      this.sorts = sorts;
      this.$emit('on-sort-change', sorts);

      // every time we change sort we need to reset to page 1
      this.changePage(1);

      // if the mode is remote, we don't need to do anything
      // after this. just set table loading to true
      if (this.mode === 'remote') {
        this.tableLoading = true;
        return;
      }
      this.sortChanged = true;
    },

    // checkbox click should always do the following
    onCheckboxClicked(row, index$$1, event) {
      this.$set(row, 'vgtSelected', !row.vgtSelected);
      this.$emit('on-row-click', {
        row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event,
      });
    },

    onRowDoubleClicked(row, index$$1, event) {
      this.$emit('on-row-dblclick', {
        row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event,
      });
    },

    onRowClicked(row, index$$1, event) {
      if (this.selectable && !this.selectOnCheckboxOnly) {
        this.$set(row, 'vgtSelected', !row.vgtSelected);
      }
      this.$emit('on-row-click', {
        row,
        pageIndex: index$$1,
        selected: !!row.vgtSelected,
        event,
      });
    },

    onCellClicked(row, column, rowIndex, event) {
      this.$emit('on-cell-click', {
        row,
        column,
        rowIndex,
        event,
      });
    },

    onMouseenter(row, index$$1) {
      this.$emit('on-row-mouseenter', {
        row,
        pageIndex: index$$1,
      });
    },

    onMouseleave(row, index$$1) {
      this.$emit('on-row-mouseleave', {
        row,
        pageIndex: index$$1,
      });
    },

    searchTableOnEnter() {
      if (this.searchTrigger === 'enter') {
        this.handleSearch();
        // we reset the filteredRows here because
        // we want to search across everything.
        this.filteredRows = cloneDeep(this.originalRows);
        this.forceSearch = true;
        this.sortChanged = true;
      }
    },

    searchTableOnKeyUp() {
      if (this.searchTrigger !== 'enter') {
        this.handleSearch();
      }
    },

    resetTable() {
      this.unselectAllInternal(true);
      // every time we searchTable
      this.changePage(1);
    },

    // field can be:
    // 1. function
    // 2. regular property - ex: 'prop'
    // 3. nested property path - ex: 'nested.prop'
    collect(obj, field) {
      // utility function to get nested property
      function dig(obj, selector) {
        let result = obj;
        const splitter = selector.split('.');
        for (let i = 0; i < splitter.length; i++) {
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

    collectFormatted(obj, column, headerRow = false) {
      let value;
      if (headerRow && column.headerField) {
        value = this.collect(obj, column.headerField);
      } else {
        value = this.collect(obj, column.field);
      }
      if (value === undefined) return '';

      // if user has supplied custom formatter,
      // use that here
      if (column.formatFn && typeof column.formatFn === 'function') {
        return column.formatFn(value);
      }

      // lets format the resultant data
      let type = column.typeDef;
      // this will only happen if we try to collect formatted
      // before types have been initialized. for example: on
      // load when external query is specified.
      if (!type) {
        type = this.dataTypes[column.type] || def;
      }
      return type.format(value, column);
    },

    formattedRow(row, isHeaderRow = false) {
      const formattedRow = {};
      for (let i = 0; i < this.typedColumns.length; i++) {
        const col = this.typedColumns[i];
        // what happens if field is
        if (col.field) {
          formattedRow[col.field] = this.collectFormatted(row, col, isHeaderRow);
        }
      }
      return formattedRow;
    },

    // Check if a column is sortable.
    isSortableColumn(index$$1) {
      const { sortable } = this.columns[index$$1];
      const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },

    // Get classes for the given column index & element.
    getClasses(index$$1, element, row) {
      const { typeDef, [`${element}Class`]: custom } = this.typedColumns[index$$1];
      let { isRight } = typeDef;
      if (this.rtl) isRight = true;

      const classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight,
      };

      // for td we need to check if value is
      // a function.
      if (typeof custom === 'function') {
        classes[custom(row)] = true;
      } else if (typeof custom === 'string') {
        classes[custom] = true;
      }
      return classes;
    },

    // method to filter rows
    filterRows(columnFilters, fromFilter = true) {
      // if (!this.rows.length) return;
      // this is invoked either as a result of changing filters
      // or as a result of modifying rows.
      this.columnFilters = columnFilters;
      let computedRows = cloneDeep(this.originalRows);

      // do we have a filter to care about?
      // if not we don't need to do anything
      if (this.columnFilters && Object.keys(this.columnFilters).length) {
        // every time we filter rows, we need to set current page
        // to 1
        // if the mode is remote, we only need to reset, if this is
        // being called from filter, not when rows are changing
        if (this.mode !== 'remote' || fromFilter) {
          this.changePage(1);
        }
        // we need to emit an event and that's that.
        // but this only needs to be invoked if filter is changing
        // not when row object is modified.
        if (fromFilter) {
          this.$emit('on-column-filter', {
            columnFilters: this.columnFilters,
          });
        }

        // if mode is remote, we don't do any filtering here.
        if (this.mode === 'remote') {
          if (fromFilter) {
            this.tableLoading = true;
          } else {
            // if remote filtering has already been taken care of.
            this.filteredRows = computedRows;
          }
          return;
        }

        for (let i = 0; i < this.typedColumns.length; i++) {
          const col = this.typedColumns[i];
          if (this.columnFilters[col.field]) {
            computedRows = each(computedRows, (headerRow) => {
              const newChildren = headerRow.children.filter((row) => {
                // If column has a custom filter, use that.
                if (col.filterOptions
                  && typeof col.filterOptions.filterFn === 'function') {
                  return col.filterOptions.filterFn(
                    this.collect(row, col.field),
                    this.columnFilters[col.field]
                  );
                }
                // Otherwise Use default filters
                const { typeDef } = col;
                return typeDef.filterPredicate(
                  this.collect(row, col.field),
                  this.columnFilters[col.field]
                );
              });
              // should we remove the header?
              headerRow.children = newChildren;
            });
          }
        }
      }
      this.filteredRows = computedRows;
    },

    getCurrentIndex(index$$1) {
      return ((this.currentPage - 1) * this.currentPerPage) + index$$1 + 1;
    },

    getRowStyleClass(row) {
      let classes = '';
      if (this.hasRowClickListener) classes += 'clickable';
      let rowStyleClasses;
      if (typeof this.rowStyleClass === 'function') {
        rowStyleClasses = this.rowStyleClass(row);
      } else {
        rowStyleClasses = this.rowStyleClass;
      }
      if (rowStyleClasses) {
        classes += ` ${rowStyleClasses}`;
      }
      return classes;
    },

    handleGrouped(originalRows) {
      each(originalRows, (headerRow, i) => {
        headerRow.vgt_header_id = i;
        each(headerRow.children, (childRow) => {
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

    // TODO: remove for sort
    // handleDefaultSort() {
    //   for (let index = 0; index < this.columns.length; index++) {
    //     const col = this.columns[index];
    //     if (col.field === this.defaultSortBy.field) {
    //       this.sortColumn = index;
    //       this.sortType = this.defaultSortBy.type || 'asc';
    //       this.sortChanged = true;
    //       break;
    //     }
    //   }
    // },

    initializePagination() {
      const {
        enabled,
        perPage,
        position,
        perPageDropdown,
        dropdownAllowAll,
        nextLabel,
        prevLabel,
        rowsPerPageLabel,
        ofLabel,
        pageLabel,
        allLabel,
        setCurrentPage,
        mode,
      } = this.paginationOptions;

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
        setTimeout(() => {
          this.changePage(setCurrentPage);
        }, 500);
      }
    },

    initializeSearch() {
      const {
        enabled,
        trigger,
        externalQuery,
        searchFn,
        placeholder,
        skipDiacritics,
      } = this.searchOptions;

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

    initializeSort() {
      const { enabled, initialSortBy } = this.sortOptions;

      if (typeof enabled === 'boolean') {
        this.sortable = enabled;
      }

      //* initialSortBy can be an array or an object
      if (typeof initialSortBy === 'object') {
        const ref = this.fixedHeader ? this.$refs['table-header-secondary'] : this.$refs['table-header-primary'];
        if (Array.isArray(initialSortBy)) {
          ref.setInitialSort(initialSortBy);
        } else {
          const hasField = Object.prototype.hasOwnProperty.call(initialSortBy, 'field');
          if (hasField) ref.setInitialSort([initialSortBy]);
        }
      }
    },

    initializeSelect() {
      const {
        enabled,
        selectionInfoClass,
        selectionText,
        clearSelectionText,
        selectOnCheckboxOnly,
        selectAllByPage,
      } = this.selectOptions;

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

    // initializeColumns() {
    //   // take care of default sort on mount
    //   if (this.defaultSortBy) {
    //     this.handleDefaultSort();
    //   }
    // },
  },

  mounted() {
    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }
    this.initializeSort();
  },

  components: {
    'vgt-pagination': VgtPagination,
    'vgt-global-search': VgtGlobalSearch,
    'vgt-header-row': VgtHeaderRow,
    'vgt-table-header': VgtTableHeader,
  },
};

var VueGoodTablePlugin = {
  install: function install(Vue, options) {
    Vue.component(VueGoodTable.name, VueGoodTable);
  }
}; // Automatic installation if Vue has been added to the global scope.

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueGoodTablePlugin);
}

export default VueGoodTablePlugin;
export { VueGoodTable };
