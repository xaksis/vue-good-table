<template>
<tr>
  <th
    v-if="headerRow.mode === 'span'"
    class="vgt-left-align vgt-row-header"
    :colspan="fullColspan"
    @click="$emit('vgtExpand')">
    <span class="chevron" v-bind:class="{ 'down': headerRow.vgtIsExpanded, 'right': !headerRow.vgtIsExpanded }"></span>
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
    v-if="headerRow.mode !== 'span' && lineNumbers"></th>
  <th
    class="vgt-row-header"
    v-if="headerRow.mode !== 'span' && selectable"></th>
  <th
    v-if="headerRow.mode !== 'span' && !column.hidden"
    v-for="(column, i) in columns"
    :key="i"
    class="vgt-row-header"
    :class="getClasses(i, 'td')"
    @click="$emit('vgtExpand')">
    <span class="chevron" v-bind:class="{ 'down': headerRow.vgtIsExpanded, 'right': !headerRow.vgtIsExpanded }"></span>
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
  },
  data() {
    return {
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

<style lang="scss">
  .chevron{
    width:  24px;
    height:  24px;
    border-radius: 15%;
    position:  relative;
    margin:  0px 8px;
    &:after{
      content:  '';
      position:  absolute;
      display:  block;
      left:  50%;
      top:  50%;
      margin-top:  -6px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
    &.down::after{
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid black;
      border-bottom: 0px solid transparent;
      margin-left:  -6px;
    }

    &.right::after{
      border-left:  6px solid black;
      margin-left:  -3px;
    }
  }

</style>
