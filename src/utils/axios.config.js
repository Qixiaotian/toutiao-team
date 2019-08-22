import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将后台接口的地址给axios的baseURL
axios.interceptors.request.use(function (config) {
  // 在请求之前请做一些业务处理工作 进行配置的注入
  let userInfo = window.localStorage.getItem('login-info')
  // 用户存储信息 存储的信息里面包括token
  let token = userInfo ? JSON.parse(userInfo).token : {}
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      window.location.hash = '#/'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {})
})
export default axios
