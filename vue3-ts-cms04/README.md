# day04
- 基于角色添加路由
    - 路径页面不再是写在index.ts文件中；而是将每个页面都对应创建出一个文件夹中来，在各自的文件夹配置自己的路由信息
    - 如果将所有的路由信息放到index.ts文件中也是可以的，但是可以将对应的路由放到文件夹中，目的是为了书写某些自动化的工具
        - 同页面的组织；可以创建自动化工具；
        - 自动添加页面；
    - 路由信息
        - 路径名
        - 路由名
        - 注册组件
        - 子路由

- 基于菜单来动态匹配路由
    - 动态添加路由
        - router.addRoute('main', localRoutes[0])
    - 每个页面都其对应的路由；到时候可以根据我们之前获取到的菜单来决定是否加载路由
    - 之前的做法，是定义死了；

- 动态创建页面和路由对象
    - 将每一个路由放到对应的文件夹当中
    - 需求：**根据菜单动态的添加路由对象(独立的文件中)**
        - 1、获取菜单(userMenus)
            - 代码写在位置
        - 2、动态获取所有的路由对象
            - 目前的路由对象都是放在独立的文件当中 
            - 之前放在数组当中是可以一个个获取到的
            - 从文件中将所有路由对象先读取到数组当中
                - 对于路由要是觉得太复杂了，可以直接定义死
                - 定义死，就是一个个对象；{path: ,component:}
                - localRoutes.push() 
                - 最后想获得的内容就是localRoutes ～ 包括所有的路由对象
        - 3、根据菜单匹配正确的路由
            - router.add('main', xxx)
            - 怎么通过菜单来匹配我们路由的对象呢
                - 需要研究它们的共性；路由菜单中的url和localRoutes中的path
                - 看它们是否匹配
            - 一级菜单只是点击展开，并不会进行跳转，所以不需要添加
            - 两层遍历
                - const route = localRoutes.find((item) => item.path === submenu.url)
                - if(route) route.addRoute('main', route)
            - 实现的功能其实就是登陆用户的不同加载出来的页面也是不同的
        - 将上述功能进行封装到utils中
    - 在左侧侧边栏点击不同的栏目，跳转到不同的路由 
        - 在最初的搭建的时候，对于每一个el-menu-item,里面都绑定了一个点击事件
    - main页面**刷新保持路由注册**
        - 点击登录以后，store中的login.ts只会执行一次，刷新以后那些的路由菜单都不见了
        - 在router文件夹下的index.ts中，
            - 用户进行刷新，判断用户是否登录以及包含userMenus菜单
        - 最终方案 ～ 在store => login => login.ts中
            - loadLocalCacheAction

        - store的获取必须在user(pinia之后完成)
        - 因为是default导出的，所以在另外一个地方接受的话，用什么名字是无所谓的
        - 就是在store当中，判断自己已经登陆了，才再一次获取路由；这一点很关键
        ```
         // 说明用户已经登陆了，没有登陆的话，压根不会有这些值；
        if (token && userInfo && userMenus) {
            this.token = token
            this.userInfo = userInfo
            this.userMenus = userMenus

            // 2.动态添加路由（有值的话，再动态添加路由即可）
            const routes = mapMenusToRoutes(userMenus)
            <!-- 前面的这个main指的是路由的名字 -->
            routes.forEach((route) => router.addRoute('main', route))
        }
        ```
    - 登陆进入匹配的第一个页面
        - 正常进来应该进入到我们匹配到第一个页面
        - 登陆成功时，第一次进入到的页面，应该是**动态注册所有页面中的第一个页面**
        - 操作
            - 在utils => map-menus.ts 中来获取第一个路由菜单
            - 在外部 export let firstMenu: any = null 【搞一个全局的】
                - 记录第一个被匹配到的菜单
                - if (!firstMenu && route) firstMenu = submenu
                - 最终我们需要拿到的是：firstMenu.url 
            - 来到路由总操作那一块
            ```
            // 如果是进入到main  
            if (to.path === '/main') {
                return firstMenu?.url
            }
            ```
        - 为什么可以做到？
            - 点击登录
            - 登陆成功在store => login.ts中，会进行页面跳转(main)
                - router.push('/main')
            - 在router => index.ts中当进入到main页面当中，会直接return
                - firstMenu?.url 
