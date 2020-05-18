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
          v-for="(option, idx) in rowsPerPageOptions"
          :key="'rows-dropdown-option-' + idx"
          :value="option">
          {{ option }}
        </option>
        <option v-if="paginateDropdownAllowAll" :value="total">{{allText}}</option>
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
      <pagination-page-info
        @page-changed="changePage"
        :totalRecords="total"
        :lastPage="pagesCount"
        :currentPage="currentPage"
        :ofText="ofText"
        :pageText="pageText"
        v-if="mode === 'pages'">
      </pagination-page-info>
      <div v-else class="footer__navigation__info">{{paginatedInfo}}</div>
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
import VgtPaginationPageInfo from './VgtPaginationPageInfo.vue';

const DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50];

export default {
  name: 'VgtPagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    customRowsPerPageDropdown: { default() { return []; } },
    paginateDropdownAllowAll: { default: true },
    mode: { default: 'records' },

    // text options
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    pageText: { default: 'page' },
    allText: { default: 'All' },
  },

  data: () => ({
    currentPage: 1,
    prevPage: 0,
    currentPerPage: 10,
    rowsPerPageOptions: [],
  }),

  watch: {
    perPage: {
      handler(newValue, oldValue) {
        this.handlePerPage();
        this.perPageChanged(oldValue);
      },
      immediate: true,
    },

    customRowsPerPageDropdown() {
      this.handlePerPage();
    },

    total: {
      handler(newValue, oldValue) {
        if(this.rowsPerPageOptions.indexOf(this.currentPerPage) === -1) {
          this.currentPerPage = newValue;
        }
      }
    }
  },

  computed: {
    // Number of pages
    pagesCount() {
      const quotient = Math.floor(this.total / this.currentPerPage);
      const remainder = this.total % this.currentPerPage;

      return remainder === 0 ? quotient : quotient + 1;
    },

    // Current displayed items
    paginatedInfo() {
      let first = ((this.currentPage - 1) * this.currentPerPage) + 1;
      const last = Math.min(this.total, this.currentPage * this.currentPerPage);

      if (last === 0) {
        first = 0;
      }

      return `${first} - ${last} ${this.ofText} ${this.total}`;
    },

    // Can go to next page
    nextIsPossible() {
      return this.currentPage < this.pagesCount;
    },

    // Can go to previous page
    prevIsPossible() {
      return this.currentPage > 1;
    },
  },

  methods: {
    // Change current page
    changePage(pageNumber, emit = true) {
      if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
        this.prevPage = this.currentPage;
        this.currentPage = pageNumber;
        if (emit) this.pageChanged();
      }
    },

    // Go to next page
    nextPage() {
      if (this.nextIsPossible) {
        this.prevPage = this.currentPage;
        ++this.currentPage;
        this.pageChanged();
      }
    },

    // Go to previous page
    previousPage() {
      if (this.prevIsPossible) {
        this.prevPage = this.currentPage;
        --this.currentPage;
        this.pageChanged();
      }
    },

    // Indicate page changing
    pageChanged() {
      this.$emit('page-changed', {
        currentPage: this.currentPage,
        prevPage: this.prevPage,
      });
    },

    // Indicate per page changing
    perPageChanged(oldValue) {
      // go back to first page
      if (oldValue) {
        //* only emit if this isn't first initialization
        this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
      }
      this.changePage(1, false);
    },

    // Handle per page changing
    handlePerPage() {
      //* if there's a custom dropdown then we use that
      if (this.customRowsPerPageDropdown !== null
        && (Array.isArray(this.customRowsPerPageDropdown)
        && this.customRowsPerPageDropdown.length !== 0)) {
        this.rowsPerPageOptions = cloneDeep(this.customRowsPerPageDropdown);
      } else {
        //* otherwise we use the default rows per page dropdown
        this.rowsPerPageOptions = cloneDeep(DEFAULT_ROWS_PER_PAGE_DROPDOWN);
      }

      if (this.perPage) {
        this.currentPerPage = this.perPage;
        // if perPage doesn't already exist, we add it
        let found = false;
        for (let i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this.rowsPerPageOptions[i] === this.perPage) {
            found = true;
          }
        }
        if (!found && this.perPage !== -1) {
          this.rowsPerPageOptions.unshift(this.perPage);
        }
      } else {
        // reset to default
        this.currentPerPage = 10;
      }
    },
  },

  mounted() {
  },

  components: {
    'pagination-page-info': VgtPaginationPageInfo,
  },
};
</script>

<style lang="scss">

</style>
