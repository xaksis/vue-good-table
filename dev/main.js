import Vue from 'vue'
import App from './App'
// import VueGoodTable from '../dist/vue-good-table.cjs'
// import '../dist/vue-good-table.css'
import VueGoodTable from '../src'

Vue.use(VueGoodTable);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
