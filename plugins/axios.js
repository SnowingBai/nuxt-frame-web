import { Message } from 'element-ui'
import createApiList from '~/api'
import { isLogin, getToken, reLogin } from '~/utils/auth'

export default function({ $axios, redirect }, inject) {
  // 请求
  $axios.onRequest(config => {
    // 基本配置
    config.timeout = 10000
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept-Language'] = 'zh-CN'

    if (!process.server && isLogin()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }

    return config
  })

  // 请求失败
  $axios.onRequestError(() => {
    if (!process.server) {
      Message.error('网络错误，请稍后再试')
    }
  })

  // 响应
  $axios.onResponse(response => {
    const res = response.data
    if (res.status === 200) {
      return res.data
    } else if (res.status === 401 || res.status === 601) {
      reLogin()
    } else {
      Message.error(res.message)
    }
    return response
  })

  // 响应失败
  $axios.onResponseError(error => {
    if (!process.server) {
      Message.error(error.message || '服务器异常')
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 500) {
      redirect('/500')
    }
  })

  inject('api', createApiList($axios))
}
