<template>
<thead>
  <tr>
    <th scope="col" v-if="lineNumbers" class="line-numbers"></th>
    <th scope="col" v-if="selectable" class="vgt-checkbox-col">
      <input
        type="checkbox"
        :checked="allSelected"
        :indeterminate.prop="allSelectedIndeterminate"
        @change="toggleSelectAll" />
    </th>
    <th v-for="(column, index) in columns"
      scope="col"
      :key="index"
      :class="getHeaderClasses(column, index)"
      :style="columnStyles[index]"
      :aria-sort="getColumnSortLong(column)"
      :aria-controls="`col-${index}`"
      v-if="!column.hidden">
      <slot name="table-column" :column="column">
        {{column.label}}
      </slot>
        <button
        v-if="isSortableColumn(column)"
        @click="sort($event, column)">
        <span class="sr-only">
          Sort table by {{ column.label }} in {{ sortButtonOrder }}
          </span>
        </button>
    </th>
  </tr>
  <tr
    is="vgt-filter-row"
    ref="filter-row"
    @filter-changed="filterRows"
    :global-search-enabled="searchEnabled"
    :line-numbers="lineNumbers"
    :selectable="selectable"
    :columns="columns"
    :mode="mode"
    :typed-columns="typedColumns">
      <template
        slot="column-filter"
        slot-scope="props"
      >
        <slot
          name="column-filter"
          :column="props.column"
          :updateFilters="props.updateFilters"
        >
        </slot>
      </template>
  </tr>
</thead>
</template>

<script>
import assign from 'lodash.assign';
import VgtFilterRow from './VgtFilterRow.vue';
import * as SortUtils from './utils/sort.js';

export default {
  name: 'VgtTableHeader',
  props: {
    lineNumbers: {
      default: false,
      type: Boolean,
    },
    selectable: {
      default: false,
      type: Boolean,
    },
    allSelected: {
      default: false,
      type: Boolean,
    },
    allSelectedIndeterminate: {
      default: false,
      type: Boolean,
    },
    columns: {
      type: Array,
    },
    mode: {
      type: String,
    },
    typedColumns: {},

    //* Sort related
    sortable: {
      type: Boolean,
    },
    // sortColumn: {
    //   type: Number,
    // },
    // sortType: {
    //   type: String,
    // },

    // utility functions
    // isSortableColumn: {
    //   type: Function,
    // },
    getClasses: {
      type: Function,
    },

    //* search related
    searchEnabled: {
      type: Boolean,
    },

    tableRef: {},

    paginated: {},
  },
  watch: {
    columns: {
      handler() {
        this.setColumnStyles();
      },
      immediate: true,
    },
    tableRef: {
      handler() {
        this.setColumnStyles();
      },
      immediate: true,
    },
    paginated: {
      handler() {
        if (this.tableRef) {
          this.setColumnStyles();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      checkBoxThStyle: {},
      lineNumberThStyle: {},
      columnStyles: [],
      sorts: [],
    };
  },
  computed: {

  },
  methods: {
    reset() {
      this.$refs['filter-row'].reset(true);
    },
    toggleSelectAll() {
      this.$emit('on-toggle-select-all');
    },
    isSortableColumn(column) {
      const { sortable } = column;
      const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },
    sort(e, column) {
      console.log('clicked sort: ' + column.label)
      console.log('sortable? : +this.isSortableColumn(column))
      //* if column is not sortable, return right here
      if (!this.isSortableColumn(column)) 
      console.log('not sortable')
      return;

      console.log('is sortable')

      if (e.shiftKey) {
                   console.log('secondary sort')
        this.sorts = SortUtils.secondarySort(this.sorts, column);
      } else {
              console.log('primary sort')
        this.sorts = SortUtils.primarySort(this.sorts, column);
      }
      this.$emit('on-sort-change', this.sorts);
      console.log('sort change emitted')
    },

    setInitialSort(sorts) {
      this.sorts = sorts;
      this.$emit('on-sort-change', this.sorts);
    },

    getColumnSort(column) {
      for (let i = 0; i < this.sorts.length; i += 1) {
        if (this.sorts[i].field === column.field) {
          return this.sorts[i].type || 'asc';
        }
      }
      return null;
    },

    getColumnSortLong(column) {
      return this.getColumnSort(column) === 'asc'
        ? 'ascending'
        : 'descending'
    },

    sortButtonOrder () {
      return this.getColumnSort(column) === 'asc'
        ? 'descending'
        : 'ascending'
    },

    getHeaderClasses(column, index) {
      const classes = assign({}, this.getClasses(index, 'th'), {
        sortable: this.isSortableColumn(column),
        'sorting sorting-desc': this.getColumnSort(column) === 'desc',
        'sorting sorting-asc': this.getColumnSort(column) === 'asc',
      });
      return classes;
    },

    filterRows(columnFilters) {
      this.$emit('filter-changed', columnFilters);
    },

    getWidthStyle(dom) {
      if (window && window.getComputedStyle && dom) {
        const cellStyle = window.getComputedStyle(dom, null);
        return {
          width: cellStyle.width,
        };
      }
      return {
        width: 'auto',
      };
    },

    setColumnStyles() {
      const colStyles = [];
      for (let i = 0; i < this.columns.length; i++) {
        if (this.tableRef) {
          let skip = 0;
          if (this.selectable) skip++;
          if (this.lineNumbers) skip++;
          const cell = this.tableRef.rows[0].cells[i + skip];
          colStyles.push(this.getWidthStyle(cell));
        } else {
          colStyles.push({
            minWidth: this.columns[i].width ? this.columns[i].width : 'auto',
            maxWidth: this.columns[i].width ? this.columns[i].width : 'auto',
            width: this.columns[i].width ? this.columns[i].width : 'auto',
          });
        }
      }
      this.columnStyles = colStyles;
    },

    getColumnStyle(column, index) {
      const styleObject = {
        minWidth: column.width ? column.width : 'auto',
        maxWidth: column.width ? column.width : 'auto',
        width: column.width ? column.width : 'auto',
      };
      //* if fixed header we need to get width from original table
      if (this.tableRef) {
        if (this.selectable) index++;
        if (this.lineNumbers) index++;

        const cell = this.tableRef.rows[0].cells[index];
        const cellStyle = window.getComputedStyle(cell, null);
        styleObject.width = cellStyle.width;
      }
      return styleObject;
    },
  },
  mounted() {
    window.addEventListener('resize', this.setColumnStyles);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setColumnStyles);
  },
  components: {
    'vgt-filter-row': VgtFilterRow,
  },
};
</script>

<style lang="scss" scoped>

</style>
