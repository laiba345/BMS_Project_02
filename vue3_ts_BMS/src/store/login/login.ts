import { accoutLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

// 文件中如果有常量的话都是直接抽取出来的
const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    // 判断是否有值，有的话直接取值，没有的话就不取值了
    token: localCache.getCache('LOGIN_TOKEN') ?? '',
    name: ''
  }),
  // pinia里面的actions本来就支持异步操作
  actions: {
    // 对传入过来的账号数据的格式做出相应的限制操作
    async loginAccoutAction(account: IAccount) {
      // accoutLoginRequest是service中的
      // 1、账号登陆；获取token信息
      const loginResult = await accoutLoginRequest(account)
      // console.log(loginResult)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      // 2、进行本地缓存
      // localStorage.setItem('token', this.token)
      localCache.setCache('LOGIN_TOKEN', this.token)

      // 不能直接设置对象，需要使用到字符串的形式
      // localStorage.setItem('useInfo', { name: 'why' })
      // 需要使用到localStorage.setItem('useInfo', JSON.stringify({}))
      // 到时候取值的时候还需要通过parse()
    }
  }
})

export default useLoginStore
