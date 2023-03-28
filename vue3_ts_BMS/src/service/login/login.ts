import hyRequest from '..'
import type { IAccount } from '@/types'
export function accoutLoginRequest(accout: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: accout
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // 这种借口的请求；是必须把token携带过去的；
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}
