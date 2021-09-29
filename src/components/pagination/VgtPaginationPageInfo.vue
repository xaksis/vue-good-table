<template>
<div class="footer__navigation__page-info">
  <div v-if="infoFn">
    {{infoFn(infoParams)}}
  </div>
  <form v-else-if="mode === 'pages'" @submit.prevent>
    <label :for="id" class="page-info__label">
      <span>{{pageText}}</span>
      <input
        :id="id"
        aria-describedby="change-page-hint"
        aria-controls="vgb-table"
        class="footer__navigation__page-info__current-entry"
        type="text"
        @keyup.enter.stop="changePage"
        :value="currentPage"> 
      <span>{{pageInfo}}</span>
    </label>
    <span id="change-page-hint" style="display: none;">
      Type a page number and press Enter to change the page.
    </span>
  </form>
  <div v-else>
    {{recordInfo}}
  </div>
</div>
</template>

<script>
import {
  PAGINATION_MODES,
} from '../utils/constants';

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
    currentPerPage: {},
    mode: {
      default: PAGINATION_MODES.Records,
    },
    infoFn: { default: null },
  },
  data() {
    return {
      id: this.getId(),
    };
  },
  computed: {
    pageInfo() {
      return `${this.ofText} ${this.lastPage}`;
    },
    firstRecordOnPage() {
      return ((this.currentPage - 1) * this.currentPerPage) + 1;
    },
    lastRecordOnPage() {
      // if the setting is set to 'all'
      if(this.currentPerPage === -1) {
        return this.totalRecords;
      }
      return Math.min(this.totalRecords, this.currentPage * this.currentPerPage);
    },
    recordInfo() {
      let first = this.firstRecordOnPage;
      const last = this.lastRecordOnPage;

      if (last === 0) {
        first = 0;
      }

      return `${first} - ${last} ${this.ofText} ${this.totalRecords}`;
    },
    infoParams() {
      let first = this.firstRecordOnPage;
      const last = this.lastRecordOnPage;
      if (last === 0) {
        first = 0;
      }
      return {
        firstRecordOnPage: first,
        lastRecordOnPage: last,
        totalRecords: this.totalRecords,
        currentPage: this.currentPage,
        totalPage: this.lastPage,
      };
    },
  },
  methods: {
    getId() {
      return `vgt-page-input-${Math.floor(Math.random() * Date.now())}`;
    },
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
