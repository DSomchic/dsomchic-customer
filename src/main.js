import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import Web3 from 'web3'
import VueClipboard from 'vue-clipboard2'
import Contract from '@/utils/contact'
import VueElementLoading from 'vue-element-loading'
import 'buefy/lib/buefy.css'
import 'begeta/css/begeta.min.css'

import 'mdi/css/materialdesignicons.min.css'

Vue.config.productionTip = false
Vue.use(Buefy)

Vue.component('VueElementLoading', VueElementLoading)

let web3 = null
if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
} else {
  console.log('Please login Metamask.')
}
const contract = new web3.eth.Contract(Contract.abi, Contract.address)
Vue.prototype.$web3 = web3
Vue.prototype.$contract = contract
Vue.config.productionTip = false

Vue.use(VueClipboard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
