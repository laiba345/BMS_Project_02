321
  - 按钮的权限管理  
    - 增删改查；不是每个人都有这几个功能
  - 判断某个角色是否有这个权限
  - 角色管理中进行分配权限；在菜单管理下的角色列表处
  - userMenus
    - id 可能是动态生成的
    - name 是文本的东西，最好不要用做唯一标识
    - 后台在书写接口的时候，创建了一个唯一标识：permission
  - 之前在左侧菜单的展示中，我们是把菜单映射出来；现在我们需要将按钮权限弄出来
  - 在store的login.ts 中，我们之前是拿到过菜单并本地缓存的
    - login.ts中；又是一个userMenus到permission的映射关系
    - 之前在工具中已经书写了很多映射函数；可以再加一个

- 322
  - 其实增删改查最核心的逻辑是在page-content页面当中
  - 所以我们操作也是针对此处来进行
  - 查询的权限对应于fetchPageListData，page-content中
    - 因为如果查询权限都没有，数据压根就不进行展示
  - 因为每一个页面都需要进行判断按钮权限，所以需要抽取出来
  - 抽取到hooks中

- 323
    - 之前在store => main => main.ts中是有整体的角色、部门、菜单等
    - 在新建角色的之后；或者每次对一个角色操作之后；可以再发一次请求，获取最新的数据才行
    - 在store => main => system.ts 中针对页面的操作，
        - 第三步来获取完整的数据
    - 在进行创建的时候，我们需要知道完整的数据来自哪里，这一点很重要！！
    - 在进行完某些操作以后；如果想要在页面中获取最新的数据，需要重新发送请求

- 324
    - 在components中的main-header是写死的，头像和名字
    - 在header-info中动态获取新的名字信息
        - 从useLoginStore来进行获取
    - 点击编辑的时候，进行回显，但是点击新建的时候也进行了相应的回显
        - 新建角色，弹出来也只是在我们的角色页面
        - 在editCallback进行了一个简单的数据回显操作
        - 我们可以再创建一个数据回显操作
        - 设置为空数组；即可  treeRef.value?.setCheckedKeys([])
            - 这里是为了我们在新建数据的时候，进行回显的时候，肯定需要清楚
        - 在hooks中的usePageModals中创建两个更新的回调
            - 还是使用到了nextTick():因为这里的这个东西的更新是异步的
            - 在某处做一些操作的时候，可能是不生效的
            - 最主要还是因为这里是公用一个组件来显示
    - 用户管理用的是子组件，不是用的公用组件
    - 使用用户的权限判断即可
        - 在c-cpns下面的user-content.vue中根据用户的权限进行判断
            - 创建一个标识符号来进行相关的操作即可
            - const isCreate = usePermission('users: create')
            - 在样式中，通过v-if来进行判断请求
- 325
    - 部门管理
        - 页码在第二页中，点击添加角色，添加以后页面跳转到了第一页，但是下标还是在第二页
        - 目的：只要是点击新建、编辑、删除中的一个，我们都要重新刷新整个页面的数据  
            - page-modal点击确定 => page-content要回到第一页(跨组件通信)
            - 1、兄弟组件之前到通信，借助于父组件（推荐）
            - 2、EventBus(容易让项目失控，不好查询) 项目不好实现
            - 3、它们都在 systemStore中相应的actions中有很多方法(delete、new...)
                - 判断actions中有没有执行上述那几个操作，只要在上述执行了这几个操作，我们就让pagesize归0
                - 只需要更改currentPage.value
                - !!! 在page-content.vue中进行相应的监听操作、监听systemStore中的action是否被执行
                    - 使用一个新的API监听即可
                        - systemStore.$onAction(()=> {})
                            - 只要actions执行了就可以被监听到；
                            - 这是pinia为我们提供的全新的API
                            - 发送网络请求以后再进行监听操作
                            - 监听的action是有参数的
                                - args；包含name属性
                                - after；在这些actions执行完毕以后才会来它这里
                            - 其中参数中是可以获取到name

- 326
    - 搭建echarts图片展示组件 views => main => dashboard.vue
    - flex布局；上面和下面都给了一个固定的高度，中间部分使用flex:1;占据剩下的所有内容
    - 在dashboard中的，count-card.vue中，里面有很多的属性我们不应该写死
        - 数据是动态的，我们必须定义props
        - interface IProps
        - 可以通过withDefault(defineProps<IProps>(), {})
            - 来定义相应的属性

