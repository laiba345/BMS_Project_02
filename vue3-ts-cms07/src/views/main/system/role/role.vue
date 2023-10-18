<template>
  <div class="role">
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
    />
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallback,
  editCallback
)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(data2.checkedKeys)
  otherInfo.value = { menuList }
}
// 我们在展示数据的时候，是通过ElTree组件来进行展示的
// 我们通过对该实例对象上的属性进行相关操作即可
const treeRef = ref<InstanceType<typeof ElTree>>()

```
newCallback 函数：

当调用 newCallback 时，它会使用 nextTick 函数来延迟执行一些操作。
在这个函数内部，首先获取到 treeRef 引用的树形组件实例（treeRef.value)。
然后，通过 treeRef.value?.setCheckedKeys([]) 的方式将树形组件的勾选状态重置为空数组，这通常用于初始化一个新的数据项时，清空之前的勾选状态。
editCallback 函数：

同样，editCallback 函数也使用 nextTick 来延迟执行一些操作。
在这个函数内部，首先获取到 treeRef 引用的树形组件实例（treeRef.value)。
然后，通过 mapMenuListToIds(itemData.menuList) 函数将 itemData 中的菜单列表转换为一个菜单 ID 的数组。
最后，使用 treeRef.value?.setCheckedKeys(menuIds) 将树形组件的勾选状态设置为已选中的菜单 ID 数组。这通常用于编辑数据时，将之前保存的勾选状态还原到树形组件中。
这两个函数的作用是确保树形组件在新建或编辑数据时，能够正确地初始化和设置勾选状态，以便用户在界面上看到正确的数据状态。
```
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
