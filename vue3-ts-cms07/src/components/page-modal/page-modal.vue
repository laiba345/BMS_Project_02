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
              <template v-if="item.type === 'custom'">
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
import useSystemStore from '@/store/main/system/system'
// import type { IModalProps } from './type'

// interface IModalConfig

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

// 0.定义props
const props = defineProps<IModalProps>()

// 1.定义内部的属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 2.定义设置dialogVisible方法
```
setModalVisible 函数用于控制模态框的显示和隐藏以及初始化模态框的数据。具体作用如下：
当调用 setModalVisible 时，可以传入一个布尔值 isNew 以及一个可选的参数 itemData。
如果 isNew 为 true，则表示打开模态框用于新建数据，并会根据 props.modalConfig.formItems 中的配置初始化 formData。
如果 isNew 为 false 并提供了 itemData，则表示打开模态框用于编辑数据，会将传入的 itemData 的属性值赋给 formData，以便编辑。
如果 isNew 为 false 但未提供 itemData，则表示打开模态框用于编辑数据，但不会传入初始数据，通常用于编辑一个新数据。
```
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
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
```
handleConfirmClick 函数用于处理用户点击模态框中的 "确定" 按钮后的逻辑。具体作用如下：

当用户点击 "确定" 按钮时，会首先隐藏模态框（dialogVisible 设置为 false）。
然后，根据当前的编辑状态（新建或编辑）以及用户输入的数据（formData）执行不同的操作：
如果是编辑状态（isNewRef.value 为 false）并且存在编辑数据 (editData.value)，则执行 systemStore.editPageDataAction，用于编辑指定数据。
否则，执行 systemStore.newPageDataAction，用于创建新的数据。在创建新数据时，将用户输入的数据与 props.otherInfo 合并，然后调用相应的 Vuex action。
```
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
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
