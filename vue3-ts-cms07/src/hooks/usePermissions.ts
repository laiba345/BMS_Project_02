import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  // 对于pinia中的store有的属性和方法；可以通过解构赋值来获取
  const { permissions } = loginStore
  // 使用!!可以转换成布尔值
  // 关于find函数：其是返回数组中第一个符合要求的元素
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
