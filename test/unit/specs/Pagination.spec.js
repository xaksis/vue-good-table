import sinon from 'sinon'
import VueGoodPagination from '@/components/Pagination'
import { mount } from 'vue-test-utils'

describe('VueGoodPagination', () => {
  let wrapper, vm
  beforeEach(() => {
    wrapper = mount(VueGoodPagination, {propsData: {
      perPage: 10,
      total: 30}
    })
    vm = wrapper.vm
  })
  it('should render 2 page buttons', async () => {
    await vm.$nextTick()
    wrapper.findAll('.page-btn').length.should.equal(2)
    wrapper.contains('select').should.be.true
  })

  it('should call previousPage when the first button is clicked', async () => {
    await vm.$nextTick()
    let previousPageStub = sinon.stub(vm, 'previousPage')
    wrapper.find('.page-btn:first-child').trigger('click')
    previousPageStub.called.should.be.true
  })

  it('should call nextPage when the last button is clicked', async () => {
    await vm.$nextTick()
    let nextPageStub = sinon.stub(vm, 'nextPage')
    wrapper.find('.page-btn:last-child').trigger('click')
    nextPageStub.called.should.be.true
  })

  it('should call pageChanged during nextPage', async () => {
    await vm.$nextTick()
    let pageChangedStub = sinon.stub(vm, 'pageChanged')
    vm.nextPage()
    pageChangedStub.called.should.be.true
  })

  it('should call pageChanged during previousPage', async () => {
    await vm.$nextTick()
    vm.nextPage()
    let pageChangedStub = sinon.stub(vm, 'pageChanged')
    vm.previousPage()
    pageChangedStub.called.should.be.true
  })
})
