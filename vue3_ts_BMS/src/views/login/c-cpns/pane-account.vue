<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

// 1、定义account数据
const account = reactive({
  name: '',
  password: ''
})

// 2、定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息～', trigger: 'blur' },
    { min: 3, max: 5, message: '必须是3～5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    // 如果一些复杂的方式，也可以使用正则表达式
    /* {
      // pattern: /^[a-z0-9]{3, }$/,
      // message: '必须是3位以上数字或字母组成',
      // trigger: 'blur'
    } */
    { min: 3, max: 5, message: '必须是3～5位', trigger: 'blur' }
  ]
}

// 3、执行账号登陆逻辑
function loginAction() {
  // console.log('pane-account loginAction function exec', account.name, account.password)

}
// 将子组件中的属性暴露出去供给父组件使用（语法糖）
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: purple;
}
</style>
