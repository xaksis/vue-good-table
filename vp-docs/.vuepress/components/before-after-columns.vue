<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows">
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'before'">
        before
      </span>
      <span v-else-if="props.column.field == 'after'">
        after
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'before-after-columns',
  props: [],
  data() {
    return {
      columns: [
        {
          label: 'Before',
          field: 'before',
        },
        {
          label: 'Name',
          field: 'name',
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
          dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
        {
          label: 'After',
          field: 'after',
        }
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
</style>
