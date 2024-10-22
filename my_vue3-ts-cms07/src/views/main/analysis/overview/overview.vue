<template>
  <el-input
    v-model="input3"
    :type="isPasswordVisible ? 'text' : 'password'"  
    style="max-width: 400px; letter-spacing: normal;"
    placeholder="Please input"
    class="input-with-select"
  >
    <template #append>
      <el-button @click="toggleVisibility" :icon="isPasswordVisible ? View : Hide" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, View, Hide } from '@element-plus/icons-vue'

const input3 = ref('')
const isPasswordVisible = ref(true)

const toggleVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value 
}
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
