<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
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
import { reactive, ref } from 'vue'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import { accoutLoginRequest } from '@/service/login/login'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

// 因为在很多地方都用到了这个数据，所以可以把这个对象抽取出去，

// 1、定义account数据 ～ 抽取到了别的文件夹当中
// interface IAccout {
//   name: string
//   password: string
// }

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  // name: '',
  // password: ''
  // 定义的时候
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2、定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息～', trigger: 'blur' },
    { min: 3, max: 8, message: '必须是3～8位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    // 如果一些复杂的方式，也可以使用正则表达式
    /* {
      // pattern: /^[a-z0-9]{3, }$/,
      // message: '必须是3位以上数字或字母组成',
      // trigger: 'blur'
    } */
    { min: 3, max: 8, message: '必须是3～8位', trigger: 'blur' }
  ]
}

// 3、执行账号登陆逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  // console.log('pane-account loginAction function exec', account.name, account.password)
  // 拿到ElForm以后，我们就可以去拿里面的值 在这个表单里面的方法
  formRef.value?.validate((valid) => {
    if (valid) {
      // console.log('验证成功')
      // 1、获取用户输入的账号和密码
      const name = account.name
      const password = account.password

      // 2、向服务器发送网络请求
      // hyre 但是网络请求直接写在业务逻辑中是很不好的
      // // 我们最好是封装在一个个组件当中才好
      // loginStore.loginAccoutAction({ name, password })
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          // 如果这个东西为true；就把后面那两个东西记录下来
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          // 如果是false的情况；需要把内容删除
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      // console.log('验证失败')
      // 逻辑里面的东西是不会自动引入的
      // ElMessage还需要引入样式
      ElMessage.error('Oops, 请您输入正确的格式后再操作')
    }
  })
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
