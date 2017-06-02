<template>
  <div>
    <vue-good-table
        :columns="columns"
        :rows="rows"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueGoodTable from 'vue-good-table';
  Vue.use(VueGoodTable);
  export default {
    name: 'test',
    data(){
      return {
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
        ],
        rows: [
          {name:"John",age:"20"},
          {name:"Jane",age:"24"},
          {name:"Susan",age:"16"},
          {name:"Chris",age:"55"},
          {name:"Dan",age:"40"},
          {name:"John",age:"20"},
          {name:"Jane",age:"24"},
          {name:"Susan",age:"16"},
          {name:"Chris",age:"55"},
          {name:"Dan",age:"40"},
        ],
      };
    },
  };
</script>


