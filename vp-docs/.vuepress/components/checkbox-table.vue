<template>
<div>
  <vue-good-table
    @on-selected-rows-change="toggleSelectRow"
    :columns="columns"
    :rows="rows"
    :select-options="{ enabled: true }"
    :search-options="{ enabled: true }">
    <div v-if="showSlot" slot="selected-row-actions">
      <button>Action 1</button>
    </div>
  </vue-good-table>  
</div>
</template>

<script>
export default {
  name: 'checkbox-table',
  props: ['showSlot'],
  data() {
    return {
      columns: [
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
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      ],
    };
  },
  computed: {
  },
  methods: {
    selectAll(params) {
    	// do what you want here
    	console.log(params);
    },
    toggleSelectRow(params) {
    	// row that was clicked
    	console.log(params);
    }
  },
  mounted() {
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
