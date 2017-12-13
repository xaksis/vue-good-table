import {expect} from 'chai'
import sinon from 'sinon'
import Vue from 'vue'
import VueGoodTable from '../../../src/components/Table.vue'

function mount (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({propsData}).$mount()
  return vm
}

const columns = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Age',
    field: 'age',
    type: 'number'
  }
]
const rows = [
  {name: 'John', age: '20'},
  {name: 'Jane', age: '24'},
  {name: 'Susan', age: '16'},
  {name: 'Chris', age: '55'},
  {name: 'Dan', age: '40'},
  {name: 'John', age: '20'},
  {name: 'Jane', age: '24'},
  {name: 'Susan', age: '16'},
  {name: 'Chris', age: '55'},
  {name: 'Dan', age: '40'}
]

describe('Table.vue', () => {
  it('should render correct contents', (done) => {
    const title = 'Good table'
    const vm = mount(VueGoodTable, {title: title, rows: rows, columns: columns})
    vm.$nextTick(() => {
      let tableRows = vm.$el.querySelectorAll('tbody tr')
      expect(tableRows.length).to.equal(rows.length)
      done()
    })
  })

  describe('global search', () => {
    it('should render less records', (done) => {
      const vm = mount(VueGoodTable, {
        globalSearch: true,
        rows: rows,
        columns: columns})
      vm.$nextTick(() => {
        var searchElt = vm.$el.querySelector('.global-search-input')
        searchElt.value = 'jo'
        var e = document.createEvent('HTMLEvents')
        e.initEvent('input', false, true)
        searchElt.dispatchEvent(e)
        vm.$nextTick(() => {
          let tableRows = vm.$el.querySelectorAll('tbody tr')
          expect(tableRows.length).to.be.below(rows.length)
          done()
        })
      })
    })
  })

  describe('sort', () => {
    it('should call compare once per combination (touch each value at least once)', (done) => {
      var compareSpy = sinon.stub()
      const vm = mount(VueGoodTable, {
        rows: rows,
        columns: columns
      })
      var originalCompare = vm.$data.dataTypes.number.compare
      vm.$data.dataTypes.number.compare = compareSpy
      vm.$nextTick(() => {
        vm.sort(1)
        vm.$nextTick(() => {
          expect(compareSpy.callCount).to.above(rows.length - 2)
          done()
          vm.$data.dataTypes.number.compare = originalCompare
        })
      })
    })

    it('should sort on the default by default', () => {
      const vm = mount(VueGoodTable, {rows: rows, columns: columns, defaultSortBy: {field: 'age'}})
      vm.$nextTick(() => {
        expect(vm.sortColumn).to.equal(1)
      })
    })

    it('should call sort if click on first header item', (done) => {
      const vm = mount(VueGoodTable, {rows: rows, columns: columns})
      let sortSpy = sinon.stub(vm, 'sort')
      vm.$nextTick(() => {
        vm.$el.querySelector('thead th').click()
        vm.$nextTick(() => {
          expect(sortSpy.calledWith(0)).to.equal(true)
          done()
        })
      })
    })

    it('should call sort if click on second header item', (done) => {
      const vm = mount(VueGoodTable, {rows: rows, columns: columns})
      let sortSpy = sinon.stub(vm, 'sort')
      vm.$nextTick(() => {
        vm.$el.querySelector('thead th:nth-child(2)').click()
        vm.$nextTick(() => {
          expect(sortSpy.calledWith(1)).to.equal(true)
          done()
        })
      })
    })
  })

  describe('filter', () => {
    it('should remove some rows when filtering', (done) => {
      columns[0].filterable = true
      const vm = mount(VueGoodTable, {rows: rows, columns: columns, paginated: false})
      vm.$nextTick(() => {
        var searchElt = vm.$el.querySelector('input[type=text]')
        searchElt.value = 'jo'
        var e = document.createEvent('HTMLEvents')
        e.initEvent('input', false, true)
        searchElt.dispatchEvent(e)
        vm.$nextTick(() => {
          setTimeout(() => {
            expect(vm.$el.querySelectorAll('tbody tr').length).to.be.below(rows.length).and.above(1)
            done()
          }, 420)
        })
      })
    })
  })
})
