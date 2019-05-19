<template>
<div>
  <button @click="expandAll">Expand All</button>
  <button @click="collapseAll">Collapse All</button>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :line-numbers="true"
    :select-options="{enabled: true}"
    @on-select-all="onSelectAll"
    @on-search="onSelectAll"
    @on-row-mouseenter="onMouseover"
    @on-row-mouseleave="onMouseover"
    :search-options="{
      enabled: false,
    }"
    :group-options="{
      enabled: true,
      headerPosition: 'top',
      collapsable: 2,
      mode: 'span',
      customChildObject: 'episodes'
    }"
    styleClass="vgt-table condensed bordered"
    ref="groupedTable"
  >
    <template slot="table-footer-row" slot-scope="{headerRow}">
      <tr slot="table-footer-row">
        <td colspan="9999">total: {{ sumCount(headerRow) }}</td>
      </tr>
    </template>
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
    expandAll() {
      this.$refs.groupedTable.expandAll();
    },
    collapseAll() {
      this.$refs.groupedTable.collapseAll();
    },
    onSelectAll(params) {
      console.log(params);
    },
    onMouseover(params) {
      console.log(params);
    },
    sumCount(rowObj) {
      return rowObj.children.reduce((a, b) => a + (b.count || 0), 0);
    }
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
