import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      // @通过网络请求对返回的数据进行解构，
      const { totalCount, list } = usersListResult.data
      // @解构出来的数据进行一次次更新操作即可 
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 2.重新请求新的数据
      // @删除结束以后，还需要再次发送请求，来获取删除后的数据来进行展示
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    // 对于不同的请求，我们可以适当的传入页面
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
