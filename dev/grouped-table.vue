<template>
<div>
  <button @click="expandAll">Expand All</button>
  <button @click="collapseAll">Collapse All</button>
  <vue-good-table
    id="vgt-root"
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
      enabled: true,
    }"
    :pagination-options="{
      enabled: true,
      perPage: 5,
    }"
    :group-options="{
      enabled: true,
      headerPosition: 'top',
      collapsable: 2,
      mode: 'span',
      customChildObject: 'episodes'
    }"
    :column-filter-options="{
        enabled: true
    }"
    styleClass="vgt-table condensed bordered"
    ref="groupedTable"
  >
    <template slot="table-footer-row" slot-scope="{headerRow}">
      <tr slot="table-footer-row">
        <td colspan="9999">total: {{ sumCount(headerRow) }}</td>
      </tr>
    </template>
    <template slot="table-actions">
      Test
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
        {
          label: 'Date',
          field: 'date',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ssXXX',
          dateOutputFormat: 'yyyy-MM-dd\'T\'HH:mm:ssXXX',
        }
      ],
      rows: [
        {
          label: 'Mammal Total',
          mode: 'span',
          diet: '',
          count: '',
          episodes: [
            { name: 'Elephant', diet: 'herbivore', count: 5, date: '2020-02-29T03:00:00+01:00' },
            { name: 'Cat', diet: 'carnivore', count: 28, date: null },
            { name: 'Dog', diet: 'omnivore', count: 12, date: '2020-01-02T03:00:00+01:00' },
            { name: 'Dolphin', diet: 'carnivore', count: 9, date: '2020-01-29T03:00:00+01:00' },
            { name: 'Shrew', diet: 'carnivore', count: 9 },
            { name: 'Monkey', diet: 'carnivore', count: 9 },
          ],
        },
        {
          label: 'Reptile Total',
          mode: 'span',
          diet: '',
          count: '',
          episodes: [
            { name: 'Snake', diet: 'carnivore', count: 40, date: '2019-01-29T03:00:00+01:00' },
            { name: 'lizard', diet: 'insectivore', count: 34, date: '2018-01-29T03:00:00+01:00' },
            { name: 'crocodile', diet: 'carnivore', count: 22, date: '2016-01-29T03:00:00+01:00' },
            { name: 'turtles', diet: 'herbivore', count: 29, date: '2016-01-28T03:00:00+01:00' },
            { name: 'alligator', diet: 'herbivore', count: 29 },
          ],
        },
        {
          name: 'Fish Total',
          diet: '',
          count: '',
          episodes: [
            { name: 'Shark', diet: 'carnivore', count: 2, date: '2020-04-29T03:00:00+01:00' },
            { name: 'koi', diet: 'omnivore', count: 14, date: '2020-03-29T03:00:00+01:00' },
            { name: 'guppy', diet: 'omnivore', count: 35, date: '2020-02-29T03:00:00+01:00' },
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
      return rowObj.episodes.reduce((a, b) => a + (b.count || 0), 0);
    }
  },
  mounted() {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.row-style {
  background-color: red;
}
#vgt-root >>> .vgt-dropdown {
  float: right;
  margin-bottom: 5px;
}

</style>
