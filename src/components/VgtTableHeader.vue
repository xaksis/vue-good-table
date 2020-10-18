<template>
<thead>
  <tr>
    <th v-if="lineNumbers" class="line-numbers"></th>
    <th v-if="selectable" class="vgt-checkbox-col">
      <input
        type="checkbox"
        :checked="allSelected"
        :indeterminate.prop="allSelectedIndeterminate"
        @change="toggleSelectAll" />
    </th>
    <th v-for="(column, index) in columns"
      :key="index"
      @click="sort($event, column)"
      :class="getHeaderClasses(column, index)"
      :style="columnStyles[index]"
      v-if="!column.hidden">
      <slot name="table-column" :column="column">
        <span>{{column.label}}</span>
      </slot>
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
      ro: null
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
      //* if column is not sortable, return right here
      if (!this.isSortableColumn(column)) return;

      if (e.shiftKey) {
        this.sorts = SortUtils.secondarySort(this.sorts, column);
      } else {
        this.sorts = SortUtils.primarySort(this.sorts, column);
      }
      this.$emit('on-sort-change', this.sorts);
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
    this.$nextTick(() => {
      // We're going to watch the parent element for resize events, and calculate column widths if it changes
      this.ro = new ResizeObserver(() => {
          this.setColumnStyles();
      });
      this.ro.observe(this.$parent.$el);
      
      // If this is a fixed-header table, we want to observe each column header from the non-fixed header.
      // You can imagine two columns swapping widths, which wouldn't cause the above to trigger.
      // This gets the first tr element of the primary table header, and iterates through its children (the th elements)
      if (this.tableRef) {
        Array.from(this.$parent.$refs['table-header-primary'].$el.children[0].children).forEach((header) => {
          this.ro.observe(header);
        })
      }
    });
  },
  beforeDestroy() {
    this.ro.disconnect();
  },
  components: {
    'vgt-filter-row': VgtFilterRow,
  },
};
</script>