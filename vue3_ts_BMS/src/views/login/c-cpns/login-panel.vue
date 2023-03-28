<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">广工后台管理系统</h1>

    <!-- 中间的tabs -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1、账号登陆的Pane -->
        <el-tab-pane label="账号登陆" name="account">
          <!-- 有具体的名字，使用具名茶插槽即可 -->
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登陆</span>
            </div>
          </template>
          <!-- 将ref绑定到子组件上 -->
          <paneAccount ref="accountRef"/>
        </el-tab-pane>

        <!-- 2、手机登陆的pane -->
        <el-tab-pane label="手机登陆" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登陆</span>
            </div>
          </template>
          <panePhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >立即登陆</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache';

const activeName = ref('account')
// const isRemPwd = ref(false)
// 直接通过localCache来实时获取操作；
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
// 因为我们需要实时知道其是否会被勾选；可以利用监视属性来得到
watch(isRemPwd, (newValue) => {
  // console.log(newValue)
  localCache.setCache('isRemPwd', newValue)
})
// 直接就创建出了一个paneAccount的实例
// 其实在此处，accountRef保存的是，paneAccount创建出来的实例对象
// 拿到<paneAccount />的实例
const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLoginBtnClick() {
  // console.log('点击立即登陆')
  if (activeName.value === 'account') {
    // console.log('用户在进行账号登陆')
    // 1、获取子组件的实例
    accountRef.value?.loginAction()
    // 2、调用方法
  } else {
    console.log('用户在进行验证码登陆')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
