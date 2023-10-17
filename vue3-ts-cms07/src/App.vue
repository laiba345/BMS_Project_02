<template>
  <div class="app">
    <!-- <h2 class="title">当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button> -->
    // 这是一个 Element Plus 组件，它用于提供全局的配置信息。通过 :locale 属性，你将本地化语言设置为 zhCn，这通常代表中文。
    // <router-view>：这是一个 Vue Router 的路由视图组件，它用于显示当前路由对应的页面组件。
    // router-view可以理解为：而是一个占位符或插槽。它是 Vue Router 中的一个核心概念，用于渲染当前路由匹配的组件; 而是用于显示路由匹配组件的地方。通过路由的导航，你可以在应用中动态切换和加载不同的组件，而不必手动管理组件的显示和隐藏。
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { ref, nextTick } from 'vue'

// const counter = ref(100)
// const name = ref('why')
// function increment() {
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100
//   counter.value += 100

//   name.value = 'kobe'

//   // DOM操作
//   // nextTick的回调是一个宏任务还是微任务
//   // Promise.resolve().then(fn)
//   nextTick(() => {
//     const titleEl = document.querySelector('.title')
//     console.log(titleEl?.textContent)
//   })
// }
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

.test {
  // 根元素
  color: blue;

  :deep(.title) {
    font-size: 100px;
  }
}
</style>
