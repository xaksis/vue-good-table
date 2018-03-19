<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :paginate="true"
    :perPage="5"
    :group-enabled="true">
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'grouped-table',
  props: [],
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
          },
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
        {
          mode: 'span',
          label: 'header 1',
          children: [
            {
              name: 'John', age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343,
            },
            {
              name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343,
            },
            {
              name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343,
            },
          ],
        },
        {
          mode: 'span',
          label: 'header 2',
          children: [
            {
              name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343,
            },
            {
              name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343,
            },
            {
              name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343,
            },
            {
              name: 'Jane', age: 24, createdAt: '2013-09-21',
            },
            {
              name: 'Susan', age: 16, createdAt: '2013-10-31', score: 0.03343,
            },
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>

</style>
