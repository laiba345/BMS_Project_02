import hyRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  // 之前封装好的一些内容
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
