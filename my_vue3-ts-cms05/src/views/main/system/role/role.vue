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
    <!-- 对于刚才的展示是不满意的 自己是什么插槽，自己肯定是知道的 -->
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <!-- 因为我们是知道自己的组件名字，所以可以直接书写 -->
      <!-- 具名插槽，在template中书写了，要么用简写# 或者v-slot: 的形式 -->
      <template v-slot:menulist>
        <!-- 将此处变成我们想要展示的菜单列表即可 -->
        <!-- 将要展示的数据放在此处即可 -->
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
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContents'
import useMainStore from '@/store/main/main'

import { mapMenuListToIds } from '@/utils/map-menus'

// @逻辑关系 在相应的组件中，会发生相应的事件，我们进行相应的绑定操作即可
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// @ 可以通过该回调函数，将数据返回到modalRef界面当中
const { modalRef, handleNewClick, handleEditClick } = usePageModal(editCallback)

// @获取完整的菜单
const mainStore = useMainStore()
// 解构，并获取响应式数据
const { entireMenus } = storeToRefs(mainStore)

// @往一个页面中传入一些额外的数据
const otherInfo = ref({})

// @上述check有两个参数，可以分别打印拿到对应的结果参数即可
// 上方el-tree是中@check绑定的回调方法有两个参数，自己学会看文档进行操作
function handleElTreeCheck(data1: any, data2: any) {
  // 想要拿到的列表信息都是保存在menuList当中的
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuList)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
// @别的地方调用的时候传了数据过来，此处也是需要一个参数来进行接收
function editCallback(itemData: any) {
  // console.log('点击了编辑', itemData)
  // console.log(itemData.menuList) 此处是一个对象，而且里面的对象是层层嵌套的
  // 在这个组件中有很多的属性和方法，专门是为了操作相应的内容
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    // console.log(menuIds)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
