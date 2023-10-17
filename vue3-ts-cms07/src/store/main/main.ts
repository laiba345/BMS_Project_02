import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  // 主要用来管理应用中的数据； 
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  // 这一行代码使用 defineStore 函数创建了一个名为 main 的 Pinia store 模块。该模块具有状态（state）和操作（actions）。状态通过接口 IMainState 进行了初始化，初始值为空数组。
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    // 这一部分定义了名为 fetchEntireDataAction 的异步操作（action）。这个操作用于从服务端获取完整的角色、部门和菜单数据
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles() // 三个方法都是在service，发送服务的文件夹当中
      const departmentsResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
