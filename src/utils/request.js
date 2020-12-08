import axios from "axios"
import { message as Message } from "./resetElComponents/message"
import Cookies from "js-cookie"

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 显示提示
  Message.error({
    message: error.message,
    type: 'error',
    showClose: true,
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = Cookies.get('token')
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = token //请求头加上token
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      return dataAxios
    } else {
      switch (code) {
        case 0:
          return dataAxios.data
        case 999:
          // token失效
          // app.$store.dispatch('d2admin/account/logout', { root: true })
          errorCreate('登陆失效，请重新登陆')
          break
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          // errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          errorCreate(`${dataAxios.msg}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
