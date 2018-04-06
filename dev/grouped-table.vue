<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :group-options="{
      enabled: true,
      headerPosition: 'bottom',
    }"
    styleClass="vgt-table condensed bordered">
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
          label: 'Diet',
          field: 'diet',
          type: 'text',
        },
        {
          label: 'Count',
          field: 'count',
          headerField: this.sumCount,
          type: 'number',
        },
      ],
      rows: [
        {
          name: 'Mammal Total',
          diet: '',
          count: '',
          children: [
            { name: 'Elephant', diet: 'herbivore', count: 5 },
            { name: 'Cat', diet: 'carnivore', count: 28 },
            { name: 'Dog', diet: 'omnivore', count: 12 },
            { name: 'Dolphin', diet: 'carnivore', count: 9 },
          ],
        },
        {
          name: 'Reptile Total',
          diet: '',
          count: '',
          children: [
            { name: 'Snake', diet: 'carnivore', count: 40 },
            { name: 'lizard', diet: 'insectivore', count: 34 },
            { name: 'crocodile', diet: 'carnivore', count: 22 },
            { name: 'turtles', diet: 'herbivore', count: 29 },
          ],
        },
        {
          name: 'Fish Total',
          diet: '',
          count: '',
          children: [
            { name: 'Shark', diet: 'carnivore', count: 2 },
            { name: 'koi', diet: 'omnivore', count: 14 },
            { name: 'guppy', diet: 'omnivore', count: 35 },
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    sumCount(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += rowObj.children[i].count;
      }
      return sum;
    },
  },
  mounted() {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.row-style{
    background-color: red;
  }
</style>
