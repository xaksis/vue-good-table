/**
 * vue-good-table v1.16.0
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var esm = require('date-fns/esm');

var VueGoodPagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"table-footer clearfix"},[_c('div',{staticClass:"datatable-length pull-left"},[_c('label',[_c('span',[_vm._v(_vm._s(_vm.rowsPerPageText))]),_vm._v(" "),_c('select',{staticClass:"browser-default",on:{"change":_vm.perPageChanged}},[(_vm.perPage)?_c('option',{domProps:{"value":_vm.perPage}},[_vm._v(_vm._s(_vm.perPage))]):_vm._e(),_vm._v(" "),_c('option',{attrs:{"value":"10"}},[_vm._v("10")]),_vm._v(" "),_c('option',{attrs:{"value":"20"}},[_vm._v("20")]),_vm._v(" "),_c('option',{attrs:{"value":"30"}},[_vm._v("30")]),_vm._v(" "),_c('option',{attrs:{"value":"40"}},[_vm._v("40")]),_vm._v(" "),_c('option',{attrs:{"value":"50"}},[_vm._v("50")]),_vm._v(" "),_c('option',{attrs:{"value":"-1"}},[_vm._v(_vm._s(_vm.allText))])])])]),_vm._v(" "),_c('div',{staticClass:"pagination-controls pull-right"},[_c('a',{staticClass:"page-btn",class:{ disabled: !_vm.prevIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.previousPage($event);}}},[_c('span',{staticClass:"chevron",class:{ 'left': !_vm.rtl, 'right': _vm.rtl }}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.prevText))])]),_vm._v(" "),_c('div',{staticClass:"info"},[_vm._v(_vm._s(_vm.paginatedInfo))]),_vm._v(" "),_c('a',{staticClass:"page-btn",class:{ disabled: !_vm.nextIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.nextPage($event);}}},[_c('span',[_vm._v(_vm._s(_vm.nextText))]),_vm._v(" "),_c('span',{staticClass:"chevron",class:{ 'right': !_vm.rtl, 'left': _vm.rtl }})])])])},staticRenderFns: [],_scopeId: 'data-v-849a166c',
  name: 'vue-good-pagination',
  props: {
    styleClass: {default: 'table table-bordered'},
    total: {default: null},
    perPage: {},
    rtl: {default: false},

    // text options
    nextText: {default: 'Next'},
    prevText: {default: 'Prev'},
    rowsPerPageText: {default: 'Rows per page:'},
    ofText: {default: 'of'},
    allText: {default: 'All'}
  },

  data: function () { return ({
    currentPage: 1,
    currentPerPage: 10
  }); },

  methods: {

    nextPage: function nextPage() {
      if(this.currentPerPage === -1) { return; }
      if (this.nextIsPossible)
        { ++this.currentPage; }
      this.pageChanged();
    },

    previousPage: function previousPage() {
      if (this.currentPage > 1)
        { --this.currentPage; }
      this.pageChanged();
    },

    pageChanged: function pageChanged() {
      this.$emit('page-changed', {currentPage: this.currentPage});
    },

    perPageChanged: function perPageChanged(event) {
      if (event) {
        this.currentPerPage = parseInt(event.target.value);
      }
      this.$emit('per-page-changed', {currentPerPage: this.currentPerPage});
    }

  },

  watch: {
    perPage: function perPage() {
      if (this.perPage) {
        this.currentPerPage = this.perPage;
      }else{
        //reset to default
        this.currentPerPage = 10;
      }
      this.perPageChanged();
    }

  },

  computed: {
    paginatedInfo: function paginatedInfo() {
      if (this.currentPerPage === -1) {
        return ("1 - " + (this.total) + " " + (this.ofText) + " " + (this.total));
      }
      var first = (this.currentPage - 1) * this.currentPerPage ? (this.currentPage - 1) * this.currentPerPage : 1;
      var last = Math.min(this.total, this.currentPerPage * this.currentPage);
      return (first + " - " + last + " " + (this.ofText) + " " + (this.total));
    },
    nextIsPossible: function nextIsPossible() {
      return (this.total > this.currentPerPage * this.currentPage);
    },
    prevIsPossible: function prevIsPossible() {
      return this.currentPage > 1;
    }
  },

  mounted: function mounted() {
    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }
  }
};

var GoodTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"good-table",class:{'rtl': _vm.rtl}},[_c('div',{class:{'responsive': _vm.responsive}},[(_vm.title)?_c('div',{staticClass:"table-header clearfix"},[_c('h2',{staticClass:"table-title pull-left"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"actions pull-right"})]):_vm._e(),_vm._v(" "),(_vm.paginate && _vm.paginateOnTop)?_c('vue-good-pagination',{attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.processedRows.length},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}}):_vm._e(),_vm._v(" "),_c('table',{ref:"table",class:_vm.styleClass},[_c('thead',[(_vm.globalSearch && _vm.externalSearchQuery == null)?_c('tr',[_c('td',{attrs:{"colspan":_vm.lineNumbers ? _vm.columns.length + 1: _vm.columns.length}},[_c('div',{staticClass:"global-search"},[_vm._m(0,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.globalSearchTerm),expression:"globalSearchTerm"}],staticClass:"form-control global-search-input",attrs:{"type":"text","placeholder":_vm.globalSearchPlaceholder},domProps:{"value":(_vm.globalSearchTerm)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.searchTable();},"input":function($event){if($event.target.composing){ return; }_vm.globalSearchTerm=$event.target.value;}}})])])]):_vm._e(),_vm._v(" "),_c('tr',[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:column.field,class:_vm.getHeaderClasses(column, index),style:({width: column.width ? column.width : 'auto'}),on:{"click":function($event){_vm.sort(index);}}},[_vm._t("table-column",[_c('span',[_vm._v(_vm._s(column.label))])],{column:column})],2):_vm._e()}),_vm._v(" "),_vm._t("thead-tr")],2),_vm._v(" "),(_vm.hasFilterRow)?_c('tr',[(_vm.lineNumbers)?_c('th'):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:column.field},[(column.filterable)?_c('div',{class:_vm.getHeaderClasses(column, index)},[(!column.filterDropdown)?_c('input',{attrs:{"type":"text","placeholder":_vm.getPlaceholder(column)},domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value);}}}):_vm._e(),_vm._v(" "),(column.filterDropdown && typeof(column.filterOptions[0]) !== 'object')?_c('select',{domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value);}}},[_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions),function(option){return _c('option',{key:option,domProps:{"value":option}},[_vm._v(" "+_vm._s(option)+" ")])})],2):_vm._e(),_vm._v(" "),(column.filterDropdown && typeof(column.filterOptions[0]) === 'object')?_c('select',{domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value);}}},[_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions),function(option){return _c('option',{key:option,domProps:{"value":option.value}},[_vm._v(_vm._s(option.text))])})],2):_vm._e()]):_vm._e()]):_vm._e()})],2):_vm._e()]),_vm._v(" "),_c('tbody',[_vm._l((_vm.paginated),function(row,index){return _c('tr',{key:index,class:_vm.getRowStyleClass(row),on:{"click":function($event){_vm.click(row, index);}}},[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"},[_vm._v(_vm._s(_vm.getCurrentIndex(index)))]):_vm._e(),_vm._v(" "),_vm._t("table-row-before",null,{row:row,index:index}),_vm._v(" "),_vm._t("table-row",_vm._l((_vm.columns),function(column,i){return (!column.hidden && column.field)?_c('td',{key:column.field,class:_vm.getClasses(i, 'td')},[(!column.html)?_c('span',[_vm._v(_vm._s(_vm.collectFormatted(row, column)))]):_vm._e(),_vm._v(" "),(column.html)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.collect(row, column.field))}}):_vm._e()]):_vm._e()}),{row:row,formattedRow:_vm.formattedRow(row),index:index}),_vm._v(" "),_vm._t("table-row-after",null,{row:row,index:index})],2)}),_vm._v(" "),(_vm.processedRows.length === 0)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columns.length}},[_vm._t("emptystate",[_c('div',{staticClass:"center-align text-disabled"},[_vm._v(" No data for table. ")])])],2)]):_vm._e()],2)]),_vm._v(" "),(_vm.paginate && !_vm.paginateOnTop)?_c('vue-good-pagination',{attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.processedRows.length},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}}):_vm._e()],1)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"global-search-icon"},[_c('img',{attrs:{"src":"../images/search_icon.png","alt":"Search Icon"}})])}],_scopeId: 'data-v-783f90ce',
  name: 'vue-good-table',
  components: {
    VueGoodPagination: VueGoodPagination
  },
  props: {
    styleClass: {default: 'table table-bordered'},
    title: '',
    columns: {},
    rows: {},
    onClick: {},
    perPage: {},
    sortable: {default: true},
    paginate: {default: false},
    paginateOnTop: {default: false},
    lineNumbers: {default: false},
    defaultSortBy: {default: null},
    responsive: {default: true},
    rtl: {default: false},
    rowStyleClass: {default: null, type: [Function, String]},

    // search
    globalSearch: {default: false},
    searchTrigger: {default: null},
    externalSearchQuery: {default: null},

    // text options
    globalSearchPlaceholder: {default: 'Search Table'}
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
  }); },

  methods: {

    pageChanged: function pageChanged(pagination) {
      this.currentPage = pagination.currentPage;
      this.$emit('pageChanged', {currentPage: this.currentPage, total: Math.floor(this.rows.length / this.currentPerPage)});
    },

    perPageChanged: function perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
    },

    sort: function sort(index) {
      if (!this.isSortableColumn(index))
        { return; }
      if (this.sortColumn === index) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = 'asc';
        this.sortColumn = index;
      }
      this.sortChanged = true;
    },

    click: function click(row, index) {
      if (this.onClick)
        { this.onClick(row, index); }
    },

    searchTable: function searchTable() {
      if(this.searchTrigger == 'enter') {
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
        for (var i = 0; i < splitter.length; i++)
          { if (typeof(result) === 'undefined')
            { return undefined; }
          else
            { result = result[splitter[i]]; } }
        return result;
      }

      if (typeof(field) === 'function')
        { return field(obj); }
      else if (typeof(field) === 'string')
        { return dig(obj, field); }
      else
        { return undefined; }
    },

    collectFormatted: function collectFormatted(obj, column) {
      //helper functions within collect
      function formatDecimal(v) {
        return parseFloat(Math.round(v * 100) / 100).toFixed(2);
      }

      function formatPercent(v) {
        return parseFloat(v * 100).toFixed(2) + '%';
      }

      function formatDate(v) {
        // convert to date
        return esm.format(esm.parse(v, column.inputFormat, new Date()), column.outputFormat);
      }

      var value = this.collect(obj, column.field);

      if (value === undefined) { return ''; }
      //lets format the resultant data
      switch(column.type) {
        case 'decimal':
          return formatDecimal(value);
        case 'percentage':
          return formatPercent(value);
        case 'date':
          return formatDate(value);
        default:
          return value;
      }
    },

    formattedRow: function formattedRow(row) {
      var this$1 = this;

      var formattedRow = {};
      for (var i = 0, list = this$1.columns; i < list.length; i += 1) {
        var col = list[i];

        if (col.field) {
          formattedRow[col.field] = this$1.collectFormatted(row, col);
        }
      }
      return formattedRow;
    },

    //Check if a column is sortable.
    isSortableColumn: function isSortableColumn(index) {
      var sortable = this.columns[index].sortable;
      var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },

    //Get classes for the given header column.
    getHeaderClasses: function getHeaderClasses(column, index) {
      var isSortable = this.isSortableColumn(index);
      var classes = Object.assign({}, this.getClasses(index, 'th'), {
        'sorting': isSortable,
        'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
        'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc',
      });
      return classes;
    },

    //Get classes for the given column index & element.
    getClasses: function getClasses(index, element) {
      var ref = this.columns[index];
      var type = ref.type;
      var custom = ref[element + 'Class'];
      var isRight = ['number', 'percentage', 'decimal', 'date'].includes(type);
      if (this.rtl) { isRight = true; }
      var classes = {
        'right-align': isRight,
        'left-align': !isRight
      };
      classes[custom] = !!custom;
      return classes;
    },

    //since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters: function updateFilters(column, value) {
      var _this = this;
      if (this.timer) { clearTimeout(this.timer); }
      this.timer = setTimeout(function(){
        _this.$set(_this.columnFilters, column.field, value);
      }, 400);

    },

    //method to filter rows
    filterRows: function filterRows() {
      var this$1 = this;

      var computedRows = JSON.parse(JSON.stringify(this.rows));
      // we need to preserve the original index of rows so lets do that
      for(var i = 0, list = computedRows.entries(); i < list.length; i += 1) {
        var ref = list[i];
        var index = ref[0];
        var row = ref[1];

        row.originalIndex = index;
      }

      if(this.hasFilterRow) {
        for (var i$1 = 0, list$1 = this$1.columns; i$1 < list$1.length; i$1 += 1){
          var col = list$1[i$1];

          if (col.filterable && this$1.columnFilters[col.field]) {
            computedRows = computedRows.filter(function (row) {

              // If column has a custom filter, use that.

              if (col.filter) {
                  return col.filter(this$1.collect(row, col.field), this$1.columnFilters[col.field])
              }

              // Use default filters

              switch(col.type) {
                case 'number':
                case 'percentage':
                case 'decimal':
                  //in case of numeric value we need to do an exact
                  //match for now`
                  return this$1.collect(row, col.field) == this$1.columnFilters[col.field];
                default:
                  //text value lets test starts with
                  return this$1.collect(row, col.field)
                    .toLowerCase()
                    .startsWith(
                      (this$1.columnFilters[col.field]).toLowerCase()
                    );
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
      return placeholder
    },

    getCurrentIndex: function getCurrentIndex(index) {
      return (this.currentPage - 1) * this.currentPerPage + index + 1;
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
    }
  },

  watch: {
    columnFilters: {
        handler: function(newObj){
          this.filterRows();
        },
        deep: true
    },
    rows: {
      handler: function(newObj){
        this.filterRows();
      },
      deep: true
    }

  },

  computed: {

    searchTerm: function searchTerm(){
      return (this.externalSearchQuery != null) ? this.externalSearchQuery : this.globalSearchTerm;
    },

    //
    globalSearchAllowed: function globalSearchAllowed() {
      if (this.globalSearch
        && !!this.globalSearchTerm
        && this.searchTrigger != 'enter'){
        return true;
      }

      if (this.externalSearchQuery != null
         && this.searchTrigger != 'enter'){
        return true;
      }

      if (this.forceSearch){
        this.forceSearch = false;
        return true;
      }

      return false;
    },

    // to create a filter row, we need to
    // make sure that there is atleast 1 column
    // that requires filtering
    hasFilterRow: function hasFilterRow(){
      var this$1 = this;

      if (!this.globalSearch) {
        for(var i = 0, list = this$1.columns; i < list.length; i += 1){
          var col = list[i];

          if(col.filterable){
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
        for (var i = 0, list = this$1.rows; i < list.length; i += 1) {
          var row = list[i];

          for(var i$1 = 0, list$1 = this$1.columns; i$1 < list$1.length; i$1 += 1) {
            var col = list$1[i$1];

            if (String(this$1.collectFormatted(row, col)).toLowerCase()
                .search(this$1.searchTerm.toLowerCase()) > -1) {
              filteredRows.push(row);
              break;
            }
          }
        }
        computedRows = filteredRows;
      }

      //taking care of sort here only if sort has changed
      if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) &&

        // if search trigger is enter then we only sort
        // when enter is hit
        (this.searchTrigger !== 'enter' || this.sortChanged)) {

        this.sortChanged = false;

        computedRows = computedRows.sort(function (x,y) {
          if (!this$1.columns[this$1.sortColumn])
            { return 0; }

          var cook = function (d) {
            d = this$1.collect(d, this$1.columns[this$1.sortColumn].field);

            //take care of dates too.
            if (this$1.columns[this$1.sortColumn].type === 'date') {
              d = esm.parse(d + '', this$1.columns[this$1.sortColumn].inputFormat, new Date());
            } else if (typeof(d) === 'string') {
              d = d.toLowerCase();
              if (this$1.columns[this$1.sortColumn].type === 'number')
                { d = d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d); }
            }
            return d;
          };

          x = cook(x);
          y = cook(y);

          // date comparison here
          if (this$1.columns[this$1.sortColumn].type === 'date') {
            if (!esm.isValid(x)) {
              return -1 * (this$1.sortType === 'desc' ? -1 : 1);
            }
            if (!esm.isValid(y)) {
              return (this$1.sortType === 'desc' ? -1 : 1);
            }
            return (esm.compareAsc(x, y)) * (this$1.sortType === 'desc' ? -1 : 1);
          }

          // regular comparison here
          return (x < y ? -1 : (x > y ? 1 : 0)) * (this$1.sortType === 'desc' ? -1 : 1);
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
        if (pageStart >= this.processedRows.length
          || this.currentPerPage === -1) {
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
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.filteredRows = JSON.parse(JSON.stringify(this.rows));

    // we need to preserve the original index of rows so lets do that
    for(var i = 0, list = this$1.filteredRows.entries(); i < list.length; i += 1) {
      var ref = list[i];
      var index = ref[0];
      var row = ref[1];

      row.originalIndex = index;
    }

    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }

    //take care of default sort on mount
    if (this.defaultSortBy) {
      for (var i$1 = 0, list$1 = this$1.columns.entries(); i$1 < list$1.length; i$1 += 1) {
        var ref$1 = list$1[i$1];
        var index$1 = ref$1[0];
        var col = ref$1[1];

        if (col.field === this$1.defaultSortBy.field) {
          this$1.sortColumn = index$1;
          this$1.sortType = this$1.defaultSortBy.type || 'asc';
          this$1.sortChanged = true;
          break;
        }
      }
    }
  }
};

var GoodTablePlugin = {
  install: function(Vue, options) {
    Vue.component(GoodTable.name, GoodTable);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GoodTablePlugin);
}

exports['default'] = GoodTablePlugin;
exports.VueGoodTable = GoodTable;
