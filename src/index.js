import GoodTable from './components/Table.vue';

const GoodTablePlugin = {
  install: function(Vue, options) {
    Vue.component(GoodTable.name, GoodTable);
  },
};

export default GoodTablePlugin;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GoodTablePlugin);
}
