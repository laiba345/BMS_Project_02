import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  // 使用!!可以转换成布尔值
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
