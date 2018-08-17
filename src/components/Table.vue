<template>
  <div class="vgt-wrap" :class="{
    'rtl': rtl,
    'nocturnal': theme==='nocturnal',
    'black-rhino': theme==='black-rhino',
  }">
    <div v-if="isTableLoading" class="vgt-loading vgt-center-align">
      <slot name="loadingContent">
        <span class="vgt-loading__content">
          Loading...
        </span>
      </slot>
    </div>
    <div class="vgt-inner-wrap"
      :class="{'is-loading': isTableLoading}">
      <slot
        v-if="paginate && paginateOnTop"
        name="pagination-top"
        :pageChanged="pageChanged"
        :perPageChanged="perPageChanged"
        :total="totalRows || totalRowCount">
        <vgt-pagination
          ref="paginationTop"
          @page-changed="pageChanged"
          @per-page-changed="perPageChanged"
          :perPage="perPage"
          :rtl="rtl"
          :total="totalRows || totalRowCount"
          :mode="paginationMode"
          :nextText="nextText"
          :prevText="prevText"
          :rowsPerPageText="rowsPerPageText"
          :customRowsPerPageDropdown="customRowsPerPageDropdown"
          :paginateDropdownAllowAll="paginateDropdownAllowAll"
          :ofText="ofText"
          :pageText="pageText"
          :allText="allText"></vgt-pagination>
      </slot>
      <vgt-global-search
        @on-keyup="searchTableOnKeyUp"
        @on-enter="searchTableOnEnter"
        v-model="globalSearchTerm"
        :search-enabled="searchEnabled && externalSearchQuery == null"
        :global-search-placeholder="searchPlaceholder">
        <template slot="internal-table-actions">
          <slot name="table-actions">
          </slot>
        </template>
      </vgt-global-search>
      <div v-if="selectedRowCount"
        class="vgt-selection-info-row clearfix"
        :class="selectionInfoClass">
        {{selectionInfo}}
        <a href=""
        @click.prevent="unselectAllInternal(true)">
          {{clearSelectionText}}
        </a>
        <div class="vgt-selection-info-row__actions vgt-pull-right">
          <slot name="selected-row-actions">
          </slot>
        </div>
      </div>
      <table
        v-if="fixedHeader"
        class="vgt-fixed-header"
        :class="tableStyleClasses">
        <!-- Table header -->
        <thead is="vgt-table-header"
          @on-toggle-select-all="toggleSelectAll"
          @on-sort-change="sort"
          @filter-changed="filterRows"
          :columns="columns"
          :line-numbers="lineNumbers"
          :selectable="selectable"
          :all-selected="allSelected"
          :all-selected-indeterminate="allSelectedIndeterminate"
          :mode="mode"
          :typed-columns="typedColumns"
          :sort-column="sortColumn"
          :sort-type="sortType"
          :isSortableColumn="isSortableColumn"
          :getClasses="getClasses"
          :searchEnabled="searchEnabled"
          :paginated="paginated"
          :table-ref="$refs.table">
          <template slot="table-column" slot-scope="props">
            <slot name="table-column" :column="props.column">
              <span>{{props.column.label}}</span>
            </slot>
          </template>
        </thead>
      </table>
      <div
        :class="{'vgt-responsive': responsive}"
        :style="wrapperStyles">
        <table ref="table" :class="tableStyleClasses">
          <!-- Table header -->
          <thead is="vgt-table-header"
            @on-toggle-select-all="toggleSelectAll"
            @on-sort-change="sort"
            @filter-changed="filterRows"
            :columns="columns"
            :line-numbers="lineNumbers"
            :selectable="selectable"
            :all-selected="allSelected"
            :all-selected-indeterminate="allSelectedIndeterminate"
            :mode="mode"
            :typed-columns="typedColumns"
            :sort-column="sortColumn"
            :sort-type="sortType"
            :isSortableColumn="isSortableColumn"
            :getClasses="getClasses"
            :searchEnabled="searchEnabled">
            <template slot="table-column" slot-scope="props">
              <slot name="table-column" :column="props.column">
                <span>{{props.column.label}}</span>
              </slot>
            </template>
          </thead>

          <!-- Table body starts here -->
          <tbody v-for="(headerRow, index) in paginated" :key="index">
            <!-- if group row header is at the top -->
            <vgt-header-row
              v-if="groupHeaderOnTop"
              :header-row="headerRow"
              :columns="columns"
              :line-numbers="lineNumbers"
              :selectable="selectable"
              :collect-formatted="collectFormatted"
              :formatted-row="formattedRow"
              :get-classes="getClasses"
              :full-colspan="fullColspan">
              <template
                v-if="hasHeaderRowTemplate"
                slot="table-header-row"
                slot-scope="props">
                <slot name="table-header-row"
                  :column="props.column"
                  :formattedRow="props.formattedRow"
                  :row="props.row">
                </slot>
              </template>
            </vgt-header-row>
            <!-- normal rows here. we loop over all rows -->
            <tr
              v-for="(row, index) in headerRow.children"
              :key="row.originalIndex"
              :class="getRowStyleClass(row)"
              @mouseenter="onMouseenter(row, index)"
              @mouseleave="onMouseleave(row, index)"
              @dblclick="onRowDoubleClicked(row, index, $event)"
              @click="onRowClicked(row, index, $event)">
              <th v-if="lineNumbers" class="line-numbers">
                {{ getCurrentIndex(index) }}
              </th>
              <th
                v-if="selectable"
                @click.prevent.stop="onCheckboxClicked(row, index, $event)"
                class="vgt-checkbox-col">
                <input
                  type="checkbox"
                  :checked="row.vgtSelected"/>
              </th>
              <td
                @click="onCellClicked(row, column, index, $event)"
                v-for="(column, i) in columns"
                :key="i"
                :class="getClasses(i, 'td')"
                v-if="!column.hidden && column.field">
                <slot
                  name="table-row"
                  :row="row"
                  :column="column"
                  :formattedRow="formattedRow(row)"
                  :index="index">
                  <span v-if="!column.html">
                    {{ collectFormatted(row, column) }}
                  </span>
                  <span v-if="column.html" v-html="collect(row, column.field)">
                  </span>
                </slot>
              </td>
            </tr>
            <!-- if group row header is at the bottom -->
            <vgt-header-row
              v-if="groupHeaderOnBottom"
              :header-row="headerRow"
              :columns="columns"
              :line-numbers="lineNumbers"
              :selectable="selectable"
              :collect-formatted="collectFormatted"
              :formatted-row="formattedRow"
              :get-classes="getClasses"
              :full-colspan="fullColspan">
              <template
                v-if="hasHeaderRowTemplate"
                slot="table-header-row"
                slot-scope="props">
                <slot name="table-header-row"
                  :column="props.column"
                  :formattedRow="props.formattedRow"
                  :row="props.row">
                </slot>
              </template>
            </vgt-header-row>
          </tbody>

          <tbody v-if="showEmptySlot">
            <tr>
              <td :colspan="fullColspan">
                <slot name="emptystate">
                  <div class="vgt-center-align vgt-text-disabled">
                    No data for table
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <slot
        v-if="paginate && paginateOnBottom"
        name="pagination-bottom"
        :pageChanged="pageChanged"
        :perPageChanged="perPageChanged"
        :total="totalRows || totalRowCount">
        <vgt-pagination
          ref="paginationBottom"
          @page-changed="pageChanged"
          @per-page-changed="perPageChanged"
          :perPage="perPage"
          :rtl="rtl"
          :total="totalRows || totalRowCount"
          :mode="paginationMode"
          :nextText="nextText"
          :prevText="prevText"
          :rowsPerPageText="rowsPerPageText"
          :customRowsPerPageDropdown="customRowsPerPageDropdown"
          :paginateDropdownAllowAll="paginateDropdownAllowAll"
          :ofText="ofText"
          :pageText="pageText"
          :allText="allText"
          ></vgt-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
