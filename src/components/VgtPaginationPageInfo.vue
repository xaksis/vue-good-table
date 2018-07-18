<template>
<div class="footer__navigation__page-info">
  {{pageText}} <input
    class="footer__navigation__page-info__current-entry"
    type="text"
    @keyup.enter.stop="changePage"
    :value="currentPage"> {{pageInfo}}
</div>
</template>

<script>
export default {
  name: 'VgtPaginationPageInfo',
  props: {
    currentPerPage: {
      default: 10,
    },
    currentPage: {
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
    lastPage() {
      return Math.ceil(this.totalRecords / this.currentPerPage);
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
