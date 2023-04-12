import useLoginStore from "@/store/login/login"

function usePermissions(permissionID: string) {
    const loginStore = useLoginStore()
    const { permissions } = loginStore

    // 使用Boolean或者两个 !! 可以将内容转换为布尔类型
    return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions