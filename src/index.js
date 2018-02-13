import GoodTable from './components/Table.vue';

var GoodTablePlugin = {
  install: function (Vue, options) {
    Vue.component(GoodTable.name, GoodTable);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GoodTablePlugin);
}

export default GoodTablePlugin;
export {
   GoodTable as VueGoodTable
};
