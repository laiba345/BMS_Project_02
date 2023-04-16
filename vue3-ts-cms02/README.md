day02
- ElementPlus的按需引入：需要安装两个插件

- !!! 想要拿到具体某一个组件的实例，可以使用ref打标识；
```
const accountRef = ref<InstanceType<typeof PaneAccount>>()
```
    - 然后下方通过上述书写形式来获取最终的类别； 
    - 注意：InstanceType关键字；PaneAccount是组件标识
    - 组件名我们一般用key-case的形式来表示

- css中的vw和vh
    - 100vw和100vh是CSS中的单位，分别表示视口宽度和视口高度。
    - 其中，vw表示视口宽度的百分比，即**1vw等于视口宽度的1%。同理，vh表示视口高度的百分比，即1vh等于视口高度的1%。**
    - 使用这些单位可以让页面元素相对于视口尺寸来设置位置和大小。例如，**一个元素设置width: 100vw; height: 100vh;将完全占据整个视口。**

- 搭建登陆页面
    - 背景的搭建 100vh / 100vw
    - 登陆页面panel
        - 整体页面的搭建
            - 拆分组件(主体 + 账号密码登陆/手机验证码登陆)
            - 将能拆分的组件尽量拆开
        - tabs的搭建过程
        - 账号登陆form
            - 通常一个文件夹下都有一个index文件用于整体进行导出
        - form的校验规则
            - 类型：FormRules
        - 点击立即登陆功能
            - 父子组件通信（父组件中点击，执行子组件中的函数）
            - defineExpose() ～ 子组件需要将参数或者方法等暴露出去
                - **defineExpose是一个新API，它允许组件公开一些内部属性或方法给其子组件使用。该方法只在setup函数中调用。**
                - **当defineExpose被调用时，其参数会被暴露给父级组件**，这样就可以通过子组件访问它。换句话说，defineExpose可以使得子组件可以访问父组件的私有属性和方法。
            - 想要拿到具体某一个组件的实例，可以使用ref打标识；
    - 登陆操作
        - form通过验证
            - formRef.validate(回调)
            - form组件的实例 
            ```
            const formRef = ref<InstanceType<typeof ElForm>>()
            ```
        - 登陆接口的调用
            - post请求
                - 放置在service当中；
            - 传入data；格式要正确
        - 登陆操作的一系列内容；放在store当中
        - 需要传入的一些数据类型，直接放置在type文件夹中
        - token缓存操作 => cache的封装
        - 组件中的操作
            - 拿到store直接可以调用其中方法，并且将数据传入{}
        - store中的操作
            - 使用async/await来获取数据
            - 可以获取到：id、name、token三个数据
            - 但是token我们想要永久拿到；所以使用了本地缓存；
- 难点：封装Cache；里面封装了localStorage方法和sessionStorage方法
    - localStorage是Storage类型之一。在Web浏览器中，localStorage是一个用于存储数据的对象，它提供了在浏览器关闭后仍然能够保存数据的能力。
    - 直接在Cache类中，封装了新增；获取；修改；清空这几种情况
    - 创建两个实例；导出；供别的组件调用即可
    ```
    const localCache = new Cache(CacheType.Local) 
    const sessionCache = new Cache(CacheType.Session)
    export { localCache, sessionCache }
    ```
    

    


