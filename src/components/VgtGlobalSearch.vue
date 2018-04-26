<template>
<div v-if="showControlBar" class="vgt-global-search vgt-clearfix">
  <div class="vgt-global-search__input vgt-pull-left">
    <span v-if="searchEnabled" class="input__icon">
      <div class="magnifying-glass"></div>
    </span>
    <input
      v-if="searchEnabled"
      type="text"
      class="vgt-input vgt-pull-left"
      :placeholder="globalSearchPlaceholder"
      :value="value"
      @input="updateValue($event.target.value)"
      @keyup.enter="entered($event.target.value)" />
  </div>
  <div class="vgt-global-search__actions vgt-pull-right">
    <slot name="internal-table-actions">
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'VgtGlobalSearch',
  props: [
    'value',
    'searchEnabled',
    'globalSearchPlaceholder',
  ],
  data() {
    return {
      globalSearchTerm: null,
    };
  },
  computed: {
    showControlBar() {
      if (this.searchEnabled) return true;
      if (this.$slots && this.$slots['internal-table-actions']) return true;
      return false;
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
      this.$emit('on-keyup', value);
    },
    entered(value) {
      this.$emit('on-enter', value);
    },
  },
};
</script>

<style>

</style>
