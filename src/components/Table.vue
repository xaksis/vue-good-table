<template>
  <div class="vgt-wrap" :class="{'rtl': rtl, 'nocturnal': theme==='nocturnal'}">
    <vue-good-pagination
      v-if="paginate && paginateOnTop"
      :perPage="perPage"
      :rtl="rtl"
      :total="totalRows || processedRows.length"
      @page-changed="pageChanged"
      @per-page-changed="perPageChanged"
      :nextText="nextText"
      :prevText="prevText"
      :rowsPerPageText="rowsPerPageText"
      :customRowsPerPageDropdown="customRowsPerPageDropdown"
      :ofText="ofText"
      :allText="allText"></vue-good-pagination>
      
    <vgt-global-search
      @on-enter="searchTable"
      v-model="globalSearchTerm"
      :search-enabled="searchEnabled && externalSearchQuery == null"
      :global-search-placeholder="searchPlaceholder">
      <template slot="internal-table-actions">
        <slot name="table-actions">
        </slot>
      </template>
    </vgt-global-search>

    <div :class="{'vgt-responsive': responsive}">
      <table ref="table" :class="tableStyleClasses" >
        <thead>
          <tr>
            <th v-if="lineNumbers" class="line-numbers"></th>
            <th v-for="(column, index) in columns"
              :key="index"
              @click="sort(index)"
              :class="getHeaderClasses(column, index)"
              :style="{width: column.width ? column.width : 'auto'}"
              v-if="!column.hidden">
              <slot name="table-column" :column="column">
                <span>{{column.label}}</span>
              </slot>
            </th>
          </tr>
          <tr is="vgt-filter-row"
            @filter-changed="filterRows"
            :global-search-enabled="searchEnabled"
            :line-numbers="lineNumbers"
            :columns="columns"
            :typed-columns="typedColumns">
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in paginated"
            :key="index"
            :class="getRowStyleClass(row)"
            @click="click(row, index)">
            <th v-if="lineNumbers" class="line-numbers">{{ getCurrentIndex(index) }}</th>
            <td
              v-for="(column, i) in columns"
              :key="i"
              :class="getClasses(i, 'td')"
              v-if="!column.hidden && column.field">

              <slot name="table-row" :row="row" :column="column" :formattedRow="formattedRow(row)" :index="index">
                <span v-if="!column.html">{{ collectFormatted(row, column) }}</span>
                <span v-if="column.html" v-html="collect(row, column.field)"></span>
              </slot>
            </td>
          </tr>
          <tr v-if="processedRows.length === 0">
            <td :colspan="columns.length">
              <slot name="emptystate">
                <div class="vgt-center-align text-disabled">
                  No data for table.
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <vue-good-pagination
      v-if="paginate && !paginateOnTop"
      :perPage="perPage"
      :rtl="rtl"
      :total="totalRows || processedRows.length"
      @page-changed="pageChanged"
      @per-page-changed="perPageChanged"
      :nextText="nextText"
      :prevText="prevText"
      :rowsPerPageText="rowsPerPageText"
      :customRowsPerPageDropdown="customRowsPerPageDropdown"
      :ofText="ofText"
      :allText="allText"
      ></vue-good-pagination>
  </div>
</template>

