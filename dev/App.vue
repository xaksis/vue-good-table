<template>
  <div>
    <button @click="addRow">Add Row</button>
    <button @click="editRow">edit Row</button>
    <button @click="addFilter">Add Filter</button>
    <vue-good-table
      :paginate="true"
      :columns="columns" 
      :rows="rows"
      :paginateOnTop="true"
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
  export default {
    name: 'test',
    mounted(){
      var that = this
      // setTimeout(function(){
      //   that.testing = [50,100,300]
      // }, 5000)
    },
    data(){
      return {
        testing: [2,7,12],
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
            label: 'Name2',
            field: 'name',
            type: 'text',
            filterable: true,
            sortable: true,
            sortFn: this.sortFn,
            filterValue: 'Dan',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
            formatFn: this.formatAge,
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
          }, 
          {
            label: 'Age',
            field: 'age',
            type: 'number',
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
            age: null,
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
          }, {
            name: "Dan",
            age: "40"
          }, {
            name: "John",
            age: "20"
          }, {
            name: null,
            age: null,
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
      },
      formatAge(value) {
        return `lala${value}lala`;
      },
      addFilter() {
        this.$set(this.columns[2], 'filterValue', 'Jane');
        console.log(this.columns);
      }
    }
  };
</script>

<style lang="css">
  .row-style{
    background-color: red;
  }
</style>

