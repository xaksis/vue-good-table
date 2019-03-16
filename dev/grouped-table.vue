<template>
<div>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :line-numbers="true"
    :select-options="{
      enabled: true,
      selectAllByGroup: true
    }"
    @on-select-all="onSelectAll"
    @on-search="onSelectAll"
    @on-row-mouseenter="onMouseover"
    @on-row-mouseleave="onMouseover"
    :search-options="{
      enabled: false,
    }"
    :group-options="{
      enabled: true,
      headerPosition: 'bottom',
      mode: 'span'
    }"
    styleClass="vgt-table condensed bordered">
    <!-- <template slot="table-header-row" slot-scope="props">
      <span v-if="props.row.mode === 'span'">
        My header label is - <strong>{{ props.row.label }}</strong>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template> -->
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
          hidden: true,
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
          label: 'Mammal Total',
          mode: 'span',
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
          label: 'Reptile Total',
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
    onSelectAll(params) {
      console.log(params);
    },
    onMouseover(params) {
      console.log(params);
    },
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
