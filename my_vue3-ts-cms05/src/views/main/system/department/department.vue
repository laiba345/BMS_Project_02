<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <!-- 一般不会在此处写死，而是通过作用域插槽将内容拿回来 -->
      <!-- <template #leader="scope">哈哈哈:{{ scope.row.leader }}</template>
      <template #parent="scope">呵呵呵:{{ scope.row.parentId }}</template> -->

      <!-- 甚至可以自定义样式: -->
      <template #leader="scope">
        <span class="leader">哈哈哈:{{ scope.row.leader }}</span>
      </template>
      <template #parent="scope">
        <span class="parentId">呵呵呵:{{ scope.row.parentId }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
// import PageContent from './c-cpns/page-content.vue'
import PageContent from '@/components/page-content/page-content.vue'
// import PageModal from './c-cpns/page-modal.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'

// @因为是先拿到modal.config中，对里面的内容进行相应计算
// @计算属性
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map(item => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach(item => {
    if(item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  console.log(modalConfig)
  return modalConfig
})

// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.leader {
  color: red;
}
</style>
