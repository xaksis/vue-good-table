<template>
  <div>
    <button @click="addRow">Add Row</button>
    <button @click="editRow">edit Row</button>
    <vue-good-table
      :paginate="true"
      :columns="columns" 
      :rows="rows" 
      :line-numbers="true">
      <template slot="table-row-before" slot-scope="props">
        <td><input type="checkbox" /></td>
      </template>
      <template slot="table-row-after" slot-scope="props">
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
            label: '',
            sortable: false,
          },
          {
            label: 'Name',
            field: 'name',
            type: 'text',
            filterable: true,
            sortable: true,
            sortFn: this.sortFn,
            filterDropdown: true,
            filterOptions: [
              { value: 'Chris', text: 'Chris' },
              { value: 'Jane', text: 'Jane' },
              { value: 'Dan', text: 'Dan' },
              { value: 'Susan', text: 'Susan' },
              { value: 'John', text: 'John' },
            ],
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
      };
    },
    methods: {
      onClick() {
        console.log('clicked');
      },
      addRow() {
        this.rows.push({
          name: 'Chris' + Math.random(),
          age: 20,
        });
      },
      editRow() {
        this.$set(this.rows[12], 'age', 300);
      },
      sortFn(x, y, col) {
        return (x < y ? -1 : (x > y ? 1 : 0));
      }
    }
  };
</script>

<style lang="css">
  .row-style{
    background-color: red;
  }
</style>

