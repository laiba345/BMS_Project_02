<template>
  <div class="user">
    <!-- 
      下面的@query-click和@reset-click其实对应的就是
      user-search组件中的自定义事件
     -->
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// 对content组件的操作 
// @拿到组件中的 UserContent写法；这一点很关键
// @在user.vue中，对子组件user-content组件操作
const contentRef = ref<InstanceType<typeof UserContent>>()
// @user-content中的fetchUserListData
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  // console.log('@@', modalRef.value)
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  // console.log(itemData)
  // console.log('@@', modalRef.value)
  // @ modalRef.value其实就是一个代理对象，可以获取modalRef组件中的属性和方法
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
