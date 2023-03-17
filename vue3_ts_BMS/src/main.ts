import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.less'
import 'normalize.css'
import router from './router'
import pinia from './store'

// createApp(App).use(router).mount('#app') 链式写法
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
