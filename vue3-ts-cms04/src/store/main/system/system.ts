import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0 // 后续用于分页操作
  }),
  actions: {
    async postUsersListAction() {
      const usersListResult = await postUsersListData()
      // 获取到数据以后直接进行解构赋值操作
      const { totalCount, list } = usersListResult.data
      // 保存一份到state当中
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
