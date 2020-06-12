# Guide <Badge text="v1"></Badge>
## Installation
```sh
npm i -P he-tree-vue
```
[Import by script tag](#import-by-script-tag)
## Simple Usage
### Import
The package is split into base trees and plugins, which can be imported as needed.
```js
import {Tree, // Base tree
  Fold, Check, Draggable, // plugins
  cloneTreeData, walkTreeData, getPureTreeData, // utils
} from 'he-tree-vue'
import 'he-tree-vue/dist/he-tree-vue.css' // base style
```
The package has only a few simple css. The Fold plugin and Check plugin have only functional functions, no UI, and requires your ui. The Tree component has a default slot to customize the node UI, and `node.text` is displayed by default when no slot template passed in. General For example, you need to create a component that inherits from Tree, and then customize the UI, CSS, you can also use jsx and hook functions to customize the template. This guide will list many usage demos and source code.

### Data Structure
Incoming data through prop `value`. It has an alias `treeData` in the Tree. The data is an array, and the key of the subtree is `children`. The tree will directly change nodes and data structures, such as Fold plugin will add `$folded` to nodes. These additional attributes will start with `$`. You can also add attributes starting with `$` to the node to add settings. The node's [$hidden](api.md#hidden) attribute can control the node's display. So how do I add settings to the root node? You can pass in a prop [rootNode](api.md#rootnode) object as a virtual root node.
```js
[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
```
You can use the [getPureTreeData](api.md#getpuretreedata) method of the tree to get pure data (remove the key starting with $).
### Get Node
Get the node through the `path`. [Path](api.md#path) is an array, including the index of the parent of the node, such as` [0,0] `. You can change` path` and use the tree method [getNodeByPath](api.md#getnodebypath) Get node
### UI Structure and CSS
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
The above is an example html structure. `tree-node-back` is a full-width element, which can be used as the full-width background of the node. Indentation depends on js to change the `padding-left` of `tree-node-back`, so don't use CSS to modify the padding-left of the tree-node-back. The default indentation is 20px, which can be changed by passing in the prop `indent`. If you want to modify the vertical spacing of the nodes, modify the tree-node's `margin-bottom`, default is 5px. `data-tree-node-path` of `tree-branch` is the node `path`, it is for the convenience of finding node objects through html elements.

If you want to add the css name and style to the corresponding element of the node, set [$xxxClass](api.md#xxxclass) and [$xxxStyle](api.md#xxxstyle) of the node. Available are: $branchClass, $nodeBackClass, $nodeClass , $childrenClass, $branchStyle, $nodeBackStyle, $nodeStyle, $childrenStyle
### Minimal use
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

### Custom display through default slot
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

## Plugin
The plugin is Vue component, so just mixin the base tree and plugins. Use [Tree.mixPlugins](api.md#mixplugins) method is more convenient.
## Fold Plugin
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

Pass` foldingTransitionName` to set the transition name of the folding/expanding node list. You can also pass your transition component via `foldingTransition`. See [Vue transition](https://vuejs.org/v2/guide/transitions.html).

If treeData is passed before tree inited, use `foldAllAfterMounted` to make the tree all nodes folded by default. If treeData is passed after tree inited, use util function [`foldAll`](api.md#foldall-2) like follow:
```js
import {foldAll} from 'he-tree-vue'
...
this.mytreedata = mytreedata // add data to vue instance first
foldAll(this.mytreedata)
```

## Check Plugin
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

Note: don't bind `node.$checked` with `v-model`, otherwise it will change twice, which is equivalent to no change

## Draggable Plugin
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

### Drag Enable/Disable
[draggable](api.md#draggable) prop controls whether the tree node can be dragged. [droppable](api.md#droppable) prop controls whether the tree can accept dragged nodes. These two props can be Boolean, Function.
### Element that triggered the drag
[triggerClass](api.md#triggerclass) prop specifies the css name of the element that triggers the drag. When clicked inside an element that has a triggerClass, dragging will be triggered except in special cases.
In special cases, the clicked element is an input box, a select, or the element or its parent element has a css name of `undraggable`.

`triggerClass` is `tree-node` by default, so clicking anywhere inside the node can trigger dragging except in special cases. Modify `triggerClass` to specify the element that triggers dragging.

### Controls in the drag and drop process
prop [eachDraggable](api.md#eachdraggable), [eachDroppable](api.md#eachdroppable) are hook methods that can globally set whether a single node is draggable, droppable. A single node can be set via its properties [$draggable](api.md#draggable-2), [$droppable](api.md#droppable-2). $draggable, $droppable takes precedence over eachDraggable, eachDroppable. Child nodes inherit the parent's $draggable, $droppable. User `rootNode.$droppable` to set if root droppable.

prop [ondragstart](api.md#ondragstart) and [ondragend](api.md#ondragend) are two hook methods. ondragstart is triggered when the drag starts, returning `false` can prevent drag, `ondragstart` is after `eachDraggable` in the source code, so the two are very similar. `ondragend` is triggered when the drag ends, returning` false` prevents the node position from changing.

Some events are triggered in the process. Events cannot affect the process. Hook methods can affect the process. `drag` and `drop` are triggered at the beginning and end. The tree will trigger `input`, `change` if structure changed by drag.

### Related data in drag and drop process
At the beginning of the drag, an object [store](api.md#store) is created, and it is destroyed at the end. There is a lot of data when dragging, and it will be put in the `store`. The store will be passed to hook functions and events. It also can be accessed through `tree.treesStore.store`. Note when a property exists in `store`, such as when ondragstart excuting, store.targetTree does not yet exist.

### Placeholder
When dragging, an element will be generated with a default light cyan background to identify the place where can be dropped. This node will emit `afterPlaceholderCreated` event when it is created. If you want to manipulate this element such as adding text, you can only use native JS operations.

### Open folded node when dragging
When dragging a node over a collapsed node, this node is opened by default for dragging into it. It can be controlled by prop `unfoldWhenDragover`. Related prop: [unfoldWhenDragoverDelay](api.md#unfoldwhendragoverdelay)

### How to locate the dragging node
The top left corner of dragging node is used by default. Mouse position is also supported. [draggingNodePositionMode](api.md#draggingnodepositionmode)

### Drag across trees <Badge text="pro"></Badge>
Pass prop [crossTree](api.md#crosstree) to the tree that allows cross-tree dragging. **Note that both start tree and target tree need enable it.**

### Max Level <Badge text="pro"></Badge>
Use prop [maxLevel](api.md#maxlevel) to limit the maximum number of levels of the tree.

### Clone When Drag <Badge text="pro"></Badge>
Clone a new node when drag. Use prop [cloneWhenDrag](api.md#clonewhendrag) to enable.

## Customize
Generally, the tree in the project will have some custom UI. So you need to create your own `Treeview` component to inherit from the base Tree, enable the required plugins, customize the UI, and add styles. When adding styles, you can use data [treeClass](api.md#treeclass) Set the css name of the root element, and then change the style by nesting css.

The disadvantage of using the inheritance function is that it is difficult to modify the template. The base Tree has 3 hook methods to help customize the template, corresponding to the three positions: header, footer, inside node. These three methods must return [JSX](https://vuejs.org/v2/guide/render-function.html) template. **Note, do not use the original css name of the tree for the added elements**, such as: tree-root, tree-children, tree-node, tree-node-back, tree-branch. This may affect dragging.

**Be careful not to overwrite the original method name and variable name when using inheritance.**
* [overrideSlotDefault](api.md#overrideslotdefault) overrides the default slot template, used to insert content at the head or tail of the node, and customize the display of the node.
* [blockHeader](api.md#blockheader) Insert content at the head of the tree.
* [blockFooter](api.md#blockfooter) Insert content at the end of the tree.

You can also use another component to wrap and use the tree component, so that custom templates are more convenient, but you cannot directly access the tree's vm instance.

<ClientOnly><Demo6Custom style="max-width: 500px;" /></ClientOnly>

[Source of the demo](/source.md#demo6)

### Custom css
There are very few built-in styles, and two-level nesting structure is used. So you should also use two-level nesting structure when custom css.
```css
.he-tree .tree-node {}
```
## Vuex
Because the tree will change the original data object, when using vuex, you can use the [cloneTreeData](api.md#clonetreedata) method to copy the data object deeply, and then pass the copied object to the tree. Then in the input or change event of the tree, use [tree.getPureTreeData](api.md#getpuretreedata) method to get pure data, and then manually commit the data.

## Import by script tag
Download the latest version from github or npm, impoty dist/he-tree-vue.js or dist/he-tree-vue.min.js, dist/he-tree-vue.css. You can access the library through gloabl variable `heTreeVue`.
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
It cantains typescript description files. There is a demo: [vue-cli-typescript-he-tree-test](https://github.com/phphe/vue-cli-typescript-he-tree-test)