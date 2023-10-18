// 用于封装与页面模态框（PageModal 组件）相关的逻辑和操作。
import { ref } from 'vue'
// 这行代码用于导入 PageModal 组件的类型信息
import type PageModal from '@/components/page-modal/page-modal.vue'

// 这是一个类型定义，用于表示回调函数的类型。它接受一个可选的参数 data，并返回 void（没有返回值）。
type CallbackFnType = (data?: any) => void

// 这是一个类型定义，用于表示回调函数的类型。它接受一个可选的参数 data，并返回 void（没有返回值）。
function usePageModal(
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  //  在函数内部，通过 ref 创建了一个名为 modalRef 的响应式引用，
  // 类型为 PageModal 组件的实例类型 (InstanceType)。这个引用将用于访问 PageModal 组件的实例。
  const modalRef = ref<InstanceType<typeof PageModal>>()
  // 这是一个处理 "新建" 按钮点击事件的函数。
  // 它通过 modalRef.value 访问了 PageModal 组件的实例，
  // 并调用了实例的 setModalVisible 方法，然后执行可能存在的 newCallback 回调函数。
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
