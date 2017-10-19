<template>
  <div>
    <vue-good-table
      title="Demo Table"
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :onClick="onClick"
      :lineNumbers="true"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueGoodTable from '../src/index';
  Vue.use(VueGoodTable);
  export default {
    name: 'test',
    data(){
      return {
        columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          html: false,
          filterable: true,
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          inputFormat: 'YYYY-MM-DD',
          outputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
          html: false,
        },
      ],
      rows: [
        {id:1, name:"John",age:20,createdAt: '201-10-31:9:35 am',score: 0.03343},
        {id:2, name:"Jane",age:24,createdAt: '2011-10-31',score: 0.03343},
        {id:3, name:"Susan",age:16,createdAt: '2011-10-30',score: 0.03343},
        {id:4, name:"Chris",age:55,createdAt: '2011-10-11',score: 0.03343},
        {id:5, name:"Dan",age:40,createdAt: '2011-10-21',score: 0.03343},
        {id:6, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
        {id:7, name:"Jane",age:24,createdAt: '20111031'},
        {id:8, name:"Susan",age:16,createdAt: '2013-10-31',score: 0.03343},
        {id:9, name:"Chris",age:55,createdAt: '2012-10-31',score: 0.03343},
        {id:10, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
        {id:11, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
        {id:12, name:"Jane",age:24,createdAt: '2011-07-31',score: 0.03343},
        {id:13, name:"Susan",age:16,createdAt: '2017-02-28',score: 0.03343},
        {id:14, name:"Chris",age:55,createdAt: '',score: 0.03343},
        {id:15, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
        {id:19, name:"Chris",age:55,createdAt: '2011-10-31',score: 0.03343},
        {id:20, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
      ],
      };
    },
    methods: {
      onClick() {
        console.log('clicked');
      }
    }
  };
</script>

<style lang="css">
  .row-style{
    background-color: red;
  }
</style>

