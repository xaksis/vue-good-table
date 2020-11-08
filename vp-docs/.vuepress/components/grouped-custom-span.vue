<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :group-options="options"
    :search-options="{ 
      enabled: true,
    }">
    <template v-slot:table-header-row="props">
      <span class="my-fancy-class">
        {{ props.row.label }}
      </span>
    </template>
  </vue-good-table>
</div>
</template>

<script>
export default {
  name: 'grouped-custom-span',
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
        ],
        rows: [
          {
            mode: 'span',
            label: 'Mammal',
            children: [
              { name: 'Elephant', diet: 'herbivore', count: 5 },
              { name: 'Cat', diet: 'carnivore', count: 28 },
            ],
          },
          {
            mode: 'span',
            label: 'Reptiles',
            children: [
              { name: 'Snake', diet: 'carnivore', count: 40 },
              { name: 'lizard', diet: 'insectivore', count: 34 },
            ],
          },
          {
            mode: 'span',
            label: 'Fish',
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
.my-fancy-class{
  color: red;
  text-transform: uppercase;
}
</style>
