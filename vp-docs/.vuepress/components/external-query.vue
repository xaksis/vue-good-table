<template>
<div>
  External Query <input type="text" v-model="externalQuery">
  <vue-good-table
    :search-options="{
      enabled: true,
      externalQuery,
    }"
    :columns="columns"
    :rows="rows">
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'external-query',
  props: [
  ],
  data() {
    return {
      externalQuery: '',
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
</style>
