import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

// 创建一个 HTTP 请求客户端 hyRequest，并配置了请求的基本信息和请求拦截器，以确保每个请求都带有有效的用户认证信息（token）
// 这有助于实现用户认证和授权相关功能。
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      // 这个条件语句检查请求的配置对象 config 中是否存在 headers 属性（请求头部）且是否存在有效的用户令牌 token。
      // 如果存在有效的令牌，执行以下操作。
      if (config.headers && token) {
        // 类型缩小; 如果存在有效的令牌，这一行代码将用户令牌添加到请求的头部。
        config.headers.Authorization = 'Bearer ' + token
      }
      // 返回更新后的请求配置对象 config，以便继续发送请求。
      return config
    }
  }
})

export default hyRequest
