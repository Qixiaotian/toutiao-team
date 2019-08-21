import layAside from './components/home/layout-aside'
import layHeader from './components/home/layout-header.vue'
export default {
  install (Vue) {
    Vue.component('lay-aside', layAside)
    Vue.component('lay-header', layHeader)
  }
}
