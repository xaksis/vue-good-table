<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows">
    <div slot="table-actions">
      <button class="button">Button 1</button>
      <button class="button">Button 2</button>
    </div>
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'action-slot-table',
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: false,
          }
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '2011-07-02',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  },
  components: {
  },
};
</script>

<style>
table{
  display: table;
  margin: 0;
}
tr {
  border-top: none;
}
tr:nth-child(2n) {
  background-color: transparent;
}
th, td {
  border: none;
  padding: auto auto;
}
.button{
  border-radius: 2px;
  font-size: .75rem;
  background-color: #fff;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(.375em - 1px);
  padding-left: .75em;
  padding-right: .75em;
  padding-top: calc(.375em - 1px);
  text-align: center;
  white-space: nowrap;
  margin-right: .5rem;
}
</style>
