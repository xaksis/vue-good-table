<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :group-options="options"
    :search-options="{ 
      enabled: true,
    }">
    <template slot="table-header-row" slot-scope="props">
      <span v-if="props.column.field == 'action'">
        <button class="fancy-btn">Action</button>
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
  name: 'grouped-custom',
  props: ['options'],
  data() {
    return  {
      columns: [
          {
            label: 'Name',
            field: 'name',
          },
          {
            label: 'Diet',
            field: 'diet',
            type: 'text',
          },
          {
            label: 'Count',
            field: 'count',
            type: 'number',
          },
          {
            label: 'Action',
            field: 'action',
            type: 'number',
          }
        ],
        rows: [
          {
            name: 'Mammal', 
            diet: '', 
            count: '',
            children: [
              { name: 'Elephant', diet: 'herbivore', count: 5 },
              { name: 'Cat', diet: 'carnivore', count: 28 },
            ],
          },
          {
            name: 'Reptiles', 
            diet: '', 
            count: '',
            action: '',
            children: [
              { name: 'Snake', diet: 'carnivore', count: 40 },
              { name: 'lizard', diet: 'insectivore', count: 34 },
            ],
          },
          {
            name: 'Fish', 
            diet: '', 
            count: '',
            children: [
              { name: 'Shark', diet: 'carnivore', count: 2 },
              { name: 'koi', diet: 'omnivore', count: 14 },
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
.fancy-btn{
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(.375em - 1px);
  padding-left: .75em;
  padding-right: .75em;
  padding-top: calc(.375em - 1px);
  text-align: center;
  white-space: nowrap
}
</style>
