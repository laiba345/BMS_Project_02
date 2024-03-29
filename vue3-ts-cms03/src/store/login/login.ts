import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  // 可选类型使用?. 来进行操作；
  // 对于服务器返回的内容
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    // 直接从缓存中获取
    userInfo: localCache.getCache('userInfo') ?? {}, 
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 在此处设置；后续获取用户信息byID需要用到token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      // console.log(userInfoResult)
      const userInfo = userInfoResult.data //具体的信息
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      // 因为需要传入的就是id
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      // console.log(userMenus, '@')  
      this.userMenus = userMenus // 将获取到的数据都保存到state当中才行

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5.页面跳转(main页面)
      router.push('/main')
    }
  }
})

export default useLoginStore
