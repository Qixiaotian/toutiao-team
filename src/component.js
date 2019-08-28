import layAside from './components/home/layout-aside.vue'
import layHeader from './components/home/layout-header.vue'
// 注册面包屑组件
import breadCrumb from './components/common/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './components/publish/cover-image.vue'
import selectImg from './components/publish/select-images.vue'
export default {
  install (Vue) {
    Vue.component('lay-aside', layAside)
    Vue.component('lay-header', layHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverImg)
    Vue.component('select-images', selectImg)
  }
}
