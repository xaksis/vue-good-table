<template>
  <div class="vgt-wrap__footer vgt-clearfix">
    <div class="footer__row-count vgt-pull-left">
      <span class="footer__row-count__label">{{rowsPerPageText}}</span>
      <select
        autocomplete="off"
        name="perPageSelect"
        class="footer__row-count__select"
        v-model="currentPerPage"
        @change="perPageChanged">
        <option
          v-for="(option, idx) in getRowsPerPageDropdown()"
          v-bind:key="'rows-dropdown-option-' + idx"
          :value="option">
          {{ option }}
        </option>
        <option v-if="paginateDropdownAllowAll" value="-1">{{allText}}</option>
      </select>
    </div>
    <div class="footer__navigation vgt-pull-right">
      <a
        href="javascript:undefined"
        class="footer__navigation__page-btn"
        :class="{ disabled: !prevIsPossible }"
        @click.prevent.stop="previousPage"
        tabindex="0">
        <span class="chevron" v-bind:class="{ 'left': !rtl, 'right': rtl }"></span>
        <span>{{prevText}}</span>
      </a>
      <div class="footer__navigation__info">{{paginatedInfo}}</div>
      <a href="javascript:undefined" class="footer__navigation__page-btn"
         :class="{ disabled: !nextIsPossible }" @click.prevent.stop="nextPage" tabindex="0">
        <span>{{nextText}}</span>
        <span class="chevron" v-bind:class="{ 'right': !rtl, 'left': rtl }"></span>
      </a>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'VgtPagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    customRowsPerPageDropdown: { default() { return []; } },
    paginateDropdownAllowAll: { default: true },

    // text options
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    allText: { default: 'All' },
  },

  data: () => ({
    currentPage: 1,
    currentPerPage: 10,
    rowsPerPageOptions: [],
    defaultRowsPerPageDropdown: [10, 20, 30, 40, 50],
  }),

  watch: {
    perPage() {
      this.handlePerPage();
      this.perPageChanged();
    },

    customRowsPerPageDropdown() {
      if (this.customRowsPerPageDropdown !== null
        && (Array.isArray(this.customRowsPerPageDropdown)
        && this.customRowsPerPageDropdown.lenght !== 0)) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      }
    },

  },

  computed: {
    currentPerPageString() {
      return this.currentPerPage === -1 ? 'All' : this.currentPerPage;
    },

    paginatedInfo() {
      if (this.currentPerPage === -1) {
        return `1 - ${this.total} ${this.ofText} ${this.total}`;
      }
      let first = ((this.currentPage - 1) * this.currentPerPage) + 1 ?
        ((this.currentPage - 1) * this.currentPerPage) + 1 : 1;

      if (first > this.total) {
        // this probably happened as a result of filtering
        first = 1;
        this.currentPage = 1;
      }

      const last = Math.min(this.total, this.currentPerPage * this.currentPage);
      return `${first} - ${last} ${this.ofText} ${this.total}`;
    },
    nextIsPossible() {
      return this.currentPerPage === -1 ?
        false : (this.total > this.currentPerPage * this.currentPage);
    },
    prevIsPossible() {
      return this.currentPage > 1;
    },
  },

  methods: {
    // optionSelected(option) {
    //   return this.currentPerPage === option;
    // },

    reset() {

    },

    changePage(pageNumber) {
      if (pageNumber > 0 && this.total > this.currentPerPage * pageNumber) {
        this.currentPage = pageNumber;
        this.pageChanged();
      }
    },

    nextPage() {
      if (this.currentPerPage === -1) return;
      if (this.nextIsPossible) {
        ++this.currentPage;
        this.pageChanged();
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        --this.currentPage;
        this.pageChanged();
      }
    },

    pageChanged() {
      this.$emit('page-changed', { currentPage: this.currentPage });
    },

    perPageChanged(event) {
      if (event) {
        this.currentPerPage = parseInt(event.target.value, 10);
      }
      this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
    },

    getRowsPerPageDropdown() {
      return this.rowsPerPageOptions;
    },

    handlePerPage() {
      this.rowsPerPageOptions = cloneDeep(this.defaultRowsPerPageDropdown);
      if (this.perPage) {
        this.currentPerPage = this.perPage;
        // if perPage doesn't already exist, we add it
        let found = false;
        for (let i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this.rowsPerPageOptions[i] === this.perPage) {
            found = true;
          }
        }
        if (!found && this.perPage !== -1) this.rowsPerPageOptions.push(this.perPage);
      } else {
        // reset to default
        this.currentPerPage = 10;
      }

      if (this.customRowsPerPageDropdown !== null
        && (Array.isArray(this.customRowsPerPageDropdown)
        && this.customRowsPerPageDropdown.length !== 0)) {
        this.rowsPerPageOptions = this.customRowsPerPageDropdown;
      }
    },
  },

  mounted() {
    this.handlePerPage();
  },
};
</script>

<style lang="scss">

</style>