<script>
  import VueGoodPagination from './Pagination.vue'
  import VgtGlobalSearch from './VgtGlobalSearch.vue'
  import VgtFilterRow from './VgtFilterRow.vue'
  import each from 'lodash.foreach'
  import assign from 'lodash.assign'
  import defaultType from './types/default'
  import diacriticless from 'diacriticless'

  // here we load each data type module.
  let dataTypes = {};
  import * as CoreDataTypes from './types/index'; 
  let coreDataTypes = CoreDataTypes.default;
  each(Object.keys(coreDataTypes), (key) => {
		let compName = key.replace(/^\.\//, "").replace(/\.js/, "");
		dataTypes[compName] = coreDataTypes[key].default;
  });

  export default {
    name: 'vue-good-table',
    props: {
      theme: {default: ''},
      mode: {default: 'local'}, // could be remote
      totalRows: {}, // required if mode = 'remote'
      customRowsPerPageDropdown: {default: function(){ return [] }},
      styleClass: {default: 'vgt-table bordered'},
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
      searchEnabled: {default: false},
      searchTrigger: {default: null},
      externalSearchQuery: {default: null},
      searchFn: {type: Function, default: null},
      
      // text options
      searchPlaceholder: {default: 'Search Table'},
      nextText: {default: 'Next'},
      prevText: {default: 'Prev'},
      rowsPerPageText: {default: 'Rows per page'},
      ofText: {default: 'of'},
      allText: {default: 'All'}
    },

    data: () => ({
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
    }),

    methods: {
      pageChangedEvent() {
        return {
          currentPage: this.currentPage,
          currentPerPage: this.currentPerPage,
          total: Math.floor(this.rows.length / this.currentPerPage)
        };
      },

      pageChanged(pagination) {
        this.currentPage = pagination.currentPage;
        const pageChangedEvent = this.pageChangedEvent();
        this.$emit('on-page-change', pageChangedEvent);
      },

      perPageChanged(pagination) {
        this.currentPerPage = pagination.currentPerPage;
        const perPageChangedEvent = this.pageChangedEvent();
        this.$emit('on-per-page-change', perPageChangedEvent);
      },

      sort(index) {
        if (!this.isSortableColumn(index))
          return;
        if (this.sortColumn === index) {
          this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortType = 'asc';
          this.sortColumn = index;
        }

        this.$emit('on-sort-change', {
          sortType: this.sortType,
          columnIndex: this.sortColumn,
        });

        // if the mode is remote, we don't need to do anything 
        // after this.
        if(this.mode === 'remote') return;
        this.sortChanged = true;
      },

      click(row, index) {
        this.$emit('on-row-click', {row: row, index: index});
        if (this.onClick)
          this.onClick(row, index);
      },

      searchTable() {
        this.$emit('on-search', {
          searchTerm: this.searchTerm,
        });
        if(this.searchTrigger == 'enter') {
          this.forceSearch = true;
          this.sortChanged = true;
        }
      },

      // field can be:
      // 1. function
      // 2. regular property - ex: 'prop'
      // 3. nested property path - ex: 'nested.prop'
      collect(obj, field) {

        //utility function to get nested property
        function dig(obj, selector) {
          var result = obj;
          const splitter = selector.split('.');
          for (let i = 0; i < splitter.length; i++)
            if (typeof(result) === 'undefined')
              return undefined;
            else
              result = result[splitter[i]];
          return result;
        }

        if (typeof(field) === 'function')
          return field(obj);
        else if (typeof(field) === 'string')
          return dig(obj, field);
        else
          return undefined;
      },

      collectFormatted(obj, column) {
        let value = this.collect(obj, column.field);
        if (value === undefined) return '';

        // if user has supplied custom formatter, 
        // use that here
        if (column.formatFn && typeof column.formatFn === 'function') {
          return column.formatFn(value);
        }

        //lets format the resultant data
        let type = column.typeDef
        return type.format(value, column);
      },

      formattedRow(row) {
        var formattedRow = {};
        for (let i = 0; i < this.typedColumns.length; i++) {
          const col = this.typedColumns[i];
          // what happens if field is
          if (col.field) {
            formattedRow[col.field] = this.collectFormatted(row, col);
          }
        }
        return formattedRow;
      },

      //Check if a column is sortable.
      isSortableColumn(index) {
        const sortable = this.columns[index].sortable;
        const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
        return isSortable;
      },

      //Get classes for the given header column.
      getHeaderClasses(column, index) {
        const isSortable = this.isSortableColumn(index);
        const classes = assign({}, this.getClasses(index, 'th'), {
          'sorting': isSortable,
          'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
          'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc',
        });
        return classes;
      },

      //Get classes for the given column index & element.
      getClasses(index, element) {
        const { typeDef, [element + 'Class']: custom } = this.typedColumns[index];
        let isRight = typeDef.isRight;
        if (this.rtl) isRight = true;
        const classes = {
          'vgt-right-align': isRight,
          'vgt-left-align': !isRight,
          [custom]: !!custom
        };
        return classes;
      },

      //method to filter rows
      filterRows(columnFilters, fromFilter=true) {
        
        // this is invoked either as a result of changing filters
        // or as a result of modifying rows rows. 
        this.columnFilters = columnFilters;
        
        let computedRows = this.originalRows;

        // do we have a filter to care about?
        // if not we don't need to do anything
        if (this.columnFilters && Object.keys(this.columnFilters).length) {

          // if mode is remote, we don't do any filtering here. 
          // we need to emit an event and that's that.
          // but this only needs to be invoked if filter is changing
          // not when row object is modified. 
          if (this.mode === 'remote' && fromFilter) {
            this.$emit('on-column-filter', {
              columnFilters: this.columnFilters,
            });
            return;
          }

          for (let i=0; i<this.typedColumns.length; i++){
            let col = this.typedColumns[i];
            if (this.columnFilters[col.field]) {
              computedRows = computedRows.filter(row => {
                
                // If column has a custom filter, use that.
                if (col.filterOptions 
                  && typeof(col.filterOptions.filterFn) === 'function' )  {
                  
                  return col.filterOptions.filterFn(
                    this.collect(row, col.field), 
                    this.columnFilters[col.field]
                  );
                }else{

                  // Use default filters
                  var typeDef = col.typeDef
                  return typeDef.filterPredicate(this.collect(row, col.field), this.columnFilters[col.field])
                }
              });
            }
          }
        }
        this.filteredRows = computedRows;
      },

      getCurrentIndex(index) {
        return (this.currentPage - 1) * this.currentPerPage + index + 1;
      },

      getRowStyleClass(row) {
        let classes = '';
        this.onClick ? classes += 'clickable' : '';
        let rowStyleClasses;
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
    },

    watch: {
      rows: {
        handler: function() {
          this.filterRows(this.columnFilters, false);
        },
        deep: true
      },
    },

    computed: {
      tableStyleClasses() {
        let classes = this.styleClass;
        classes += ' '+this.theme;
        return classes;
      },

      searchTerm(){
        return (this.externalSearchQuery != null) ? this.externalSearchQuery : this.globalSearchTerm;
      },

      //
      globalSearchAllowed() {
        if (this.searchEnabled
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

      // this is done everytime sortColumn
      // or sort type changes
      //----------------------------------------
      processedRows() {
        // we only process rows when mode is local
        var computedRows = this.filteredRows;
        if(this.mode === 'remote'){
          return computedRows;
        }

        // take care of the global filter here also
        if (this.globalSearchAllowed) {
          var filteredRows = [];
          for (let i = 0; i < this.originalRows.length; i++) {
            let row = this.originalRows[i];
            for (let j = 0; j < this.columns; j++) {
              let col = this.columns[j];

              //if col has search disabled,
              //skip the column.
              if (col.globalSearchDisabled) {
                continue;
              }

              // if a search function is provided,
              // use that for searching, otherwise,
              // use the default search behavior
              if (this.searchFn) {
                const foundMatch = this.searchFn(
                  row,
                  col,
                  this.collectFormatted(row, col),
                  this.searchTerm);
                if (foundMatch) {
                  filteredRows.push(row);
                  break;
                }
              } else {
                // lets get the formatted row/col value
                let tableValue = this.collectFormatted(row, col);
                if(typeof(tableValue) !== 'undefined' && tableValue !== null) {
                  // table value
                  tableValue = diacriticless(String(tableValue).toLowerCase());

                  // search term
                  let searchTerm = diacriticless(this.searchTerm.toLowerCase());

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
        if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) &&

          // if search trigger is enter then we only sort
          // when enter is hit
          (this.searchTrigger !== 'enter' || this.sortChanged)) {

          this.sortChanged = false;

          computedRows = computedRows.sort((x,y) => {
            if (!this.columns[this.sortColumn])
               return 0;

            let xvalue = this.collect(x, this.columns[this.sortColumn].field);
            let yvalue = this.collect(y, this.columns[this.sortColumn].field);

            // if user has provided a custom sort, use that instead of
            // built-in sort
            const sortFn = this.columns[this.sortColumn].sortFn;
            if (sortFn && typeof sortFn === 'function') {
              return sortFn(xvalue, yvalue, this.columns[this.sortColumn]) * (this.sortType === 'desc' ? -1 : 1);
            }

            // built in sort
            var typeDef = this.typedColumns[this.sortColumn].typeDef;
            return typeDef.compare(xvalue, yvalue, this.columns[this.sortColumn])
              * (this.sortType === 'desc' ? -1 : 1);
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
        var paginatedRows = this.processedRows;

        if (this.mode === 'remote') {
          return paginatedRows;
        }

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
      },

      originalRows() {
        const rows = JSON.parse(JSON.stringify(this.rows));

        // we need to preserve the original index of rows so lets do that
        for (let index = 0; index < rows.length; index++){
          rows[index].originalIndex = index;
        }

        return rows;
      },

      typedColumns() {
        const columns = assign(this.columns, []);
        for (let i=0; i< this.columns.length; i++) {
          let column  = columns[i];
          column.typeDef = this.dataTypes[column.type] || defaultType
        }
        return columns
      }
    },

    mounted() {
      this.filteredRows = this.originalRows;

      if (this.perPage) {
        this.currentPerPage = this.perPage;
      }

      //take care of default sort on mount
      if (this.defaultSortBy) {
        for (let index = 0; index < this.columns.length; index++){
          let col = this.columns[index]
          if (col.field === this.defaultSortBy.field) {
            this.sortColumn = index;
            this.sortType = this.defaultSortBy.type || 'asc';
            this.sortChanged = true;
            break;
          }
        }
      }
    },
    
    components: {
      'vue-good-pagination': VueGoodPagination,
      'vgt-global-search': VgtGlobalSearch,
      'vgt-filter-row': VgtFilterRow,
    },
  }
</script>

<style lang="scss">
@import '../styles/style';
</style>
