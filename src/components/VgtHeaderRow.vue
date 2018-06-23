<template>
<tr>
  <th
    v-if="headerRow.mode === 'span'"
    class="vgt-left-align vgt-row-header"
    :colspan="fullColspan">
    <span v-if="headerRow.html" v-html="headerRow.label">
    </span>
    <span v-else>
      {{ headerRow.label }}
    </span>
  </th>
  <!-- if the mode is not span, we display every column -->
  <th
    class="vgt-row-header"
    v-if="headerRow.mode !== 'span' && lineNumbers"></th>
  <th
    class="vgt-row-header"
    v-if="headerRow.mode !== 'span' && selectable"></th>
  <th
    v-if="headerRow.mode !== 'span'"
    v-for="(column, i) in columns"
    :key="i"
    class="vgt-row-header"
    :class="getClasses(i, 'td')">
    <span v-if="!column.html">
      {{ collectFormatted(headerRow, column, true) }}
    </span>
    <span v-if="column.html" v-html="collectFormatted(headerRow, column, true)">
    </span>
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

</style>
