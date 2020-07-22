import Storage from 'vue-cookies'

const TokenKey = 'access_token'

export function setToken(token) {
  return Storage.set(TokenKey, token)
}

export function getToken(token) {
  return Storage.get(TokenKey)
}

export function removeToken() {
  return Storage.remove(TokenKey)
}

// 返回登录页
export function reLogin(origin) {
  Storage.remove('access_token')

  // 重定向到登录页
  origin = origin || ['/403', '/404'].includes(window.location.pathname)
  const redirectUri = origin
    ? window.location.origin
    : window.location.origin + window.location.pathname

  window.location.href = `/login?redirect_uri=${redirectUri}`
}

// 本地登录校验
export const isLogin = () => {
  return !!Storage.get('access_token')
}
