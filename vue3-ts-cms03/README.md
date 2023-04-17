# day03
- 登陆页面
    - 路由导航守卫
        - 概念：路由导航守卫用于在路由导航中控制页面的访问权限和跳转逻辑。
        - 三种类型
            - beforeEach ：**在进入路由前执行**，可以用来进行全局的权限校验、**登录状态验证**等操作。
            - beforeResolve：**在路由解析完成之后，但是在组件被渲染之前执行**，可以用来进行**路由数据的预处理、异步组件的加载**等操作。
            - afterEach：在**离开当前路由时执行**，可以用来进行页面统计、清除定时器等操作。
        - **在每种守卫中，可以通过传入一个回调函数来实现相应的逻辑**。例如，通过在beforeEach守卫中判断用户是否已经登录，如果未登录，则可以通过next(false)取消路由导航，否则**通过next()继续执行路由导航。**

        - 在本路由组件中，只有登陆成功才能真正进入到main页面；标准就是：查看页面是否有token
    - 记住密码功能
        - 通过v-model来进行数据双向绑定
        - 通过监视属性watch；来监视isRemPwd，观察其值是否改变；
        - 将isRemPwd字段存入localStorage当中
    - main权限管理
        - RABC；基于角色访问控制；权限管理；
        - 后台数据库表

        - 在components中配置main-header;main-menu;先配置出相应的主界面出来
    - 请求用户信息；根据用户角色来
    - 根据用户的角色来获取菜单信息
        - 在service中；书写getUserInfoById、getUserMenusByRoleId
        来获取用户信息和菜单信息
        - 在store中获取用户信息，菜单信息存取到store中；
    - 上述操作结束后；将userInfo；userMenus进行本地存储

- 首页的页面搭建
    - 整体的页面布局 ElContainer
        - 在view => main => main.vue
        - 引入了component中的两个公用组件
    - 侧边栏的菜单Menu
        - 分析ElMenu每个组件的作用
        - 先手动搭建整个菜单的结构
        - 根据userMenus动态遍历
            - 获取store中的userMenu
                - const userMenus = loinStore.userMenus
            - 拿到该数据，可以先了解内部结构：内部是多层次的，菜单都分为多层次
            - 一行中既要展示字符又要展示图标
                - 使用插槽来进行相应处理操作
                - 可以使用动态组件的思想来生成图标
            - 菜单
                - 最大的菜单
                    - el-menu
                - 二级菜单
                    - el-sub-menu
                - 二级菜单下的多个菜单标题
                    - el-menu-item
    - Main当中头部Header的展示
        - menu-icon的图标点击后具有折叠效果
            - 点击切换自己的图标
            - 切换aside的宽度
                - 本质就是根据子组件传过来的是否折叠来改变el-aside的样式
                - <el-aside :width="isFold ? '60px' : '210px'">
            - 切换menu的折叠效果
        - 操作
            - main-header.vue中；
                - const emit = defineEmits(['foldChange'])
                -   // 2.将事件和状态传递给父组件        emit('foldChange', isFold.value)  将事件和数据状态传递给父组件；
            - main.vue
                - 一开始默认不折叠
                - 父组件拿到数据后；根据isFold的值来判断是否进行折叠
    - 个人信息的展示
        - header-info.vue;
            - 下拉菜单中； <el-dropdown-menu>
            - 如果下拉菜单中有多个子标题使用<el-dropdown-item>
            - 退出系统的逻辑很简单
                - 浏览器清除token
                - 路由跳转到login界面即可
    - 注册所有的路由，页面进行跳转
        - 我们采用动态的菜单进行权限管理
        - 但是所有的菜单都被注册进去了
    


         
