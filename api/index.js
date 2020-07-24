import user from './user'

export default $axios => {
  const modules = {
    user
  }
  const apiList = {}

  const createRequest = (method, url) => {
    return (data, option = {}) => {
      switch (method) {
        case 'GET':
          return $axios.get(url, { params: data, ...option })
        case 'POST':
          return $axios.post(url, data, option)
        case 'PUT':
          return $axios.put(url, data, option)
        case 'PATCH':
          return $axios.patch(url, data, option)
        case 'DELETE':
          return $axios.delete(`${url}/${data.id}`, option)
      }
    }
  }

  const temporary = []

  for (const key in modules) {
    apiList[key] = {}
    for (const k in modules[key]) {
      // 检查配置
      if (!modules[key][k].hasOwnProperty('method')) {
        console.error(`api.${key}.${k}.method is error`)
        continue
      }
      if (!modules[key][k].hasOwnProperty('url')) {
        console.error(`api.${key}.${k}.url is error`)
        continue
      }

      const api = `${modules[key][k].method}: ${modules[key][k].url}`

      // 检查重复
      if (temporary.includes(api)) {
        console.warn(`api.${key}.${k} is repeat`)
        continue
      }

      // 记录载入的api
      temporary.push(api)
      apiList[key][k] = createRequest(
        modules[key][k].method,
        modules[key][k].url
      )
    }
  }

  return apiList
}
