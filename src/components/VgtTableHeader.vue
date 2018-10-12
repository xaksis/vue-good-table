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
      @click="sort(index)"
      :class="getHeaderClasses(column, index)"
      :style="columnStyles[index]"
      v-if="!column.hidden">
      <slot name="table-column" :column="column">
        <span>{{column.label}}</span>
      </slot>
      <div v-if="resizeable" class="vgt-handle" @mousedown="handleResizeStart">&nbsp;</div>
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
  </tr>
</thead>
</template>

<script>
import assign from 'lodash.assign';
import VgtFilterRow from './VgtFilterRow.vue';

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
    sortColumn: {
      type: Number,
    },
    sortType: {
      type: String,
    },

    // utility functions
    isSortableColumn: {
      type: Function,
    },
    getClasses: {
      type: Function,
    },

    //* search related
    searchEnabled: {
      type: Boolean,
    },

    tableRef: {},

    paginated: {},

    resizeable: {
      default: false,
      type: Boolean
    }
  },
  watch: {
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
      resizingTh: null,
      resizingThOffset: 0,
      timer: null,
      checkBoxThStyle: {},
      lineNumberThStyle: {},
      columnStyles: [],
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
    sort(index) {
      if (this.resizingTh) return;
      this.$emit('on-sort-change', index);
    },
    getHeaderClasses(column, index) {
      const isSortable = this.isSortableColumn(index);
      const classes = assign({}, this.getClasses(index, 'th'), {
        sorting: isSortable,
        'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
        'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc',
      });
      return classes;
    },

    filterRows(columnFilters) {
      this.$emit('filter-changed', columnFilters);
    },

    handleResizeStart(e) {
      let th = e.target.closest('th');
      this.resizingTh = th;
      this.resizingThOffset = th.offsetWidth - e.pageX;
    },

    handleResizeMove(e) {
      if (!this.resizingThOffset || !this.resizingTh) return;
      this.resizingTh.style.width = this.resizingThOffset + e.pageX - 24 + 'px';
    },

    handleResizeStop(e) {
      this.resizingThOffset = undefined;
      // Leave this for 200ms to prevent accidental sort click
      // after resizing
      setTimeout(() => {
        this.resizingTh = undefined;
      }, 200);
    },

    getWidthStyle(dom) {
      if (window && window.getComputedStyle) {
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
      if (this.timer) clearTimeout(this.timer);
      this.timeout = setTimeout(() => {
        for (let i = 0; i < this.columns.length; i++) {
          if (this.tableRef) {
            let skip = 0;
            if (this.selectable) skip++;
            if (this.lineNumbers) skip++;
            const cell = this.tableRef.rows[0].cells[i + skip];
            colStyles.push(this.getWidthStyle(cell));
          } else {
            colStyles.push({
              width: this.columns[i].width ? this.columns[i].width : 'auto',
            });
          }
        }
        this.columnStyles = colStyles;
      }, 200);
    },

    getColumnStyle(column, index) {
      const styleObject = {
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
    // These are attached to body so user can move mouse anywhere on screen during drag
    document.body.addEventListener('mousemove', this.handleResizeMove);
    document.body.addEventListener('mouseup', this.handleResizeStop);
    window.addEventListener('resize', this.setColumnStyles);
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
    window.removeEventListener('resize', this.setColumnStyles);
  },
  components: {
    'vgt-filter-row': VgtFilterRow,
  },
};
</script>

<style lang="scss" scoped>

</style>
