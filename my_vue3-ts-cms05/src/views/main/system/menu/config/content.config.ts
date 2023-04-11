const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    // 如果需要二级进行展开的话，不能使用type，写了type
    // 写的宽度不合适自己调整即可
    { label: '菜单名称', prop: 'name', width: '180px' },
    { label: '级别', prop: 'type', width: '120px' },
    { label: '菜单url', prop: 'url', width: '150px' },
    { label: '菜单icon', prop: 'icon', width: '150px' },
    { label: '排序', prop: 'sort', width: '120px' },
    { label: '权限', prop: 'permission', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '150px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '150px' },
    { type: 'handler', label: '操作', width: '150px' }
  ],
  // 上面都没有问题，有问题的一块就是每一个分类可能有自己的子菜单
  childrenTree: {
    // 需要有自己的唯一标识
    rowKey: 'id', 
    treeProps: {
        children: 'children'
    }
  }
}

export default contentConfig
