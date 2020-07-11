<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :totalRows="totalRecords"
    mode="remote"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange"
    :compactMode="true"
    :pagination-options="{
      enabled: true,
      perPage: 5,
      perPageDropdown: [20, 50, 100, 200],
      dropdownAllowAll: false,
      position: 'top',
    }"
    :search-options="{
      enabled: false,
    }"
    styleClass="vgt-table condensed bordered striped">
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'remote-table',
  props: [],
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            filterDropdownItems: ['Chris', 'Dan', 'Susan'],
            // filterValue: 'Chris',
          },
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              {
                value: 24,
                text: '24',
              },
              {
                value: 16,
                text: '16',
              },
            ],
            // filterValue: 20,
          },
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'PPPP',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
        // {
        //   label: 'func',
        //   field: this.funcValue,
        //   type: 'number',
        // },
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
      rows: [],
      totalRecords: 0,
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        columnFilters: {
        },
        sort: {
          field: '', // example: 'name'
          type: '', // 'asc' or 'desc'
        },

        page: 1, // what page I want to show
        perPage: 10, // how many items I'm showing per page
      },
      serverRows: [
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
          name: 'Dan',
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
  computed: {
  },
  methods: {
    updateParams(newProps) {
      // console.log(newProps);
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      console.log('page change called');
      console.log(params);
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },

    onPerPageChange(params) {
      console.log('per page change called');
      console.log(params);
      this.updateParams({ perPage: params.currentPerPage });
      this.loadItems();
    },

    onSortChange(params) {
      console.log(params);
      this.updateParams({
        sort: params,
      });
      this.loadItems();
    },

    onColumnFilter(params) {
      console.log('on column filter change');
      console.log(params);
      this.updateParams(params);
      this.loadItems();
    },

    // load items is what brings back the rows from server
    loadItems() {
      console.log(this.serverParams);
      this.getFromServer(this.serverParams).then((response) => {
        this.totalRecords = response.totalRecords;
        this.rows = response.rows;
      });
    },

    getFromServer() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            rows: JSON.parse(JSON.stringify(this.serverRows)),
            totalRecords: this.serverRows.length,
          });
        }, 1000);
      });
    },
  },
  mounted() {
    this.loadItems();
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>

</style>