- 面包屑功能的实现
    - 小公司大多数都是用静态路由来决定权限的
    - 最早之前封装的components => main-menu => main-menu.vue中
        - 在el-menu中，书写了属性default-active = "3"写死了 
        - ElMenu 的默认菜单
            - 应该根据浏览器上方的路径来匹配subMenu，进而获取其中的id
            - 做法
                - 先拿到路径
                    - const route = useRoute()
                    - 拿到route.path() 
                - 在书写一个工具
                    - 在所有的菜单中，根据路径来匹配我们需要的菜单
    - 面包屑功能
        - 现在element-plus中寻找组件，并搭建组件
        - main-header中；
            - 并封装好一个独立的组件 header-crumb.vue
            - 整个的其实就是一个el-breadcrumb，然后里面的每一个都是一个el-breadcrumb-item
        - 也是需要根据路径来匹配面包屑中的东西
            - 关于面包屑想要获取到的不仅仅是展示当前的菜单，还需要展示父级的菜单
            - 也是书写一个工具类～来实现相对应的操作；这一点很关键
                - mapPathToBreadcrumbs
                - 我们想要获取到 顶层菜单和匹配菜单
                ```
                // 2.遍历获取面包屑层级
                for (const menu of userMenus) {
                    for (const submenu of menu.children) {
                        if (submenu.url === path) {
                            // 1.顶层菜单（放入的话，也是可以放入相应的对象的）
                            breadcrumbs.push({ name: menu.name, path: menu.url })
                            // 2.匹配菜单
                            breadcrumbs.push({ name: submenu.name, path: submenu.url })
                        }
                    }
                }
                ```
                - 一开始的操作，为什么我们点击之后不能匹配上呢？
                    - 因为点击之后，路径改变，但是并没有获取面包屑，
                    - 面包屑只是在刚开始进入的时候获取到了
                    - 怎么做？
                        - 用watch
                        - computed
                            - 当计算属性当中的依赖的某个值发生变化的时候；会重新计算获取新的值
                - 正常情况下，点击面包屑应该可以进行交互
                    - 操作：点击以后，都是进入到二级菜单的第一个当中
                    - 平时也会进去重定向操作，一般
                    - map-menus.ts中
                    ```
                    // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
                    // ! 只需要添加一次
                    if (!routes.find((item) => item.path === menu.url)) {
                        routes.push({ path: menu.url, redirect: route.path })
                    }
                    ```
                - 左侧菜单完成匹配，右边的每个界面也要重新进行匹配
                    - main-menu.vue
                        - 利用计算属性
                        - 让computed依赖我们的route.path 
        - 面包屑里面最主要包含两个功能
            - 一个是 :to = "path"
            - 一个是 {{ item.name }}

- 用户user界面
    - search搜索区域的布局
    - content的整体布局
        - 获取user的数据进行展示
            - el-table
            - 使用插槽来自定义column
        - 自定义el-table的column
            - 作用域插槽
            - enable
            - createAt/updateAt
                - dayjs封装utc转换
        - 分页 pagination组件的展示
        - 页码改变/点击查询/重置 需要发送网络请求
        - 删除某一条数据
    - modal的整体布局
        - 新建用户的modal
            - user-modal.vue
            - 布局组件
            - 点击确定按钮，创建数据，发送数据到服务器
        - 编辑用户的modal
            - 编辑的数据进行回显操作
            - 编辑操作网络请求
- @重点：页面的重构
    - 组件进行拷贝
        - 修改其网络请求的部分
        - store/service
    - 组件进行配置
        - page-search的配置
    - 后续会讲到如何抽取和划分组件？如何抽取高阶组件！








