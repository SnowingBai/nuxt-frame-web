import axios from 'axios'
import { Message } from 'element-ui'
import config from './config'
import store from '@/store'
import { getToken, reLogin } from '@/utils/auth'

const service = axios.create(config)

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.access_token = getToken()
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 200) {
      return res.data
    } else if (res.status === 401 || res.status === 601) {
      reLogin()
    } else {
      Message.error({
        message: res.message
      })

      return Promise.reject(res)
    }
  },
  error => {
    Message.error({
      message: error.message || '服务器异常'
    })

    return Promise.reject(error)
  }
)
