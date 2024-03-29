# API
## 基础树
## props
### value
* type: [TreeData](#treedata-2), required
* 详细: 树要显示的数据.
* 例子: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]`

### indent
* type: Number, default: 20
* 详细: 缩进, 单位是px

### rtl
* type: boolean
* 详细: 支持从右往左的显示和拖拽.

### rootNode
* type: [Node](#node), default: {}
* 详细: 树的虚拟根节点, 可以对根节点进行设置.

## data
### trees
* 类型: {tree.\_uid: tree}
* 详细: 存储了目前存在的所有树的vm实例

### treeClass
* 类型: String
* 详细: 给树的顶层的添加class名. 当通过extends或mixins使用时, 可以不更改模板而自定义顶层class.

### treeId
* 类型: String
* 详细: 随机字符串. mounted之后才可用.

## computed
### treeData
* 详细: [value](#value)的别名

## methods
### iteratePath
* 类型: (path: [Path](#path), [options: Object]) => Generator
  * options: 配置
    * {Boolean} reverse: 倒序
* 详细: 遍历给定path
* 例子:
  ```js
  for (const {node, path} of this.iteratePath([0,0,0,1], {reverse: true})) {
    //
  }
  ```

### getTreeVmByTreeEl
* 类型: (treeEl: HTMLElement) => [Tree](#tree)
* 详细: 通过树的HTML元素获得vm实例.

### getAllNodesByPath
* 类型: (path: [Path](#path)) => [Node[]](#node)

### getNodeByPath
* 类型: (path: [Path](#path)) => [Node](#node)

### getPathByBranchEl
* 类型: ([branchEl](#tree-branch): HTMLElement) => [Path](#path)

### getBranchElByPath
* 类型: (path: [Path](#path)) => [branchEl](#tree-branch)

### getNodeByBranchEl
* 类型: ([branchEl](#tree-branch): HTMLElement) => [Node](#node)

### getNodeParentByPath
* 类型: (path: [Path](#path)) => [Node](#node)

### removeNodeByPath
* 类型: (path: [Path](#path))

### walkTreeData
* 类型: (handler, options) => [ut.walkTreeData(this.treeData, handler, options)](#walktreedata-2)
* 详细: 绑定当前树treeData的工具方法.

### cloneTreeData
* 类型: (options) => [ut.cloneTreeData(this.treeData, options)](#clonetreedata-2)
* 详细: 绑定当前树treeData的工具方法.

### getPureTreeData
* 类型: () => [ut.getPureTreeData(this.treeData)](#getpuretreedata-2)
* 详细: 绑定当前树treeData的工具方法. 获取当前树的纯净数据.

## slots
### default slot
* 类型: scoped slot{node: [Node](#node), index: Number, path: [Path](#path), tree: [Tree](#tree)}
  * index: 节点在父级中的序号
* 默认渲染:
  ::: v-pre
  `{{node.text}}`
  :::
* 详细: 默认插槽, 自定义节点的渲染.
* 例子:
```html
<div v-slot="{node, index, path, tree}">{{node.title}}</div>
```

## render hooks
模板钩子, 渲染钩子. 用以自定义模板. 适用于通过extends或mixins使用时. 适合在data或methods里定义.
### overrideSlotDefault
* 类型: ({node: [Node](#node), index: Number, path: [Path](#path), tree: [Tree](#tree)}, original) => [JSX](#jsx)
  * {Function} original: 执行可返回默认模板
* 详细: 覆盖[默认插槽](#default-slot). 用于自定义节点的渲染.
* 例子:
  * 在节点头部和尾部添加按钮.
    ```js
    overrideSlotDefault({node, index, path, tree}, original) {
      return <div>
        <button>before</button>
        {original()}
        <button>after</button>
      </div>
    }
    ```
  * 自定义节点显示的文本.
    ```js
    overrideSlotDefault({node, index, path, tree}, original) {
      return <div>
        {node.title}
      </div>
    }
    ```

### blockHeader
* 类型: () => [JSX](#jsx)
* 详细: 在树的头部插入模板.

### blockFooter
* 类型: () => [JSX](#jsx)
* 详细: 在树的尾部插入模板.

## 节点特殊属性
基础树中, 节点的特殊属性.
### $hidden
* type: Boolean
* 详细: 隐藏节点

### $xxxClass
* type: String
* 详细: 定义对应HTML元素的class. 有$branchClass, $nodeBackClass, $nodeClass, $childrenClass.

### $xxxStyle
* type: [Object, String]
* 详细: 定义对应HTML元素的style. 有$branchStyle, $nodeBackStyle, $nodeStyle, $childrenStyle.

## 静态方法
### mixPlugins
* 类型: (plugins: Plugin[]) => VueComponent
* 详细: 混合基础树与给定的插件, 返回新组件

## 折叠插件
## props
### foldingTransitionName
* type: String
* 详细: 折叠的过渡效果名.

### foldingTransition
* type: Vue
* 详细: 折叠的过渡效果组件.

### foldAllAfterMounted
* type: Boolean
* 详细: 挂载后折叠所有节点.

## 节点特殊属性
此插件中, 节点的特殊属性.
### $folded
* type: Boolean
* 详细: 节点是否折叠.

## methods
### fold
* 类型: (node: [Node](#node), path: [Path](#path))
* 详细: 折叠节点.

### unfold
* 类型: (node: [Node](#node), path: [Path](#path), [options: Object])
  * options:
    * foldOthers: false, 把其他分支上的节点关闭
* 详细: 打开节点.

### toggleFold
* 类型: (node: [Node](#node), path: [Path](#path), [options: Object])
  * options: 传给fold或unfold
* 详细: 切换节点的折叠状态.

### foldAll
* 类型: () => undefined
* 详细: 折叠所有节点.

### unfoldAll
* 类型: () => undefined
* 详细: 打开所有节点.

## events
### node-folded-changed
* 类型: (node: [Node](#node))
* 详细: 节点被打开或折叠.

### nodeFoldedChanged
* 类型: (node: [Node](#node))
* 详细: `node-folded-changed`的别名. 将来会被弃用.

## 勾选框插件
## methods
### check
* 类型: (node: [Node](#node), path: [Path](#path))

### uncheck
* 类型: (node: [Node](#node), path: [Path](#path))

### toggleCheck
* 类型: (node: [Node](#node), path: [Path](#path))
* 详细: 切换节点的勾选状态.

## 拖拽插件
## props
### triggerClass
* type: String, default: 'tree-node'
* 详细: 触发拖拽的元素的class.

### triggerBySelf
* type: Boolean, default: false
* 详细: 阻止子元素触发拖拽.

### draggable
* type: [Boolean, (tree: [Tree](#tree), store: [Store](#store)) => [IsDraggable](#isdraggable)], default: true
* 详细: 启用该树的drag功能

### droppable
* type: [Boolean, (tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)], default: true
* 详细: 启用该树的drop功能

### eachDraggable
* type: [undefined, Boolean, Function]
  * undefined: 继承父节点
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDraggable](#isdraggable)
* 详细: 单个节点是否draggable

### eachDroppable
* type: [undefined, Boolean, Function]
  * undefined: 继承父节点
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* 详细: 单个节点是否droppable

### ondragstart
* type: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* 详细: 钩子, 是否阻止拖拽

### ondragend
* type: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* 详细: 钩子, 是否阻止本次拖拽结果

### unfoldWhenDragover
* type: Boolean, default: true
* 详细: 当拖拽到节点上时, 如果这个节点是折叠的, 是否打开它

### unfoldWhenDragoverDelay
* type: Number, default: 30, 单位: 毫秒
* 详细: 当拖拽到节点上时, 如果这个节点是折叠的, 停顿多少毫秒才打开它

### draggingNodePositionMode
* type: 'top_left_corner'|'mouse', default: 'top_left_corner'
* 详细: 如何定位拖拽节点. top_left_corner: 拖拽节点左上角; mouse: 鼠标位置

### edgeScroll
* type: Boolean
* 详细: 启用边缘滚动

### edgeScrollTriggerMargin
* type: Number, default: 50
* 详细: 边缘滚动触发的距离.

### edgeScrollSpeed
* type: Number, default: 0.35
* 详细: 边缘滚动触发的速度.

### edgeScrollTriggerMode
* type: 'top_left_corner'|'mouse', default: 'top_left_corner'
* 详细: 如何触发边缘滚动. top_left_corner: 拖拽节点左上角触发; mouse: 鼠标位置触发

### edgeScrollSpecifiedContainerX
* type: HTMLElement | (store) => HTMLElement
* 详细: 指定触发横向边缘滚动的父级元素

### edgeScrollSpecifiedContainerY
* type: HTMLElement | (store) => HTMLElement
* 详细: 指定触发纵向边缘滚动的父级元素

### preventTextSelection
* type: type: Boolean, default: true
* 详细: 阻止拖动时文字被选中. 将会在部分事件中执行event.preventDefault()

### crossTree <Badge text="pro"></Badge>
* type: [Boolean, Function], default: false
  * Function: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* 详细: 是否允许跨树. 跨树拖拽时两棵树都需开启此项.

### maxLevel <Badge text="pro"></Badge>
* type: Number
* 详细: 树允许的最大层级数, 拖拽时以此判断是否可放置.

### cloneWhenDrag <Badge text="pro"></Badge>
* type: Boolean, default: false
* 详细: 拖拽时克隆节点.

## methods
### isNodeDraggable
* 类型: (node: [Node](#node), path: [Path](#path)) => Boolean

### isNodeDroppable
* 类型: (node: [Node](#node), path: [Path](#path)) => Boolean

## 节点特殊属性
此插件中, 节点的特殊属性.

### $draggable
* 类型: [undefined, Boolean, Function]
  * undefined: 继承父节点
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* 详细: 单个节点是否draggable

### $droppable
* 类型: [undefined, Boolean, Function]
  * undefined: 继承父节点
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* 详细: 单个节点是否droppable

## events
### drag
* 类型: (store: [Store](#store))

### before-drop
* 类型: (store: [Store](#store))

### drop
* 类型: (store: [Store](#store))

### input
* 类型: (treeData: [TreeData](#treedata))

### change
* 类型: (store: [Store](#store))

### after-placeholder-created
* 类型: (store: [Store](#store))

### afterPlaceholderCreated
* 类型: (store: [Store](#store))
* 详细: `after-placeholder-created`的别名, 将来会被弃用.

### after-move
* 类型: (store: [Store](#store))
* 详细: 每次mousemove或touchmove事件后执行

## 工具方法
### cloneTreeData
* 类型: (treeData: [TreeData](#treedata), options: Object) => [TreeData](#treedata)
  * options
    * afterNodeCreated: (newNode, {oldNode: node, index, parent, path})

### walkTreeData
* 类型: (treeData: [TreeData](#treedata), handler: Function, options)
  * handler: (node, index, parent, path)
    * return false: stop walk
    * return 'skip children'
    * return 'skip siblings'
  * options
    * {Boolean} reverse: 倒序
* 详细: 遍历树形数据

### getPureTreeData
* 类型: (treeData: [TreeData](#treedata)) => [PureTreeData](#puretreedata)
* 类型: (node: [Node](#node)) => [PureNode](#purenode)
* 详细: 获得纯净的树形数据

### foldAll
* 类型: (treeData: [TreeData](#treedata))
* 详细: 遍历给定数据并全部折叠. 在此之前确认数据已挂载到vue上.

### unfoldAll
* 类型: (treeData: [TreeData](#treedata))
* 详细: 遍历给定数据并全部展开. 在此之前确认数据已挂载到vue上.

## 其他
## 数据类型
### TreeData
* 类型: Array
* 详细: 树形数据
* 例子: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]`

