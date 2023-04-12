<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// 1.定义内部的属性
const dialogVisible = ref(false)
// 需要用到什么样的数据，先定义下来(初始值)，不过初始值可以为空
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
// @使用解构赋值的操作将角色数据和部门数据，并转换为响应式的
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  // 需要根据传入的数据来决定是否显示密码
  isNewRef.value = isNew
  // 表示不显示密码，表示编辑操作
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      // for循环进行初始化回显操作
      formData[key] = itemData[key]
    }
    // 将itemData中的数据保留下来
    // 上面是对数据进行相应的回显操作
    editData.value = itemData
  } else {
    // 新建数据，这里是新建数据的逻辑
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  // formData可以自动收集好所有的数据
  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据（把一开始传入过来的数据保存的目的就是为了获取id）
    // @创建新用户和更改编辑新用户都是通过调用最新的方法来实现的
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 创建新的用户，formData就是上述表格收集到的数据
    systemStore.newUserDataAction(formData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
