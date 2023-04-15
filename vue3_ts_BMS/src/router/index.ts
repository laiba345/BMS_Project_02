import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/contants'
const router = createRouter({
  history: createWebHashHistory(),
  //映射关系：path => component
  routes: [
    // 路由重定西
    //@ routes后面放的是数组，数组里面放的依次是每个路由对象
    //@ 每个路由对象里面放的是路径和组件
    //@ 而且组件用到是路由懒加载的形式
    {
      path: '/',
      // 
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
/* 
  在vue中；路由导航守卫是用于在路由切换时触发一些特定的逻辑；
  beforeEach是其中一个常用的路由导航守卫；
  它会在每次路由切换前执行；
  @ beforeEach是一个常用的路由导航守卫；其会在每次路由切换前执行
*/
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  // @ 没有token的话；才进入到登陆页面
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})

export default router
