import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.less'
import 'normalize.css'
import router from './router'

// createApp(App).use(router).mount('#app') 链式写法
const app = createApp(App)
app.use(router)
app.mount('#app')
