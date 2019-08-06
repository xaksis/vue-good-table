<template>
  <div>
    {{ selectedIds }}
    <button @click="rows = [];">empty row</button>
    <button @click="resetTable">reset Table</button>
    <button @click="hideColumn">hide column</button>
    <button @click="setFilter">SetFilter</button>
    <button @click="changePage">Change Page</button>
    <input type="text" v-model="searchTerm">
    <vue-good-table
      ref="my-table"
      @on-column-filter="onColumnFilter"
      @on-select-all="onSelectAll"
      @on-sort-change="onSortChange"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
      @on-search="onSearch"
      @on-selected-rows-change="onSelectChanged"
      @on-column-dragged="dragColumn"
      :columns="columns"
      :rows="rows"
      :draggableColumns="true"
      theme="black-rhino"
      :pagination-options="paginationOptions"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
      }"
      styleClass="vgt-table bordered"
      :sort-options="{
        enabled: true,
        initialSortBy: [{field: 'name', type: 'asc'}],
      }"
      :search-options="{
        enabled: true,
        skipDiacritics: true,
        externalQuery: searchTerm,
      }">
    </vue-good-table>
    <h3>Remote Table</h3>
    <!-- <remote-table/> -->
    <h3>Grouped Table</h3>
    <!-- <grouped-table></grouped-table> -->
  </div>
</template>

<script>
import GroupedTable from './grouped-table.vue';
import RemoteTable from './remote-table.vue';

