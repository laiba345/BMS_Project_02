<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <!-- @ 通过v-if来判断相应类型的展示操作 -->
              <template v-if="item.type === 'custom'">
                <!-- @在进行自定义的时候，继续预留我们的插槽，这一点很关键 -->
                <!-- 此处遍历出来三个插槽 -->
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// 0、同样的，一开始先定义props 别的地方需要用到，完全可以将其导
// import type { IModalProps } from './type'
export interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  // 继续设置一些内容和信息，可传也可以不传
  otherInfo?: any
}

// 此处的props就拿到了上述所有的东西
const props = defineProps<IModalProps>()

// 1.定义内部的属性
const dialogVisible = ref(false)
// 目前这里面的东西都是写死的，不想写死的话，我们可以进行相应的遍历操作
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
// @原始
// const formData = reactive<any>({
//   name: '',
//   leader: '',
//   parentId: ''
// })
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
// const mainStore = useMainStore()
const systemStore = useSystemStore()
// @之前这一块是直接全部写死了，但是我们不一定要这一块，写死了
// const { entireDepartments } = storeToRefs(mainStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false

  // @day06 用户在进行操作的时候可以传入一些别的信息，供服务器操作
  let infoData = { ...formData }
  if(props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    // @只不过我们在编辑数据的时候，没有写死，需要哪个进行网络请求，我们就用哪个
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
