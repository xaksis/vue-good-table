import VueGoodTable from './components/Table.vue';

const VueGoodTablePlugin = {
  install(Vue, options) {
    Vue.component(VueGoodTable.name, VueGoodTable);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueGoodTablePlugin);
}

export default VueGoodTablePlugin;
export { VueGoodTable };
