import sinon from 'sinon'
import { mount } from 'vue-test-utils'
import VueGoodTable from '@/components/Table.vue'

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
  let wrapper, vm
  beforeEach(() => {
    wrapper = mount(VueGoodTable, {
      attachToDocument: true,
      propsData: {
        rows: rows,
        columns: columns
      }
    })
    vm = wrapper.vm
  })
  it('should render correct contents', (done) => {
    vm.$nextTick(() => {
      let tableRows = wrapper.findAll('tbody tr')
      tableRows.length.should.equal(rows.length)
      done()
    })
  })

  describe('global search', () => {
    it('should render less records', async () => {
      wrapper = mount(VueGoodTable, {propsData: {
        globalSearch: true,
        rows: rows,
        columns: columns}})
      await wrapper.vm.$nextTick()
      var searchElt = wrapper.find('.global-search-input')
      searchElt.element.value = 'jo'
      searchElt.trigger('input')
      await wrapper.vm.$nextTick()
      let tableRows = wrapper.findAll('tbody tr')
      tableRows.length.should.be.below(rows.length)
    })
  })

  describe('sort', () => {
    let originalCompare
    beforeEach(() => {
      originalCompare = wrapper.vm.$data.dataTypes.number.compare
    })

    afterEach(() => {
      wrapper.vm.$data.dataTypes.number.compare = originalCompare
    })

    it('should call compare once per combination (touch each value at least once)', (done) => {
      var compareSpy = sinon.stub()
      vm.$data.dataTypes.number.compare = compareSpy
      vm.$nextTick(() => {
        vm.sort(1)
        vm.$nextTick(() => {
          compareSpy.callCount.should.be.above(rows.length - 2)
          done()
        })
      })
    })

    it('should sort on the default by default', async () => {
      vm = mount(VueGoodTable, {propsData: {rows: rows, columns: columns, defaultSortBy: {field: 'age'}}}).vm
      await vm.$nextTick()
      vm.sortColumn.should.equal(1)
    })

    it('should call sort if click on first header item', (done) => {
      let sortSpy = sinon.stub(vm, 'sort')
      vm.$nextTick(() => {
        vm.$el.querySelector('thead th').click()
        vm.$nextTick(() => {
          sortSpy.calledWith(0).should.be.true
          done()
        })
      })
    })

    it('should call sort if click on second header item', async () => {
      let sortSpy = sinon.stub(vm, 'sort')
      await vm.$nextTick()
      vm.$el.querySelector('thead th:nth-child(2)').click()
      await vm.$nextTick()
      sortSpy.calledWith(1).should.be.true
    })
  })

  describe('filter', () => {
    it('should remove some rows when filtering', async () => {
      columns[0].filterable = true
      const wrapper = mount(VueGoodTable, {propsData: {rows: rows, columns: columns, paginated: false}})
      const vm = wrapper.vm
      await vm.$nextTick()
      var searchElt = wrapper.find('input[type=text]')
      searchElt.element.value = 'jo'
      searchElt.trigger('input')
      await vm.$nextTick()
      setTimeout(() => {
        wrapper.findAll('tbody tr').length.should.be.below(rows.length).and.above(1)
      }, 420)
    })
  })
})
