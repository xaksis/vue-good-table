<template>
  <div class="vgt-wrap__footer vgt-clearfix">
    <div v-if="perPageDropdownEnabled" class="footer__row-count vgt-pull-left">
      <form>
        <label :for="id" class="footer__row-count__label">{{rowsPerPageText}}:</label>
        <select
          :id="id"
          autocomplete="off"
          name="perPageSelect"
          class="footer__row-count__select"
          v-model="currentPerPage"
          @change="perPageChanged"
          aria-controls="vgt-table">
          <option
            v-for="(option, idx) in rowsPerPageOptions"
            :key="idx"
            :value="option">
            {{ option }}
          </option>
          <option v-if="paginateDropdownAllowAll" :value="-1">{{allText}}</option>
        </select>
      </form>
    </div>
    <div class="footer__navigation vgt-pull-right">
      <pagination-page-info
        @page-changed="changePage"
        :total-records="total"
        :last-page="pagesCount"
        :current-page="currentPage"
        :current-per-page="currentPerPage"
        :of-text="ofText"
        :page-text="pageText"
        :info-fn="infoFn"
        :mode="mode" />
      <button
        v-if="jumpFirstOrLast"
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !firstIsPossible }"
        @click.prevent.stop="firstPage"
      >
        <span
          aria-hidden="true"
          class="chevron"
          v-bind:class="{ left: !rtl, right: rtl }"
        ></span>
        <span>{{ firstText }}</span>
      </button>

      <button
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !prevIsPossible }"
        @click.prevent.stop="previousPage">
        <span aria-hidden="true" class="chevron" v-bind:class="{ 'left': !rtl, 'right': rtl }"></span>
        <span>{{prevText}}</span>
      </button>

      <button
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !nextIsPossible }"
        @click.prevent.stop="nextPage">
        <span>{{nextText}}</span>
        <span aria-hidden="true" class="chevron" v-bind:class="{ 'right': !rtl, 'left': rtl }"></span>
      </button>

      <button
        v-if="jumpFirstOrLast"
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !lastIsPossible }"
        @click.prevent.stop="lastPage"
      >
        <span>{{ lastText }}</span>
        <span
          aria-hidden="true"
          class="chevron"
          v-bind:class="{ right: !rtl, left: rtl }"
        ></span>
      </button>
    </div>
  </div>
</template>

<script>
import VgtPaginationPageInfo from './VgtPaginationPageInfo.vue';
import {
  PAGINATION_MODES,
  DEFAULT_ROWS_PER_PAGE_DROPDOWN
} from '../utils/constants';

export default {
  name: 'VgtPagination',
  props: {
    styleClass: { default: 'table table-bordered' },
    total: { default: null },
    perPage: {},
    rtl: { default: false },
    perPageDropdownEnabled: { default: true },
    customRowsPerPageDropdown: { default() { return []; } },
    paginateDropdownAllowAll: { default: true },
    mode: { default: PAGINATION_MODES.Records },
    jumpFirstOrLast: { default: false },

    // text options
    firstText: { default: "First" },
    lastText: { default: "Last" },
    nextText: { default: 'Next' },
    prevText: { default: 'Prev' },
    rowsPerPageText: { default: 'Rows per page:' },
    ofText: { default: 'of' },
    pageText: { default: 'page' },
    allText: { default: 'All' },
    infoFn: { default: null },
  },

  data() {
    return {
      id: this.getId(),
      currentPage: 1,
      prevPage: 0,
      currentPerPage: 10,
      rowsPerPageOptions: [],
    };
  },
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
      // if the setting is set to 'all'
      if(this.currentPerPage === -1) {
        return 1;
      }
      const quotient = Math.floor(this.total / this.currentPerPage);
      const remainder = this.total % this.currentPerPage;

      return remainder === 0 ? quotient : quotient + 1;
    },

    // Can go to first page
    firstIsPossible() {
      return this.currentPage > 1;
    },

    // Can go to last page
    lastIsPossible() {
      return this.currentPage < Math.ceil(this.total / this.currentPerPage);
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
    getId() {
      return `vgt-select-rpp-${Math.floor(Math.random() * Date.now())}`;
    },
    // Change current page
    changePage(pageNumber, emit = true) {
      if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
        this.prevPage = this.currentPage;
        this.currentPage = pageNumber;
        this.pageChanged(emit);
      }
    },

    // Go to first page
    firstPage() {
      if (this.firstIsPossible) {
        this.currentPage = 1;
        this.prevPage = 0;
        this.pageChanged();
      }
    },

    // Go to last page
    lastPage() {
      if (this.lastIsPossible) {
        this.currentPage = this.pagesCount;
        this.prev = this.currentPage - 1;
        this.pageChanged();
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
    pageChanged(emit = true) {
      const payload = {
        currentPage: this.currentPage,
        prevPage: this.prevPage,
      };
      if (!emit) payload.noEmit = true;
      this.$emit('page-changed', payload);
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
        this.rowsPerPageOptions = JSON.parse(JSON.stringify(this.customRowsPerPageDropdown));
      } else {
        //* otherwise we use the default rows per page dropdown
        this.rowsPerPageOptions = JSON.parse(JSON.stringify(DEFAULT_ROWS_PER_PAGE_DROPDOWN));
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
