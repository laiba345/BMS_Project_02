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
  - 
