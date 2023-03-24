import hyRequest from '..'
import type { IAccount } from '@/types'
export function accoutLoginRequest(accout: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: accout
  })
}
