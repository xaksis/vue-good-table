<template>
    <div class="pagination d-flex justify-content-between">
        <div class="pagination__container">
            <div
                v-for="(page) in pages"
                :key="`page-${page}`"
                :class="{'pagination__item-highlight': page === currentPage}"
                class="pagination__item-container">

                <div
                    v-if="shouldBeDisplayed(page)"
                    class="pagination__item"
                    @click="changeCurrentPage(page)">
                    {{ page }}
                </div>

                <div
                    v-if="!shouldBeDisplayed(page) && shouldBeDisplayed(page - 1)"
                    class="pagination__ellipsis-item">
                    ...
                </div>
            </div>
        </div>

        <div
            v-if="goToInput"
            class="d-flex ml-3">
            <div class="align-self-center px-2">
                Go to page:
            </div>

            <input
                v-model.number="goToInputText"
                type="number"
                class="form-control go-to-input"
                @keyup.enter="changeCurrentPage(goToInputText)">

            <button
                class="btn btn-link form-control d-inline-block go-to-button"
                @click="changeCurrentPage(goToInputText)">
                <i class="fa fa-chevron-right"/>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 10,
        },
        recordsPerPage: {
            type: Number,
            default: 10,
        },
        count: {
            type: Number,
            default: 0,
        },
        goToInput: {
            type: Boolean,
            default: true,
        },
        // buttons on either side of selected page (in the middle range)
        neighbors: {
            type: Number,
            default: 1,
        },
        // buttons to the right of the first page, buttons to the left of the last page
        endItemsRange: {
            type: Number,
            default: 2,
        },
    },
    data() {
        return {
            goToInputText: '',
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.count / this.recordsPerPage) || 1
        },
    },
    methods: {
        changeCurrentPage(page) {
            if (typeof page !== 'number') return
            let adjustedPage = page
            if (page < 1) adjustedPage = 1
            if (page > this.pages) adjustedPage = this.pages
            this.goToInputText = ''
            this.$emit('change', adjustedPage)
        },
        shouldBeDisplayed(page) {
            const isBeginningOrEnd = this.currentPage === this.pages || this.currentPage === 1
            const isInStartOrEndRange = Math.abs(this.currentPage - page) <= this.endItemsRange
            const isInMiddleRange = Math.abs(this.currentPage - page) <= this.neighbors
            const isInRange = isBeginningOrEnd ? isInStartOrEndRange : isInMiddleRange
            if (page === 1
                || page === this.pages
                || isInRange
            ) return true
            return false
        },
    },
}
</script>