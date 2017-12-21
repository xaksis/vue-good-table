import VueGoodPagination from '@/components/Pagination'
import { mount } from 'vue-test-utils'

describe('VueGoodPagination', () => {
  it('should render correct contents', async () => {
    const wrapper = mount(VueGoodPagination, {propsData: {
      perPage: 10,
      total: 30}
    })
    await wrapper.vm.$nextTick()
    let navBtn = wrapper.element.querySelectorAll('.page-btn')
    navBtn.length.should.equal(2)
  })
})
