import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.less'
import 'normalize.css'
import router from './router'
import pinia from './store'

// element-plus的引入
// 1、全局引入
// 2、按需引入：用到哪一个组件再引入
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

// createApp(App).use(router).mount('#app') 链式写法
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
