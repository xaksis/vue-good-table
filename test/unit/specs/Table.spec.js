import VueGoodTable from '../../../src/components/Table.vue'
import Vue from "vue";
window.mount = function mount(Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({propsData}).$mount()
  return vm;
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
  {name: "John", age: "20"},
  {name: "Jane", age: "24"},
  {name: "Susan", age: "16"},
  {name: "Chris", age: "55"},
  {name: "Dan", age: "40"},
  {name: "John", age: "20"},
  {name: "Jane", age: "24"},
  {name: "Susan", age: "16"},
  {name: "Chris", age: "55"},
  {name: "Dan", age: "40"},
];

describe('Table.vue', () => {
  it('should render correct contents', () => {
    const title = "Good table"
    const vm = mount(VueGoodTable, {title: title, rows: rows, columns: columns})
    vm.$nextTick(() => {
      let tableRows = vm.$el.querySelectorAll('tbody tr')
      expect(tableRows.length).to.be.equal(rows.length)
    })

  })
})
