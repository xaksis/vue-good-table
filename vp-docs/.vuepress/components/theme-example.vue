<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :styleClass="styleClasses"
    :theme="theme">
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'theme-table',
  props: ['theme', 'styleClasses'],
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
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
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '201-10-31:9: 35 am',score: 0.03343 },
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
</style>