- 327
    - 我们拿到数据以后，想要进行动态的展示数据
    - 使用postman来查询接口
    - 1、service => main => analysis
    - 2、store => main => analysis（专门搞一个Store来管理所有的内容）
    - 3、一进入到页面中就需要发送相应的网络请求；这一点很关键
        - 引入相应的获取数据的，发送网络请求的方法
        - 先获取store，再通过store调用获取数据的方法
        - 获取到的数据需要转换为响应式的
        - 而且绑定的时候，不需要一个个书写，直接使用v-bind
            - 保持一致的话就可以用语法糖

328
    - 服务器返回的数据可能是非常复杂的，而且不是你想要的，你需要对数据先进行处理
        - 书写一个function，不要在页面中通过.来拿数据；后期不好维护
        - 所以对工作进行分层即可；分层架构
    - 给数字添加一个动态展示的效果
        - 使用npm install countup.js
        - 拿到某个类
            - import { CountUp } from 'countup.js'
        - 然后根据这个类来创建实例对象
            - const countUp1 = new CountUp(arg1, arg2)
                - 参数一：执行动画的元素
                - 参数二：数字增加10000
            - 因为在setup里面的内容有可能压根没有拿到元素；上面的DOM有可能压根还没有渲染
            - 只要我们用到了DOM，我们需要在onMounted这个钩子里面执行
                - 通过start() 表示开始执行
    - 通过interface定义的组件；然后通过defineProps定义好以后，这个组件里面所有的属性在DOM中都可以拿来使用
    - 关于是否添加某些判断的时候，可以使用三元运算符来指定添加某些东西

- 329
    - echarts中可以注册主题
        - 如：echarts.registerTheme
        - 可以将echarts进行相对应的封装
        - page-charts用于封装多个组件
        - 也可以在index.ts中进行统一的导出，这样在别的地方引入的话，不用写太深的导入
        - 高度什么的不应该写死的；
    - 一开始的封装；只能够展示饼图；但是需要展示多个；里面的配置太多了；
    - 对base-charts进行抽取
        - 对饼图进行一个抽取操作；
        - 对于base-charts中的配置options不要写死；
            - 通过书写interface IProps
            - 然后defineProps  让别人传入自定义的一些属性
            - 有时候对象类型检测出问题的时候，
                - 饼图负责传入option即可
    - 如果有多个导出的话，可以使用export{}来进行操作
        - export {  }
    - 数据不能写死；
    总结
        - 基础：base-echart
            - pie
            - line

- 330
    - 玫瑰图的配置
        - 饼图的一种
        - 在service => main => service中获取网络请求
        - 在store => 
        - 获取到的数据，需要转换成我们想要的格式
            - 书写一个简单的映射函数即可
        - 折线图 + 柱状图
            - 映射出来的数据；使用v-bind

- 331 
    - 地图的展示
        - 1、注册一个地图
            - 
        - 2、需要数据
            - JSON数据
        - 通过ChinaJSON可以进行数据的转换操作
    - 地图是根据坐标和经纬度，给我具体的某个点，给到经纬度；然后观察具体的位置在哪里
        - 有一个转换经纬度的函数
    - 服务器可能会一次性返回不同的数据，也可能一次性把数据都返回给你
    - 图形的缩放效果
        - base-echarts中；3、监听window缩放问题
        - window.addEventListener()

- 332
    - 某些同时代码不规范；但是其没有ctrl + s；然后就将这些代码提交到了git仓库里面
    - 对该过程进行约束
    - 就是我们在提交代码的时候，自动进行约束操作；一定进行格式化
        - package.json
            - "script" => "lint"
        - 执行操作 npm run lint
            - 找到不符合规范的内容；将其变为规范的代码
    - 使用husky工具；
        - 是git hook 工具
        - npm husky-init && npm install (命令)
            - 失败的原因
                - 电脑没有git
                - 项目当中必须包含git仓库；其实就是那个.git 文件
                    - 解决：git init
                    - 总文件夹中有一个.husky文件夹
                        - pre-commit 中配置命令npm run lint
    
- 333
    - git commit 规范
    - 代码提交验证
        - 安装Commitizen
    - 查看day01 项目搭建和接口文档.md
    - 查看文档；观察这些相关的命令操作

- 334
    - 