### Node
* 类型: Object
* 详细: 节点数据, 规定`children`是子级的key, 节点的设置的key以`$`开始
* 例子: `{text: 'node 2', children: [{text: 'node 2-1'}, $draggable: false]}`

### PureTreeData
* 类型: Array
* 详细: 纯净树形数据, 删除掉了`$`开头的key.

### PureNode
* 类型: Object
* 详细: 纯净节点数据, 删除掉了`$`开头的key.

### Path
* 类型: Array
* 详细: 节点在树中的位置. 从最高第二级开始, 每一级在父级中的序号.
* 例子: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 3'}]}]`, node 3的path是[1, 0]

### Tree
* 详细: Tree组件的Vue实例.

### Store
* 类型: Object
  * {HTMLElement} listenerElement: 监听事件的元素
  * {HTMLElement} directTriggerElement: 直接触发事件的元素
  * {HTMLElement} triggerElement: 允许作为拖拽触发器的元素. 可能是directTriggerElement的父级.
  * {HTMLElement} movedElement: 拖动的元素
  * {HTMLElement} movedOrClonedElement: 原始拖动的元素, 克隆模式时有用
  * {Object: {x, y}} mouse: 鼠标位置, 相对于视窗左上角
  * {Number} movedCount: 移动次数
  * {Event} startEvent: mousedown 或 touchstart 事件
  * {Event} endEvent: mouseup 或 touchend event 事件
  * {HTMLElement} startTreeEl
  * {vm} startTree
  * {[Path](#path)} startPath
  * {HTMLElement} dragBranchEl
  * {[Node](#node)} dragNode
  * {HTMLElement} targetTreeEl
  * {vm} targetTree
  * {[Path](#path)} targetPath
  * {Boolean} targetPathNotEqualToStartPath: 初始位置和目标位置是否不同(位置是否改变)
  * {HTMLElement} placeholder
  * {Boolean} pathChangePrevented: 拖拽结束, 节点的位置改变是否被(钩子)阻止.
  * {Boolean} pathChanged: 最终节点的位置是否改变
* 详细: 本次拖拽过程中的相关数据. 拖动开始时创建, 结束后销毁. 也可通过`tree.treesStore.store`获得.

### IsDraggable
* 类型: [Boolean, undefined]
  * undefined: 继承父节点
* 详细: 节点是否可被拖拽.

### IsDroppable
* 类型: [Boolean, undefined]
  * undefined: 继承父节点
* 详细: 节点是否可接受被拖拽的节点成为其子节点.

### JSX
* 详细: [Vue JSX](https://vuejs.org/v2/guide/render-function.html).

## HTML元素类型
### tree-children
* 详细: 列表元素, 最顶级有class `tree-root`.

### tree-branch
* 详细: tree-children的下一级. 分支元素, 包括对应节点的tree-node和tree-children.

### tree-node-back
* 详细: tree-branch的下一级, 节点背景元素, 主要作用是作为节点的全宽背景元素, 可以通过css设置hover时的全宽背景颜色. 拥有实现节点缩进的自动计算的padding-left.

### tree-node
* 详细: tree-node-back的下一级, 节点元素, 包括默认slot, 通过extends或mixins使用时可以用[overrideSlotDefault](#overrideslotdefault)自定义.
