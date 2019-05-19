<template>
<tr>
  <th
    v-if="spanColumns"
    class="vgt-left-align vgt-row-header"
    :colspan="fullColspan"
    @click="collapsable ? $emit('vgtExpand', !headerRow.vgtIsExpanded) : () => {}">
    <span v-if="collapsable" class="triangle" :class="{ 'expand': headerRow.vgtIsExpanded }"></span>
    <template v-if="selectAllByGroup">
      <slot name="table-header-group-select"
        :columns="columns"
        :row="headerRow"
      >
        <input
          type="checkbox"
          :checked="allSelected"
          @change="toggleSelectGroup($event)" />
      </slot>
    </template>
    <slot
      :row="headerRow"
      name="table-header-row">
      <span v-if="headerRow.html" v-html="headerRow.label">
      </span>
      <span v-else>
        {{ headerRow.label }}
      </span>
    </slot>
  </th>
  <!-- if the mode is not span, we display every column -->
  <th
    class="vgt-row-header"
    v-if="!spanColumns && lineNumbers"></th>
  <th
    class="vgt-row-header"
    :class="{ 'vgt-checkbox-col': selectAllByGroup }"
    v-if="!spanColumns && selectable">
    <template v-if="selectAllByGroup"
    >
      <slot name="table-header-group-select"
        :columns="columns"
        :row="headerRow"
      >
        <input
          type="checkbox"
          :checked="allSelected"
          @change="toggleSelectGroup($event)" />
      </slot>
    </template>
  </th>
  <template v-if="!spanColumns"> 
    <th
      v-for="(column, i) in hiddenColumns"
      :key="i"
      class="vgt-row-header"
    :class="getClasses(i, 'td')"
    @click="columnCollapsable(i) ? $emit('vgtExpand', !headerRow.vgtIsExpanded) : () => {}">
    <span v-if="columnCollapsable(i)" class="triangle" :class="{ 'expand': headerRow.vgtIsExpanded }"></span>
      
      <slot
        :row="headerRow"
        :column="column"
        :formattedRow="formattedRow(headerRow, true)"
        name="table-header-row">
        <span v-if="!column.html">
          {{ collectFormatted(headerRow, column, true) }}
        </span>
        <span v-if="column.html" v-html="collectFormatted(headerRow, column, true)">
        </span>
      </slot>
    </th>
  </template>
</tr>
</template>

<script>
export default {
  name: 'VgtHeaderRow',
  props: {
    headerRow: {
      type: Object,
    },
    columns: {
      type: Array,
    },
    lineNumbers: {
      type: Boolean,
    },
    selectable: {
      type: Boolean,
    },
    collapsable: {
      type: [Boolean, Number],
      default: false
    },
    selectAllByGroup: {
      type: Boolean
    },
    groupChildObject: {
      type: String
    },
    collectFormatted: {
      type: Function,
    },
    formattedRow: {
      type: Function,
    },
    getClasses: {
      type: Function,
    },
    fullColspan: {
      type: Number,
    },
    groupIndex: {
      type: Number
    },
    groupOptions: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  computed: {
    allSelected() {
      const { headerRow, groupChildObject } = this;
      return headerRow[groupChildObject].filter((row) => row.vgtSelected).length === headerRow[groupChildObject].length;
    },
    hiddenColumns() {
      const { columns } = this;
      return columns.filter(column => !column.hidden)
    },
    spanColumns() {
      const { headerRow, groupOptions } = this;
      return headerRow.mode === 'span' || groupOptions.mode === 'span';
    }
  },
  methods: {
    columnCollapsable: function (currentIndex) {
      if (this.collapsable === true) {
        return currentIndex === 0;
      }
      return currentIndex === this.collapsable;
    }
    toggleSelectGroup(event) {
      this.$emit('on-select-group-change', {groupIndex: this.groupIndex, checked: event.target.checked});
    }
  },
  mounted() {
  },
  components: {
  }
};
</script>

<style lang="scss">

</style>
