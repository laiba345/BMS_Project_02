import { ref } from 'vue'
// 用于导入 PageContent 组件的类型信息，以便在后续代码中使用。
import type PageContent from '@/components/page-content/page-content.vue'

// 自定义 Composition API 钩子函数，用于封装与页面内容（PageContent 组件）相关的逻辑和操作
function usePageContent() {
  // 通过 ref 创建了一个名为 contentRef 的响应式引用，
  // 类型为 PageContent 组件的实例类型 (InstanceType)。
  // 这个引用将用于访问 PageContent 组件的实例。
  const contentRef = ref<InstanceType<typeof PageContent>>()
  // 这是一个处理查询按钮点击事件的函数。
  // 它通过 contentRef.value 访问了 PageContent 组件的实例，并调用了实例的 fetchPageListData 方法，传递了 queryInfo 参数。
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
