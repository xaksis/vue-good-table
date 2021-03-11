<template>
<div v-if="showControlBar" class="vgt-global-search vgt-clearfix">
  <div class="vgt-global-search__input vgt-pull-left">
    <form @submit.prevent v-if="searchEnabled" role="search">
      <label :for="id">
        <span aria-hidden="true" class="input__icon">
        <div class="magnifying-glass"></div>
        </span>
        <span class="sr-only">Search</span>
      </label>
    <input
      :id="id"
      type="text"
      class="vgt-input vgt-pull-left"
      :placeholder="globalSearchPlaceholder"
      :value="value"
      @input="updateValue($event.target.value)"
      @keyup.enter="entered($event.target.value)" />
    </form>
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
      id: this.getId(),
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
    getId() {
      return `vgt-search-${Math.floor(Math.random() * Date.now())}`;
    },
  },
};
</script>

<style>

</style>