export default {
  name: 'test',
  data() {
    return {
      currentPage: 1,
      selectedIds: [],
      rowStyleClass: 'red',
      searchTerm: '',
      paginationOptions: {
        mode: 'pages',
        enabled: true,
        perPage: 5,
        perPageDropdown: [50, 100, 200, 300, 500, 1000],
      },
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: '200px',
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            // filterDropdownItems: ['Chris', 'Dan', 'Susan'],
            // filterValue: 'Chris',
          },
        },
        {
          label: 'Age',
          field: obj => obj.age,
          type: 'number',
          filterOptions: {
            enabled: true,
            // filterValue: 20,
          },
        },
        {
          filterOptions: {
            enabled: true,
          },
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'LLL',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
        {
          label: 'func',
          field: this.funcValue,
          type: 'number',
        },
        {
          label: 'Valid',
          field: 'bool',
          type: 'boolean',
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              true,
              false,
            ],
          },
        },
      ],
      rows: [
        // { id:1, name:"John", age: 20, createdAt: '2018-02-18T00:00:43-05:00',score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343,
          bool: true,
        },
        {
          id: 3,
          name: 'Angel',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343,
          bool: true,
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343,
          bool: false,
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: null,
          score: 0.03343,
          bool: null,
        },
        {
          id: 5,
          name: '193.23',
          age: 20,
          createdAt: null,
          score: 0.03343,
          bool: null,
        },
        {
          id: 5,
          name: 'Dan',
          age: 34,
          createdAt: null,
          score: 0.03343,
          bool: null,
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343,
          bool: true,
        },
        {
          id: 7,
          name: 'Ángel',
          age: 20,
          createdAt: '2013-09-21',
          score: null,
          bool: 'false',
        },
        {
          id: 8,
          name: 'Susan',
          age: 16,
          createdAt: '2013-10-31',
          score: 0.03343,
          bool: true,
        },
      ],
    };
  },
  methods: {
    changePage() {
      this.currentPage += 1;
      this.$set(this.paginationOptions, 'setCurrentPage', this.currentPage);
    },
    funcValue(row) {
      return row.age + 5;
    },
    tdClassFunc(row) {
      if (row.age > 50) {
        return 'red';
      }
      return 'green';
    },
    getRowStyle() {
      return '';
    },
    hideColumn() {
      this.$set(this.columns[0], 'hidden', true);
    },
    resetTable() {
      this.$refs['my-table'].reset();
    },
    onSelectAll(params) {
      console.log(params);
      // this.unselectAll();
      // if (params.selected) {
      //   for (let i = 0; i < params.selectedRows.length; i++) {
      //     // lets get the original index of the row
      //     const originalIndex = params.selectedRows[i].originalIndex;
      //     // now lets set that row's selected value to be true
      //     this.$set(this.rows[originalIndex], 'selected', true);
      //   }
      // }
    },
    unselectAll() {
      for (let i = 0; i < this.rows.length; i++) {
        this.$set(this.rows[i], 'selected', false);
      }
    },
    toggleSelectRow(params) {
      console.log(params.row, params.pageIndex, params.selected);
      // if (this.rows[row.originalIndex].selected) {
      //   this.$set(this.rows[row.originalIndex], 'selected', false);
      // } else {
      //   this.$set(this.rows[row.originalIndex], 'selected', true);
      // }
    },
    selectCell(params) {
      console.log('select cell called');
      console.log(params);
    },
    searchedRow(params) {
      console.log(params);
    },
    setFilter() {
      // this.columns[0].filterOptions.filterValue = 'John';
      this.$set(this.columns[0].filterOptions, 'filterValue', 'Chris');
      // const column1 = JSON.parse(JSON.stringify(this.columns[0]));
      // column1.filterOptions.filterValue = 'John';
      // this.$set(this.columns, 0, column1);
      // const column2 = JSON.parse(JSON.stringify(this.columns[1]));
      // column2.filterOptions.filterValue = 20;
      // this.$set(this.columns, 1, column2);
      // this.$set(this.columns[1], 'filterOptions', { enabled: true, filterValue: 20 });
      // this.$set(this.columns[0], 'filterOptions', {
      //   enabled: true,
      //   placeholder: 'All',
      //   filterDropdownItems: ['Chris', 'Dan', 'Susan', 'John'],
      //   filterValue: 'John',
      // });
    },
    autofilter(type) {
      if (type === 'name') {
        this.columns[0].filterOptions.filterValue = 'John';
      }
      if (type === 'age') {
        this.columns[1].filterOptions.filterValue = '>30';
      }
      if (type === 'reset') {
        this.columns[0].filterOptions.filterValue = '';
        this.columns[1].filterOptions.filterValue = '';
        // this.columns[1].filterOptions.filterValue = null;
      }
    },

    filterAge(data, filterString) {
      if ((filterString === '>30') && (parseInt(data, 10) > 30)) {
        return true;
      }
      if ((filterString === '<=30') && (parseInt(data, 10) <= 30)) {
        return true;
      }
      return false;
    },

    onClick() {
      // console.log('clicked');
      this.rowStyleClass = 'green';
    },
    addRow() {
      this.rows.push({
        name: `Chris ${Math.random()}`,
        age: 20,
      });
    },
    editRow() {
      this.$set(this.rows[12], 'age', 300);
    },
    sortFn(x, y, col) {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    },
    formatAge(value) {
      return `lala${value}lala`;
    },
    addFilter() {
      this.$set(this.columns[2], 'filterValue', 'Jane');
      // console.log(this.columns);
    },

    // events
    // ===================================================
    onPerPageChange(evt) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      // console.log('per-page-changed:');
      // console.log(evt);
    },

    onPageChange(evt) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      // console.log('page-changed:');
      // console.log(evt);
    },

    onColumnFilter(params) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      // console.log('on-column-filters:');
      // console.log(params);
    },

    onSearch(params) {
      // console.log('on-search:');
      // console.log(params);
    },

    onSortChange(params) {
      // console.log('on-sort-change:');
      // console.log(params);
      const [nameFilter] = params;
      // console.log(typeof nameFilter.field === 'function');
    },

    onRowClick(params) {
      // console.log('on-row-click');
      // console.log(params);
    },

    onSelectChanged(params) {
      // console.log(params);
      const selectedIds = params.selectedRows.reduce((acc, row) => {
        acc.push(row.id);
        return acc;
      }, []);
      // console.log(params.selectedRows);
      // console.log(selectedIds);
      this.selectedIds = selectedIds;
    },

    dragColumn(e) {
      console.log(e);
    }
  },
  mounted() {
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => {
    //     console.log(response);
    //     this.rows = response.data;
    //   });
  },
  components: {
    'grouped-table': GroupedTable,
    RemoteTable,
  },
};
</script>

<style lang="css">
  .row-style{
    background-color: red;
  }
  *{
    font-family: 'Open Sans';
  }
  .red{
    background-color: red;
  }
  .green{
    background-color: green;
  }
  /* .vgt-selection-info-row.info-custom{
    background: red;
  } */
</style>

