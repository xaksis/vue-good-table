<template>
<div class="vgt-dropdown vgt-clearfix">
  <!-- Drowdown with checkboxes for showing / hiding table headers -->
  <div class="button-group pull-right">
    <button type="button" class="btn btn-default btn-sm dropdown-toggle" @click="selectOpen = !selectOpen"><span class="fa fa-cog" aria-hidden="false">Select Columns</span> <span class="caret" /></button>
    <ul v-show="selectOpen" class="vgt-dropdown-menu">
      <li v-for="(column, index) in filteredColumns" :key="index">
        <span class="small" tabIndex="-1">
          <input :ref="`filterlabel${column.label}`" :checked="!column.hidden" @change.prevent="updateFilteredColumn(column.label, $event.target.checked)" type="checkbox">
          {{column.label}}
        </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'vgtColumnDropdown',
  props: [
    'columns',
  ],
  data() {
    return {
      filteredColumns: [],
      selectOpen: false
    }
  },
  methods: {
    updateFilteredColumn(columnLabel, checked) {
      this.$emit('input', { label: columnLabel, checked });
    }
  },
  watch: {
    columns: {
      handler() {
        const { columns } = this;
        this.filteredColumns = columns.filter(column => column.hidden !== undefined);
      },
      deep: true,
      immediate: true,
    },
  }
};
</script>

<style>
</style>
