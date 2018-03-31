<template>
  <div>
    <button @click="addRow">Add Row</button>
    <button @click="editRow">edit Row</button>
    <button @click="addFilter">Add Filter</button>
    <input type="text" v-model="searchQuery">
    <vue-good-table
      @on-per-page-change="onPerPageChange"
      @on-page-change="onPageChange"
      @on-column-filter="onColumnFilter"
      @on-sort-change="onSortChange"
      @on-search="onSearch"
      @on-row-click="onRowClick"
      :on-click="onRowClick"
      style="margin-top: 30px"
      styleClass="vgt-table bordered condensed"
      mode=""
      theme=""
      :sort-options="{
        enabled: true,
        initialSortBy: {field: 'name', type: 'asc'},
      }"
      :paginationOptions="{
        enabled: true,
        position: 'bottom',
        dropdownAllowAll: true,
        nextLabel: 'aage',
        prevLabel: 'peechhe',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        allLabel: 'All',
      }"
      :searchOptions="{
        enabled: true,
        //trigger: 'enter',
        // externalQuery: searchQuery,
        // searchFn:
        placeholder: 'My Search',
      }"
      :columns="columns"
      :rows="rows"
      :line-numbers="false">
      <!-- <template slot="table-actions">
        <button class="button">Hello</button>
        <button class="button">Hi</button>
      </template> -->
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.field =='name'">
            <i class="fa fa-user"></i> {{props.column.label}}
        </span>
        <span @click="sayHello()" v-else-if="props.column.field == 'joined'">
            <i class="fa fa-calendar"></i> LaLa
        </span>
        <span v-else>
            {{props.column.label}}
        </span>
      </template>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'age'">
          age: {{props.row.age}}
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <!-- <template slot="table-row-before" slot-scope="props">
        <td><input type="checkbox" /></td>
      </template> -->
      <!-- <template slot="table-row-after" slot-scope="props">
        <td><a class="button lightbox" :href="'test_detail.php?id=' + props.row.id" >detail</a></td>
      </template> -->
    </vue-good-table>
    <h3>Grouped Table</h3>
    <grouped-table></grouped-table>
  </div>
</template>

<script>
import GroupedTable from './grouped-table';

export default {
  name: 'test',
  mounted() {
    // setTimeout(() => {
    //   this.testing = [50, 100, 300];
    // }, 5000);
  },
  data() {
    return {
      searchQuery: '',
      testing: [2, 7, 12],
      columns: [
        // {
        //   label: '',
        //   sortable: false,
        // },
        {
          label: 'Name',
          field: 'name',
          type: 'text',
          sortable: true,
          sortFn: this.sortFn,
          filterOptions: {
            enabled: true,
            placeholder: 'Filter Here',
            filterDropdownItems: [
              { value: 'Chris', text: 'Chris' },
              { value: 'Jane', text: 'Jane' },
              { value: 'Dan', text: 'Dan' },
              { value: 'Susan', text: 'Susan' },
              { value: 'John', text: 'John' },
            ],
          },
        },
        // {
        //   label: 'Name2',
        //   field: 'name',
        //   type: 'text',
        //   sortable: true,
        //   sortFn: this.sortFn,
        //   filterOptions: {
        //     enabled: true,
        //     placeholder: 'Filter name2',
        //   }
        // },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          filterOptions: {
            enabled: false,
            filterFn(data, filterString) {
              const x = parseInt(filterString, 10);
              return data >= x - 10 && data <= x + 10;
            },
          },
        },
        {
          label: 'Joined On',
          field: 'joined',
          type: 'date',
          dateInputFormat: 'YYYYMMDD',
          dateOutputFormat: 'MMM Do YYYY',
        },
        // {
        //   label: '',
        //   sortable: false,
        // },
      ],
      rows: [
        { name: 'John', age: 20, joined: '20120201' },
        { name: 'Jane', age: 24, joined: '20120305' },
        { name: 'Susan', age: 16, joined: '20140823' },
        { name: 'Chris', age: 55, joined: '20161109' },
        { name: 'Dan', age: 40, joined: '20170612' },

        { name: 'Jay', age: 20, joined: '20120201' },
        { name: 'Seah', age: 25, joined: '20120305' },
        { name: 'Sarah', age: 16, joined: '20140823' },
        { name: 'Mohit', age: 55, joined: '20161109' },
        { name: 'Don', age: 40, joined: '20170612' },

        { name: 'Ernesto', age: 20, joined: '20120201' },
        { name: 'Clark', age: 27, joined: '20120305' },
        { name: 'Monty', age: 16, joined: '20140823' },
        { name: 'Priya', age: 55, joined: '20161109' },
        { name: 'Sans', age: 40, joined: '20170612' },
      ],
    };
  },
  methods: {
    onClick() {
      console.log('clicked');
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
      console.log(this.columns);
    },

    // events
    // ===================================================
    onPerPageChange(evt) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      console.log('per-page-changed:');
      console.log(evt);
    },

    onPageChange(evt) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      console.log('page-changed:');
      console.log(evt);
    },

    onColumnFilter(params) {
      // { currentPage: 1, currentPerPage: 10, total: 5 }
      console.log('on-column-filters:');
      console.log(params);
    },

    onSearch(params) {
      console.log('on-search:');
      console.log(params);
    },

    onSortChange(params) {
      console.log('on-sort-change:');
      console.log(params);
    },

    onRowClick(params) {
      console.log('on-row-click');
      console.log(params);
    },
  },
  components: {
    'grouped-table': GroupedTable,
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
</style>

