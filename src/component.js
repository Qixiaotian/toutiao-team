import layAside from './components/home/layout-aside'
import layHeader from './components/home/layout-header.vue'
// 注册面包屑组件
import breadCrumb from './components/common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('lay-aside', layAside)
    Vue.component('lay-header', layHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
