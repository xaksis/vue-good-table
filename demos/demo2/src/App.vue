<template>
  <div>
    <vue-good-table
        title="Demo Table"
        :columns="columns"
        :rows="rows"
        :paginate="true"
        :lineNumbers="true"/>
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
            label: 'Id',
            field: 'id',
            type: 'number',
            html: false,
            width: '50px',
          },
          {
            label: 'Name',
            field: 'name',
            html: false,
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
            inputFormat: 'YYYYMMDD',
            outputFormat: 'MMM Do YY',
            filterable: false,
          },
          {
            label: 'Percent',
            field: 'btn',
            type: 'percentage',
            html: false,
            filterable: true,
          },
        ],
        rows: [
          {id:1, name:"John",age:"20",btn: 0.03343},
          {id:2, name:"Jane",age:"24",btn: 0.03343},
          {id:3, name:"Susan",age:"16",btn: 0.03343},
          {id:4, name:"Chris",age:"55",btn: 0.03343},
          {id:5, name:"Dan",age:"40",btn: 0.03343},
          {id:6, name:"John",age:"20",btn: 0.03343},
          {id:7, name:"Jane",age:"24",btn: 0.03343},
          {id:8, name:"Susan",age:"16",btn: 0.03343},
          {id:9, name:"Chris",age:"55",btn: 0.03343},
          {id:10, name:"Dan",age:"40",btn: 0.03343},
        ],
      };
    },
  };
</script>


