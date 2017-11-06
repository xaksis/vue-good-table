<template>
  <div>
    <vue-good-table :columns="columns" :rows="rows" :line-numbers="true">
      <template slot="table-row-before" scope="props">
        <td><input type="checkbox" /></td>
      </template>
      <template slot="table-row-after" scope="props">
        <td><a class="button lightbox" :href="'test_detail.php?id=' + props.row.id" >detail</a></td>
      </template>
    </vue-good-table>
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
            label: ''
          },
          {
            label: 'Name',
            field: 'name',
            type: 'text',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          }, 
          {
            label: ''
          },
        ],
        rows: [
          {
            name: "John",
            age: "20"
          }, {
            name: "Jane",
            age: "24"
          }, {
            name: "Susan",
            age: "16"
          }, {
            name: "Chris",
            age: "55"
          }, {
            name: "Dan",
            age: "40"
          }, {
            name: "John",
            age: "20"
          }, {
            name: "Jane",
            age: "24"
          }, {
            name: "Susan",
            age: "16"
          }, {
            name: "Chris",
            age: "55"
          }, {
            name: "Dan",
            age: "40"
          }, 
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

