<!-- src/components/AddOrEditDialog.vue -->
<template>
    <el-dialog
      v-model="visible"
      title="添加或编辑"
      width="30%"
      @close="handleClose"
    >
      <p>这里是对话框的内容。</p>
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(_, { expose }) {
      const visible = ref(false);
      const mode = ref('add'); // 默认为 'add' 模式
  
      const open = (actionMode, rowData) => {
        mode.value = actionMode;
        // 你可以根据 mode 和 rowData 设置更多逻辑
        console.log(`打开对话框，模式: ${actionMode}`, rowData);
        visible.value = true;
        console.log(visible.value)
      };
  
      const handleClose = () => {
        visible.value = false;
      };
  
      const handleConfirm = () => {
        console.log(`确认 ${mode.value} 操作`);
        visible.value = false;
      };
  
      // 通过 expose 将 open 方法暴露给父组件
      expose({ open });
  
      return {
        visible,
        handleClose,
        handleConfirm,
      };
    },
  };
  </script>
  