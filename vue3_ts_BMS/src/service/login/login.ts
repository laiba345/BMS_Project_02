import hyRequest from '..'
export function accoutLoginRequest(accout: any) {
  return hyRequest.post({
    url: '/login',
    data: accout
  })
}
