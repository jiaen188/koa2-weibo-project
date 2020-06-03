import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import test from '@/index'
console.log('test', test)
// import { gButton } from '@/index'

Vue.config.productionTip = false

Vue.use(test)
// Vue.use(gButton)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
