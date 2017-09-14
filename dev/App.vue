<template>
  <div>
    <vue-good-table
      :columns="columns"
      :paginate="true"
      :rows="rows"/>
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
        searchTerm: null,
        columns: [
          {
            label: 'Name',
            field: 'name',
          },
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          },
          {
            label: 'Created at',
            field: 'creationDateF',
            type: 'date',
            inputFormat: 'DD-MM-YYYY HH:mm:ss', //e.g. 07-09-2017 19:16:25
            outputFormat: 'DD-MM-YYYY HH:mm:ss'
          }
        ],
        rows: [
          {name: "John", age: "20", creationDateF: "07-09-2017 19:16:25"},
          {name: "Jane", age: "24", creationDateF: "09-10-2017 19:16:25"},
        ],
      };
    },
  };
</script>