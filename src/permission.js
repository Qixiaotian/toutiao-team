// 因为在请求之前的时候要检查要检测数据所以要设置全局导航前置守卫
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  // debugger
  // 1.要判断token条件是否满足以index为开始
  nprogress.start()
  if (to.path.startsWith('/index')) {
    let result = window.localStorage.getItem('login-info')
    if (result) {
      let userInfo = JSON.parse(result).token
      if (userInfo) {
        next()
      } else {
        next('/')
      }
    } else {
      next('/')
    }
  } else {
    next()
  }
})
router.afterEach(function (to, from, next) {
  nprogress.done()
})
export default router
