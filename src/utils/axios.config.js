import axios from 'axios'
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
export default axios
