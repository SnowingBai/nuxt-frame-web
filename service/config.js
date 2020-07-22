/*
 * @created: Tuesday, 2020-07-21 14:13:40
 * @author: spc-baix
 * ---------
 * @desc axios配置文件
 */

export default {
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT ||
    3000}`,
  // 自定义请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
    'Accept-Language': 'zh-CN'
  },
  // 设置超时
  timeout: 10000,
  // 跨域请求时是否需要凭证
  withCredentials: true
}
