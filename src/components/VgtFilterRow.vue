<template>
<tr v-if="hasFilterRow">
  <th v-if="lineNumbers"></th>
  <th 
    v-for="(column, index) in columns" :key="index"
    v-if="!column.hidden">

    <div
      v-if="isFilterable(column)">
      <input v-if="!isDropdown(column)"
        type="text"
        class="vgt-input"
        :placeholder="getPlaceholder(column)"
        :value="columnFilters[column.field]"
        v-on:input="updateFilters(column, $event.target.value)" />

      <!-- options are a list of primitives -->
      <select v-if="isDropdownArray(column)"
        class="vgt-select"
        :value="columnFilters[column.field]"
        v-on:input="updateFilters(column, $event.target.value)">
          <option value="" key="-1">{{ getPlaceholder(column) }}</option>
          <option
            v-for="(option, i) in column.filterOptions.filterDropdownItems"
            :key="i"
            :value="option">
            {{ option }}
          </option>
      </select>
      
      <!-- options are a list of objects with text and value -->
      <select v-if="isDropdownObjects(column)"
        class="vgt-select"
        :value="columnFilters[column.field]"
        v-on:input="updateFilters(column, $event.target.value)">
        <option value="" key="-1">{{ getPlaceholder(column) }}</option>
        <option
          v-for="(option, i) in column.filterOptions.filterDropdownItems"
          :key="i"
          :value="option.value">{{ option.text }}</option>
      </select>
    </div>
  </th>
</tr>
</template>

<script>
export default {
  name: 'VgtFilterRow',
  props: [
    'lineNumbers',
    'columns',
    'typedColumns',
    'globalSearchEnabled',
  ],
  watch: {
    columns: {
      handler: function() {
        this.populateInitialFilters();
      },
      deep: true
    }
  },
  data() {
    return {
      columnFilters: {},
      timer: null,
    }
  }, 
  computed: {
    // to create a filter row, we need to
      // make sure that there is atleast 1 column
      // that requires filtering
    hasFilterRow(){
      if (!this.globalSearchEnabled) {
        for(var col of this.columns){
          if(col.filterOptions && col.filterOptions.enabled){
            return true;
          }
        }
      }
      return false;
    },
  },
  methods: {
    isFilterable(column) {
      return column.filterOptions 
        && column.filterOptions.enabled;
    },

    isDropdown(column) {
      return this.isFilterable(column)
        && column.filterOptions.filterDropdownItems 
        && column.filterOptions.filterDropdownItems.length;
    },

    isDropdownObjects(column) {
      return this.isDropdown(column)
        && typeof(column.filterOptions.filterDropdownItems[0]) === 'object';
    },

    isDropdownArray(column) {
      return this.isDropdown(column)
        && typeof(column.filterOptions.filterDropdownItems[0]) !== 'object';
    },

    //get column's defined placeholder or default one
    getPlaceholder(column) {
      const placeholder = (this.isFilterable(column) && column.filterOptions.placeholder) || 'Filter ' + column.label
      return placeholder
    },

    //since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters(column, value) {
      const _this = this;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function(){
        _this.$set(_this.columnFilters, column.field, value)
        _this.$emit('filter-changed', _this.columnFilters);
      }, 400);
    },

    populateInitialFilters() {
      for (const col of this.columns) {
        // lets see if there are initial 
        // filters supplied by user
        if(this.isFilterable(col)
          && typeof(col.filterOptions.filterValue) !== 'undefined' 
          && col.filterOptions.filterValue !== null) {
          this.updateFilters(col, col.filterOptions.filterValue);
          this.$set(col, 'filterValue', undefined);
        }
      }
    },
  },
  mounted() {
    // take care of initial filters
    this.populateInitialFilters();
  }
}
</script>

<style scoped>

</style>