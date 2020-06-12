# 教程 <Badge text="v1"></Badge>
## 安装
```sh
npm i -P he-tree-vue
```
[通过script标签引入](#通过script标签引入)
## 简单使用
### 导入
包拆分为了基础树和插件, 可按需引入. 插件有折叠, 勾选框, 拖拽.
```js
import {Tree, // 基础树
  Fold, Check, Draggable, // 插件: 折叠, 勾选框, 拖拽
  cloneTreeData, walkTreeData, getPureTreeData, //方法
} from 'he-tree-vue'
import 'he-tree-vue/dist/he-tree-vue.css' // 基础样式
```
包只有几个简单的css. 折叠和勾选框插件只有功能函数, 没有UI, 需要额外附加. Tree组件有默认插槽可自定义节点UI, 未传入时默认显示`node.text`. 一般来说, 你需要创建一个组件继承于Tree, 然后自定义UI, css, 还可以用`jsx`和钩子函数自定义模板. 此教程会列出许多用法demo和源码.
### 数据结构
通过prop `value`传入数据, 树的内部value有别名`treeData`. 数据是数组, 子树的key是`children`. 树会直接改变节点和数据结构, 比如折叠插件或给节点增加`$folded`属性, 这些附加的属性的key都会以`$`开始. 也可以给节点添加`$`开始的属性来添加设置. 节点的[$hidden](api.md#hidden)属性可以控制节点的显示. 那么如何给根节点添加设置? 可以传入prop [rootNode](api.md#rootnode)对象作为虚拟的根节点.
```js
[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
```

可以通过树的[getPureTreeData](api.md#getpuretreedata)方法获取纯净数据(删除$开始的key).
### 节点获取
通过外部的`path`获取节点. [Path](api.md#path)是数组, 包括节点的父级的索引, 如`[0,0]`, 可以更改`path`和使用树的方法[getNodeByPath](api.md#getnodebypath)获得节点.
### UI结构和css
```pug
.he-tree(data-tree-id={this.treeId})
  .tree-children.tree-root
    .tree-branch(data-tree-node-path="0")
      .tree-node-back(style="padding-left: '0px';")
        .tree-node
          slot
    .tree-branch(data-tree-node-path="1")
      .tree-node-back(style="padding-left: '0px';")
        .tree-node
          slot
      .tree-children
        .tree-branch(data-tree-node-path="1,0")
          .tree-node-back(style="padding-left: '0px';")
            .tree-node
              slot
```
上面是一个示例html结构. `tree-node-back`是一个全宽元素, 可以作为节点的全宽背景. 缩进靠js改变`tree-node-back`的`padding-left`实现, 所以不要用css修改`tree-node-back`的`padding-left`. 默认缩进20px, 传入prop `indent`可改变. 如果要修改节点垂直间距, 通过css修改`tree-node`的`margin-bottom`, 默认是5px. `tree-branch`的`data-tree-node-path`是节点`path`, 是为了方便通过html元素找节点对象.

如果要添加css名和style给节点对应元素, 设置节点的[$xxxClass](api.md#xxxclass)和[$xxxStyle](api.md#xxxstyle). 可用的有: $branchClass, $nodeBackClass, $nodeClass, $childrenClass, $branchStyle, $nodeBackStyle, $nodeStyle, $childrenStyle
### 最简使用
```vue
<!-- Demo1Easiest.vue -->
<template>
  <Tree :value="treeData"></Tree>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree} from 'he-tree-vue'

export default {
  components: {Tree},
  data() {
    return {
      treeData: [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
    }
  },
}
</script>
```
<ClientOnly><Demo1Easiest/></ClientOnly>

### 通过default slot自定义显示
```vue
<!-- Demo2CustomSlot.vue -->
<template>
  <Tree :value="treeData">
    <span slot-scope="{node, index, path, tree}">
      <b>{{index}}</b>
      Title: {{node.title}}
      - path: <i>{{path.join(',')}}</i>
    </span>
  </Tree>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree} from 'he-tree-vue'

export default {
  components: {Tree},
  data() {
    return {
      treeData: [{title: 'node 1'}, {title: 'node 2', children: [{title: 'node 2-1'}]}]
    }
  },
}
</script>
```
<ClientOnly><Demo2CustomSlot/></ClientOnly>

## 插件
插件其实也是Vue组件写法, 所以混合基础树和插件就可以了. 使用[Tree.mixPlugins](api.md#mixplugins)方法更方便.
## 折叠插件
```vue
<!-- Demo3Fold.vue -->
<template>
  <Tree :value="treeData">
    <span slot-scope="{node, index, path, tree}">
      <b @click="tree.toggleFold(node, path)">
        {{node.$folded ? '+' : '-'}}
      </b>
      {{node.text}}
    </span>
  </Tree>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Fold} from 'he-tree-vue'

export default {
  components: {Tree: Tree.mixPlugins([Fold])},
  data() {
    return {
      treeData: [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
    }
  },
}
</script>
```
<ClientOnly><Demo3Fold/></ClientOnly>

传入`foldingTransitionName`设置折叠/展开节点列表的transition名. 也可通过`foldingTransition`传入你的transition组件. 参考[Vue transition](https://cn.vuejs.org/v2/guide/transitions.html).

如果数据在树初始化前传入, 则配置`foldAllAfterMounted`将使树默认折叠. 如果数据在树初始化之后传入而想树默认折叠的话, 使用辅助方法[`foldAll`](api.md#foldall-2)如下:
```js
import {foldAll} from 'he-tree-vue'
...
this.mytreedata = mytreedata // 首先挂载数据到vue上
foldAll(this.mytreedata)
```

## 勾选框插件
```vue
<!-- Demo4Check.vue -->
<template>
  <Tree :value="treeData">
    <span slot-scope="{node, index, path, tree}">
      <input type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)" />
      {{node.text}}
    </span>
  </Tree>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Check} from 'he-tree-vue'

export default {
  components: {Tree: Tree.mixPlugins([Check])},
  data() {
    return {
      treeData: [{text: 'node 1', children: [{text: 'node 1-1'}, {text: 'node 1-2'}]}]
    }
  },
}
</script>
```
<ClientOnly><Demo4Check/></ClientOnly>

注意不能使用`v-model`绑定`node.$checked`, 否则会改变两次, 相当于没改变.

## 拖拽插件
<ClientOnly><Demo5Draggable/></ClientOnly>

```vue
<!-- Demo5Draggable.vue -->
<template>
  <Tree :value="treeData"></Tree>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Draggable} from 'he-tree-vue'

export default {
  components: {Tree: Tree.mixPlugins([Draggable])},
  data() {
    return {
      treeData: [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
    }
  },
}
</script>
```
### 拖拽启用/禁用
[draggable](api.md#draggable) prop控制该树节点是否可被拖拽. [droppable](api.md#droppable) prop控制该树是否可接受拖拽的节点. 这两个props可以是布尔类型, 也可是方法.
### 触发拖拽的元素
[triggerClass](api.md#triggerclass) prop指定触发拖拽的元素的css名. 当在有`triggerClass`的元素内点击时, 除特殊情况, 将触发拖拽.
特殊情况是, 点击的元素是输入框, 下拉框, 或该元素或其父元素有css名`undraggable`.

`triggerClass`默认是`tree-node`, 所以点击节点内任何地方, 除特殊情况, 都可触发拖拽. 修改`triggerClass`, 可指定触发拖拽的元素.
### 拖拽流程中的控制
prop [eachDraggable](api.md#eachdraggable), [eachDroppable](api.md#eachdroppable) 是钩子方法, 可以全局设定单个节点是否draggable, droppable. 单个节点可通过[$draggable](api.md#draggable-2), [$droppable](api.md#droppable-2)属性控制. $draggable, $droppable优先级高于eachDraggable, eachDroppable. 子节点会继承父级的$draggable, $droppable. 虚拟根节点对象[rootNode](api.md#rootnode)的$droppable指其他节点是否可成为根节点的子级.

prop [ondragstart](api.md#ondragstart)和[ondragend](api.md#ondragend)是两个钩子方法. ondragstart拖拽开始时触发, 返回`false`可阻止拖拽, `ondragstart`在源码中是在`eachDraggable`后面, 两个很类似. `ondragend`拖拽结束时触发, 返回`false`可阻止节点位置改变.

流程中会触发一些事件, 事件不能影响流程, 钩子方法能影响流程. 开始和结束时触发drag, drop. 拖拽改变了树的结构会触发input, change.

### 拖拽流程中的相关数据
拖拽开始时, 会创建对象[store](api.md#store), 结束时销毁. 拖拽时有很多数据, 都会被放入`store`中. store会传给钩子函数和事件, 同时也可以通过`tree.treesStore.store`访问. 需要注意的是数据的生成顺序, 比如ondragstart发生时, store.targetTree就还不存在.

### 占位节点
拖拽时, 会生成一个元素默认淡青色背景, 用以标识可放置的位置. 此节点生成时会触发`afterPlaceholderCreated`, 如果想操作此元素比如添加文字, 只能通过原生js操作.

### 拖拽时打开折叠节点
当把节点拖动到一个折叠节点上时, 默认会打开此节点以便拖入其中. 可通过prop `unfoldWhenDragover`控制. 相关prop: [unfoldWhenDragoverDelay](api.md#unfoldwhendragoverdelay)

### 拖拽节点的定位
默认使用拖拽节点的左上角坐标来定位, 也可以设置使用鼠标位置来定位. [draggingNodePositionMode](api.md#draggingnodepositionmode)

### 跨树拖拽 <Badge text="pro"></Badge>
给允许跨树拖拽的树传入prop [crossTree](api.md#crosstree). **注意, 允许跨树拽出,拖入的树都要开启才有效.**

### 最大层级 <Badge text="pro"></Badge>
传入prop [maxLevel](api.md#maxlevel)将限制树的最大层级数.

### 拖拽时克隆 <Badge text="pro"></Badge>
拖拽时不移动原节点而是克隆一个新节点. 使用prop [cloneWhenDrag](api.md#clonewhendrag)开启.

## 自定义使用
一般来说, 项目中的树会有一些自定义UI. 所以需要创建一个自己的`Treeview`组件继承于基础树, 启用需要的插件, 自定义UI, 添加样式. 添加样式时可通过data [treeClass](api.md#treeclass)设置根元素的css名, 再通过嵌套css更改样式.

使用继承功能的缺点是难以修改模板. 基础树有3个钩子方法帮助自定义模板, 分别对应头部, 尾部, 节点内3个位置. 这三个方法必须返回[JSX](https://vuejs.org/v2/guide/render-function.html)格式的模板. **注意, 不要给添加的元素设置树原有的css名,** 如: tree-root, tree-children, tree-node, tree-node-back, tree-branch. 这可能影响拖拽.
**使用继承时注意不要覆盖原来的方法名, 变量名.**
* [overrideSlotDefault](api.md#overrideslotdefault) 覆盖默认slot模板, 用以在节点头部或尾部插入内容, 和自定义节点显示.
* [blockHeader](api.md#blockheader) 在树的头部插入内容.
* [blockFooter](api.md#blockfooter) 在树的尾部插入内容.

也可以用另一个组件把树组件包装起来使用, 这样自定义模板更方便, 但不能直接访问树的vm实例.

<ClientOnly><Demo6Custom style="max-width: 500px;" /></ClientOnly>

[此demo源码](/source.md#demo6)

### 自定义css
内置样式很少, 并采用两层嵌套结构. 所以自定义css时也要使用两层嵌套结构.
```css
.he-tree .tree-node{}
```
## Vuex
由于树会改变原数据对象, 所以使用vuex时, 可先用[cloneTreeData](api.md#clonetreedata)方法深度复制数据对象, 再把复制的对象传给树. 在树的input或change事件中使用[tree.getPureTreeData](api.md#getpuretreedata)方法获得纯净数据, 再手动更新数据.

## 通过script标签引入
从github或npm下载最新版本, 引入dist/he-tree-vue.js或dist/he-tree-vue.min.js, dist/he-tree-vue.css. 可以通过全部变量heTreeVue访问库.
```html
<script src="yourpath/dist/he-tree-vue.min.js" charset="utf-8"></script>
<link rel="stylesheet" href="yourpath/dist/he-tree-vue.css">
<!-- usage -->
<script type="text/javascript">
  var Tree = heTreeVue.Tree;
  var Fold = heTreeVue.Fold;
</script>
```

## typescript
项目包含typescript描述文件. 这里是一个vue cli + typescript + he-tree-vue demo: [vue-cli-typescript-he-tree-test](https://github.com/phphe/vue-cli-typescript-he-tree-test)