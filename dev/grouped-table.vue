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
      selectAllByGroup: true,
    }"
    @on-select-all="onSelectAll"
    @on-search="onSelectAll"
    @on-row-mouseenter="onMouseover"
    @on-row-mouseleave="onMouseover"
    :search-options="{
      enabled: true,
    }"
    :pagination-options="{
      enabled: false,
      perPage: 5,
    }"
    :group-options="{
      enabled: true,
      headerPosition: 'top',
      collapsable: false,
    }"
    styleClass="vgt-table condensed bordered"
    ref="groupedTable"
    :column-filter-options="{
      enabled: true
    }"
  >
    <!-- <template slot="table-header-row" slot-scope="props">
      <span v-if="props.row.mode === 'span'">
        My header label is - <strong>{{ props.row.label }}</strong>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template> -->

    <template v-slot:table-actions-dropdown="{columns}">
      <vgt-column-dropdown :columns="columns" />
    </template>
  </vue-good-table>
</div>
</template>

<script>
import VgtColumnDropdown from '../src/components/plugins/VgtColumnDropdown.vue';

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
          hidden: false,
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
          hidden: false,
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
            { name: 'Shrew', diet: 'carnivore', count: 9 },
            { name: 'Monkey', diet: 'carnivore', count: 9 },
          ],
        },
        {
          label: 'Reptile Total',
          mode: 'span',
          diet: '',
          count: '',
          children: [
            { name: 'Snake', diet: 'carnivore', count: 40 },
            { name: 'lizard', diet: 'insectivore', count: 34 },
            { name: 'crocodile', diet: 'carnivore', count: 22 },
            { name: 'turtles', diet: 'herbivore', count: 29 },
            { name: 'alligator', diet: 'herbivore', count: 29 },
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
    VgtColumnDropdown
  },
};
</script>

<style lang="scss" scoped>
.row-style {
  background-color: red;
}

#vgt-root >>> {
  .vgt-dropdown {
    float: right;
    margin-bottom: 5px;
  }

  ul.vgt-dropdown-menu {
    position: absolute;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-clip: padding-box;
    border-radius: 4px;
    
    li > span {
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      white-space: nowrap;
    }
  }
}
</style>
