import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router' 
import store from './store'
import icons from './global/register-icons'

const app = createApp(App) // 使用 createApp 函数创建了Vue应用的根实例。App 组件通常是应用的根组件，包裹整个应用。
app.use(icons)

app.use(store) // 这一行代码使用 Pinia 的 store 配置，将状态管理集成到Vue应用中。
app.use(router) // 这一行代码使用路由配置，将路由集成到Vue应用中。
app.mount('#app') // 这一行代码将Vue应用挂载到页面上的一个具有 id 为 'app' 的HTML元素上。这个元素通常是应用的根DOM容器。
