<template>
  <div>
    <vue-good-table
      :paginate="true"
      :columns="columns" 
      :rows="rows" 
      :loading="loading" 
      :line-numbers="true">
      <template slot="table-row-before" scope="props">
        <td><input type="checkbox" /></td>
      </template>
      <template slot="loading" scope="props">
        <p class="text-center"> Fetching Data ... </p>
      </template>
      <template slot="table-row-after" scope="props">
        <td><a class="button lightbox" :href="'test_detail.php?id=' + props.row.id" >detail</a></td>
      </template>
    </vue-good-table>
    <button class="btn" @click="load">
      Reload
    </button>
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
            label: '',
            sortable: false,
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
            label: '',
            sortable: false,
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
        loading: false,
      };
    },
    methods: {
      load() {
        this.loading = true;
        setTimeout(() => this.loading = false, 2000);
      },
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
  .btn{
    padding: 5px;
    border-radius: 3px;
    background: blue;
    color: white;
    font-size: 16px;
  }
  .text-center{
    text-align: center;
  }
</style>

