<template>
  <div>
    <vue-good-table
      :columns="columns"
      :paginate="true"
      :lineNumbers="true"
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
        ],
        rows: [
          {name: "John", age: "103"},
          {name: "Jane", age: "114"},
          {name: "Susan", age: "12"},
          {name: "Chris", age: "121"},
          {name: "Dan", age: "40"},
          {name: "Cankut", age: "20"},
          {name: "Aylin", age: "24"},
          {name: "Adam", age: "16"},
          {name: "Zoe", age: "55"},
          {name: "Niraj", age: "40"},
          {name: "Abina", age: "20"},
          {name: "Tiago", age: "20"},
        ],
      };
    },
  };
</script>


