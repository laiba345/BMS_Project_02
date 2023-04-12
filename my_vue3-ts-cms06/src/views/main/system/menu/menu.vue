<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
// @ 对其中某一个部分进行制作的话，就是引入两个部分，一个是配置，一个是页面
import PageContent from '@/components/page-content/page-content.vue';
import contentConfig from './config/content.config'
</script>

<style scoped>
.menu {
}
</style>
