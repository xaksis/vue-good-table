<template>
  <div class="vgt-wrap__footer vgt-clearfix">
    <div class="footer__row-count vgt-pull-left">
      <span class="footer__row-count__label">{{rowsPerPageText}}</span>
      <select class="footer__row-count__select" @change="perPageChanged">
        <option
          v-for="option in getRowsPerPageDropdown()"
          v-bind:key="'rows-dropdown-option-' + option"
          :selected="(perPage && currentPerPage === option) || currentPerPage === option"
          :value="option">
          {{ option }}
        </option>
        <option value="-1">{{allText}}</option>
      </select>
    </div>
    <div class="footer__navigation vgt-pull-right">
      <a href="javascript:undefined" class="footer__navigation__page-btn"  :class="{ disabled: !prevIsPossible }"
         @click.prevent.stop="previousPage" tabindex="0">
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
  export default {
    name: 'vue-good-pagination',
    props: {
      styleClass: {default: 'table table-bordered'},
      total: {default: null},
      perPage: {},
      rtl: {default: false},
      customRowsPerPageDropdown: {default: function(){ return [] }},

      // text options
      nextText: {default: 'Next'},
      prevText: {default: 'Prev'},
      rowsPerPageText: {default: 'Rows per page:'},
      ofText: {default: 'of'},
      allText: {default: 'All'}
    },

    data: () => ({
      currentPage: 1,
      currentPerPage: 10,
      rowsPerPageOptions: [],
      defaultRowsPerPageDropdown: [10,20,30,40,50]
    }),

    watch: {
      perPage() {
        if (this.perPage) {
          this.currentPerPage = this.perPage;
        }else{
          //reset to default
          this.currentPerPage = 10;
        }
        this.perPageChanged();
      },

      customRowsPerPageDropdown() {
        if(this.customRowsPerPageDropdown !== null && (Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.lenght !== 0))
          this.rowsPerPageOptions = this.customRowsPerPageDropdown
      }

    },

    computed: {
      paginatedInfo() {
        if (this.currentPerPage === -1) {
          return `1 - ${this.total} ${this.ofText} ${this.total}`;
        }
        let first = (this.currentPage - 1) * this.currentPerPage ? (this.currentPage - 1) * this.currentPerPage : 1;

        if (first > this.total) {
          // this probably happened as a result of filtering 
          this.currentPage = 1;
          first = 1;
        }
        
        const last = Math.min(this.total, this.currentPerPage * this.currentPage);
        return `${first} - ${last} ${this.ofText} ${this.total}`;
      },
      nextIsPossible() {
        return (this.total > this.currentPerPage * this.currentPage);
      },
      prevIsPossible() {
        return this.currentPage > 1;
      }
    },

    methods: {

      reset() {

      },

      nextPage() {
        if(this.currentPerPage === -1) return;
        if (this.nextIsPossible)
          ++this.currentPage;
        this.pageChanged();
      },

      previousPage() {
        if (this.currentPage > 1)
          --this.currentPage;
        this.pageChanged();
      },

      pageChanged() {
        this.$emit('page-changed', {currentPage: this.currentPage});
      },

      perPageChanged(event) {
        if (event) {
          this.currentPerPage = parseInt(event.target.value);
        }
        this.$emit('per-page-changed', {currentPerPage: this.currentPerPage});
      },

      getRowsPerPageDropdown() {
        return this.rowsPerPageOptions
      }

    },

    mounted() {
      this.rowsPerPageOptions = this.defaultRowsPerPageDropdown

      if (this.perPage) {
        this.currentPerPage = this.perPage;
        this.rowsPerPageOptions.push(this.perPage)
      }

      if(this.customRowsPerPageDropdown !== null && (Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0))
          this.rowsPerPageOptions = this.customRowsPerPageDropdown
    }
  }
</script>

<style lang="scss">
  
</style>
