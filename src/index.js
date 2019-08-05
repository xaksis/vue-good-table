import VueGoodTable from './components/Table.vue';
import vSelect from 'vue-select';

const VueGoodTablePlugin = {
  install(Vue, options) {
    Vue.component('v-select', vSelect);
    Vue.component(VueGoodTable.name, VueGoodTable);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueGoodTablePlugin);
}

export default VueGoodTablePlugin;
export { VueGoodTable };
