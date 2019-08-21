import Vue from 'vue'
import App from './App.vue'
import router from './permission.js'
import Router from './component.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/axios.config'
Vue.prototype.$axios = axios
Vue.use(Router)
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
