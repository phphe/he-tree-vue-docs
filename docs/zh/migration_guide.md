# 迁移指南
[更新记录 CHANGELOG](https://github.com/phphe/he-tree-vue/blob/master/CHANGELOG.md)

## v2
- 原来的`drop`事件重命名为`before-drop`事件. 拖拽结束后添加了`drop`事件.
- [store](api.md#store)的`el`重命名为`movedElement`, `originalEl`重命名为`movedOrClonedElement`.
- 添加了RTL, 边缘滚动(edgeScroll), triggerBySelf.