import each from 'lodash.foreach';
import assign from 'lodash.assign';
import cloneDeep from 'lodash.clonedeep';
import filter from 'lodash.filter';
import diacriticless from 'diacriticless';
import defaultType from './types/default';
import VgtPagination from './VgtPagination.vue';
import VgtGlobalSearch from './VgtGlobalSearch.vue';
import VgtTableHeader from './VgtTableHeader.vue';
import VgtHeaderRow from './VgtHeaderRow.vue';

// here we load each data type module.
import * as CoreDataTypes from './types/index';

const dataTypes = {};
const coreDataTypes = CoreDataTypes.default;
each(Object.keys(coreDataTypes), (key) => {
  const compName = key.replace(/^\.\//, '').replace(/\.js/, '');
  dataTypes[compName] = coreDataTypes[key].default;
});

export default {
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
          this.handleSearch();
        }
        this.initializeSearch();
      },
      deep: true,
      immediate: true,
    },

    sortOptions: {
      handler() {
        this.initializeSort();
      },
      deep: true,
      immediate: true,
    },

    selectedRows() {
      this.$emit('on-selected-rows-change', {
        selectedRows: this.selectedRows,
      });
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
      return selectedRows;
    },

    fullColspan() {
      let fullColspan = this.columns.length;
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
                const matched = defaultType.filterPredicate(
                  this.collectFormatted(row, col),
                  this.searchTerm
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

      // taking care of sort here only if sort has changed
      if (this.sortColumn !== -1
        && this.isSortableColumn(this.sortColumn) &&
        // if search trigger is enter then we only sort
        // when enter is hit
        (this.searchTrigger !== 'enter' || this.sortChanged)) {
        this.sortChanged = false;

        each(computedRows, (cRows) => {
          cRows.children.sort((x, y) => {
            if (!this.columns[this.sortColumn]) return 0;

            const xvalue = this.collect(x, this.columns[this.sortColumn].field);
            const yvalue = this.collect(y, this.columns[this.sortColumn].field);

            // if user has provided a custom sort, use that instead of
            // built-in sort
            const { sortFn } = this.columns[this.sortColumn];
            if (sortFn && typeof sortFn === 'function') {
              return sortFn(xvalue, yvalue, this.columns[this.sortColumn], x, y) * (this.sortType === 'desc' ? -1 : 1);
            }

            // built in sort
            const { typeDef } = this.typedColumns[this.sortColumn];
            return typeDef.compare(xvalue, yvalue, this.columns[this.sortColumn])
              * (this.sortType === 'desc' ? -1 : 1);
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
      let index = 0;
      each(nestedRows, (headerRow, i) => {
        each(headerRow.children, (row, j) => {
          row.originalIndex = index++;
        });
      });

      return nestedRows;
    },

    typedColumns() {
      const columns = assign(this.columns, []);
      for (let i = 0; i < this.columns.length; i++) {
        const column = columns[i];
        column.typeDef = this.dataTypes[column.type] || defaultType;
      }
      return columns;
    },

    hasRowClickListener() {
      return this.$listeners && this.$listeners['on-row-click'];
    },
  },

  methods: {
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
      this.$refs['filter-row'].reset(true);
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
      // every time we change page we have to unselect all
      this.currentPage = pagination.currentPage;
      const pageChangedEvent = this.pageChangedEvent();
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

    sort(index) {
      if (!this.isSortableColumn(index)) return;

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
    onCheckboxClicked(row, index, event) {
      this.$set(row, 'vgtSelected', !row.vgtSelected);
      this.$emit('on-row-click', {
        row,
        pageIndex: index,
        selected: !!row.vgtSelected,
        event,
      });
    },

    onRowDoubleClicked(row, index, event) {
      this.$emit('on-row-dblclick', {
        row,
        pageIndex: index,
        selected: !!row.vgtSelected,
        event,
      });
    },

    onRowClicked(row, index, event) {
      if (this.selectable && !this.selectOnCheckboxOnly) {
        this.$set(row, 'vgtSelected', !row.vgtSelected);
      }
      this.$emit('on-row-click', {
        row,
        pageIndex: index,
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

    onMouseenter(row, index) {
      this.$emit('on-row-mouseenter', {
        row,
        pageIndex: index,
      });
    },

    onMouseleave(row, index) {
      this.$emit('on-row-mouseleave', {
        row,
        pageIndex: index,
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
          if (typeof result === 'undefined') {
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
        type = this.dataTypes[column.type] || defaultType;
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
    isSortableColumn(index) {
      const { sortable } = this.columns[index];
      const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },

    // Get classes for the given column index & element.
    getClasses(index, element) {
      const { typeDef, [`${element}Class`]: custom } = this.typedColumns[index];
      let { isRight } = typeDef;
      if (this.rtl) isRight = true;
      const classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight,
        [custom]: !!custom,
      };
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

    getCurrentIndex(index) {
      return ((this.currentPage - 1) * this.currentPerPage) + index + 1;
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

    handleDefaultSort() {
      for (let index = 0; index < this.columns.length; index++) {
        const col = this.columns[index];
        if (col.field === this.defaultSortBy.field) {
          this.sortColumn = index;
          this.sortType = this.defaultSortBy.type || 'asc';
          this.sortChanged = true;
          break;
        }
      }
    },

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
    },

    initializeSort() {
      const { enabled, initialSortBy } = this.sortOptions;

      if (typeof enabled === 'boolean') {
        this.sortable = enabled;
      }

      if (typeof initialSortBy === 'object') {
        this.defaultSortBy = initialSortBy;
        this.handleDefaultSort();
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

    initializeColumns() {
      // take care of default sort on mount
      if (this.defaultSortBy) {
        this.handleDefaultSort();
      }
    },
  },

  mounted() {
    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }
  },

  components: {
    'vgt-pagination': VgtPagination,
    'vgt-global-search': VgtGlobalSearch,
    'vgt-header-row': VgtHeaderRow,
    'vgt-table-header': VgtTableHeader,
  },
};
</script>

<style lang="scss">
@import '../styles/style';
</style>
