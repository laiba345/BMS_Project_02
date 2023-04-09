import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

// 函数类型的写法
type EditFnType = (data: any) => void

function usePageModal(editCallback?: EditFnType) {
  // 点击content, modal的操作
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
  }
  // @此处进行的是点击编辑的操作
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    // 如果不想拿到一个proxy对象，可以使用{ ...itemData }的形式进行操作
    // console.log(itemData.menulist)
    // console.log({ ...itemData }) // 将一个proxy对象转换为对象
    // 判断是否有回调函数
    if(editCallback) {
      // 调用你的时候，把输入传过来
      editCallback(itemData)
    }
  }
  // 也可以使用元祖，但是要注意顺序
  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal