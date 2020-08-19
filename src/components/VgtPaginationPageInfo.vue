<template>
<div class="footer__navigation__page-info">
  <form>
  <label for="change-page-input">{{pageText}} <input
    id="change-page-input"
    aria-describedby="change-page-hint"
    aria-controls="vgb-table"
    class="footer__navigation__page-info__current-entry"
    type="text"
    @keyup.enter.stop="changePage"
    :value="currentPage"> {{pageInfo}}
    </label>
    <span id="change-page-hint">
      Type a page number and press Enter to change the page.
    </span>
    </form>
</div>
</template>

<script>
export default {
  name: 'VgtPaginationPageInfo',
  props: {
    currentPage: {
      default: 1,
    },
    lastPage: {
      default: 1,
    },
    totalRecords: {
      default: 0,
    },
    ofText: {
      default: 'of',
      type: String,
    },
    pageText: {
      default: 'page',
      type: String,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    pageInfo() {
      return `${this.ofText} ${this.lastPage}`;
    },
  },
  methods: {
    changePage(event) {
      const value = parseInt(event.target.value, 10);

      //! invalid number
      if (Number.isNaN(value)
        || value > this.lastPage
        || value < 1) {
        event.target.value = this.currentPage;
        return false;
      }

      //* valid number
      event.target.value = value;
      this.$emit('page-changed', value);
    },
  },
  mounted() {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>

</style>
