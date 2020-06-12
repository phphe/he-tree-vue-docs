# API <Badge text="v1"></Badge>
## Base Tree
## props
### value
* Type: [TreeData](#treedata-2), required
* Detail: The data passed to tree.
* Example: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]`

### indent
* Type: Number, default: 20
* Detail: Indentation, unit is `px`.

### rootNode
* Type: [Node](#node), default: {}
* Detail: The virtual root node of the tree. You can add options to root node by it.

## data
### trees
* Type: {tree.\_uid: tree}
* Detail: All the tree's vm instance that currently exist.

### treeClass
* Type: String
* Detail: Add class name to the top level of the tree. When using extends or mixins, you can customize the top level class without changing the template.

### treeId
* Type: String
* Detail: Random string. Available after mounted.

## computed
### treeData
* Detail: Alias of [value](#value).

## methods
### iteratePath
* Type: (path: [Path](#path), [options: Object]) => Generator
  * options:
    * {Boolean} reverse
* Detail: Iterate path.
* Example:
  ```js
  for (const {node, path} of this.iteratePath([0,0,0,1], {reverse: true})) {
    //
  }
  ```

### getTreeVmByTreeEl
* Type: (treeEl: HTMLElement) => [Tree](#tree)
* Detail: Get vm by tree element.

### getAllNodesByPath
* Type: (path: [Path](#path)) => [Node[]](#node)

### getNodeByPath
* Type: (path: [Path](#path)) => [Node](#node)

### getPathByBranchEl
* Type: ([branchEl](#tree-branch): HTMLElement) => [Path](#path)

### getBranchElByPath
* Type: (path: [Path](#path)) => [branchEl](#tree-branch)

### getNodeByBranchEl
* Type: ([branchEl](#tree-branch): HTMLElement) => [Node](#node)

### getNodeParentByPath
* Type: (path: [Path](#path)) => [Node](#node)

### removeNodeByPath
* Type: (path: [Path](#path))

### walkTreeData
* Type: (handler, options) => [ut.walkTreeData(this.treeData, handler, options)](#walktreedata-2)
* Detail: Same with util but first argument is bound to treeData of the Tree.

### cloneTreeData
* Type: (options) => [ut.cloneTreeData(this.treeData, options)](#clonetreedata-2)
* Detail: Same with util but first argument is bound to treeData of the Tree.

### getPureTreeData
* Type: () => [ut.getPureTreeData(this.treeData)](#getpuretreedata-2)
* Detail: Same with util but first argument is bound to treeData of the Tree.

## slots
### default slot
* Type: scoped slot{node: [Node](#node), index: Number, path: [Path](#path), tree: [Tree](#tree)}
  * index
* Default:
  ::: v-pre
  `{{node.text}}`
  :::
* Detail: Default slot, custom node render.
* Example:
```html
<div v-slot="{node, index, path, tree}">{{node.title}}</div>
```

## render hooks
Custom render. Applicable when using extends or mixins. Suitable for definition in data or methods.
### overrideSlotDefault
* Type: ({node: [Node](#node), index: Number, path: [Path](#path), tree: [Tree](#tree)}, original) => [JSX](#jsx)
  * {Function} original: return default render
* Detail: Oerride [default slot](#default-slot). Custom node render.
* Example:
  * Add button in the head and tail.
    ```js
    overrideSlotDefault({node, index, path, tree}, original) {
      return <div>
        <button>before</button>
        {original()}
        <button>after</button>
      </div>
    }
    ```
  * Custom display text.
    ```js
    overrideSlotDefault({node, index, path, tree}, original) {
      return <div>
        {node.title}
      </div>
    }
    ```

### blockHeader
* Type: () => [JSX](#jsx)
* Detail: Insert template to head.

### blockFooter
* Type: () => [JSX](#jsx)
* Detail: Insert template to end.

## Node Special Properties
Special attributes of nodes in the base Tree.
### $hidden
* Type: Boolean
* Detail: Hide node.

### $xxxClass
* Type: String
* Detail: Define the class of the HTML element. All: $branchClass, $nodeBackClass, $nodeClass, $childrenClass.

### $xxxStyle
* Type: [Object, String]
* Detail: Define the style of the HTML element. All: $branchStyle, $nodeBackStyle, $nodeStyle, $childrenStyle.

## Static Methods
### mixPlugins
* Type: (plugins: Plugin[]) => VueComponent
* Detail: Mix the base tree with the given plugin, returning new component.

## Fold Plugin
## props
### foldingTransitionName
* Type: String
* Detail: The transition name.

### foldingTransition
* Type: Vue
* Detail: The transition component.

### foldAllAfterMounted
* Type: Boolean
* Detail: Fold all nodes after mounted.

## Node Special Properties
Special properties of nodes in this plugin.
### $folded
* Type: Boolean
* Detail: Whether the node is folded.

## methods
### fold
* Type: (node: [Node](#node), path: [Path](#path))
* Detail: Fold node.

### unfold
* Type: (node: [Node](#node), path: [Path](#path), [options: Object])
  * options:
    * foldOthers: false, Fold nodes in other branchs.
* Detail: Unfold node.

### toggleFold
* Type: (node: [Node](#node), path: [Path](#path), [options: Object])
  * options: Passed to fold or unfold.
* Detail: Toggle status.

### foldAll
* Type: () => undefined

### unfoldAll
* Type: () => undefined

## events
### nodeFoldedChanged
* Type: (node: [Node](#node))
* Detail: Triggered when node is folded or unfolded.

## Check Plugin
## methods
### check
* Type: (node: [Node](#node), path: [Path](#path))

### uncheck
* Type: (node: [Node](#node), path: [Path](#path))

### toggleCheck
* Type: (node: [Node](#node), path: [Path](#path))

## Draggable Plugin
## props
### triggerClass
* Type: String, default: 'tree-node'
* Detail: `class` of the element which trigger drag.

### draggable
* Type: [Boolean, (tree: [Tree](#tree), store: [Store](#store)) => [IsDraggable](#isdraggable)], default: true
* Detail: Enable drag.

### droppable
* Type: [Boolean, (tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)], default: true
* Detail: Enable drop.

### eachDraggable
* Type: [undefined, Boolean, Function]
  * undefined: Inherit parent
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDraggable](#isdraggable)
* Detail: Whether a single node is draggable.

### eachDroppable
* Type: [undefined, Boolean, Function]
  * undefined: Inherit parent
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* Detail: Whether a single node is droppable.

### ondragstart
* Type: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* Detail: Hook, whether to prevent drag.

### ondragend
* Type: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* Detail: Hook, whether to prevent the drag result.

### unfoldWhenDragover
* Type: Boolean, default: true
* Detail: When dragging over a node, whether to open it if the node is folded.

### unfoldWhenDragoverDelay
* Type: Number, default: 30, unit: millisecond
* Detail: When dragging over a folded node, wait some milliseconds before open it.

### draggingNodePositionMode
* Type: 'top_left_corner'|'mouse', default: 'top_left_corner'
* Detail: How to locate the dragging node. top_left_corner: the top left corner of dragging node; mouse: mouse position

### crossTree <Badge text="pro"></Badge>
* Type: [Boolean, Function], default: false
  * Function: (tree: [Tree](#tree), store: [Store](#store)) => Boolean
* Detail: Whether to allow cross trees. This must be enabled for both start tree and target tree.

### maxLevel <Badge text="pro"></Badge>
* Type: Number
* Detail: The maximum number of levels allowed by the tree. It determines whether node can be placed when drag.

### cloneWhenDrag <Badge text="pro"></Badge>
* Type: Boolean, default: false
* Detail: Clone node when drag.

## methods
### isNodeDraggable
* Type: (node: [Node](#node), path: [Path](#path)) => Boolean

### isNodeDroppable
* Type: (node: [Node](#node), path: [Path](#path)) => Boolean

## Node Special Properties
Special properties of nodes in this plugin.
### $draggable
* Type: [undefined, Boolean, Function]
  * undefined: Inherit parent
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* Detail: Whether a single node is draggable.

### $droppable
* Type: [undefined, Boolean, Function]
  * undefined: Inherit parent
  * Function: (currentPath: [Path](#path), tree: [Tree](#tree), store: [Store](#store)) => [IsDroppable](#isdroppable)
* Detail: Whether a single node is droppable.

## events
### drag
* Type: (store: [Store](#store))

### drop
* Type: (store: [Store](#store))

### input
* Type: (treeData: [TreeData](#treedata))

### change
* Type: ()

### afterPlaceholderCreated
* Type: (store: [Store](#store))

## Utils
### cloneTreeData
* Type: (treeData: [TreeData](#treedata), options: Object) => [TreeData](#treedata)
  * options
    * afterNodeCreated: (newNode, {oldNode: node, index, parent, path})

### walkTreeData
* Type: (treeData: [TreeData](#treedata), handler: Function, options)
  * handler: (node, index, parent, path)
    * return false: stop walk
    * return 'skip children'
    * return 'skip siblings'
  * options
    * {Boolean} reverse
* Detail: Iterate TreeData.

### getPureTreeData
* Type: (treeData: [TreeData](#treedata)) => [PureTreeData](#puretreedata)
* Type: (node: [Node](#node)) => [PureNode](#purenode)

### foldAll
* Type: (treeData: [TreeData](#treedata))
* Detail: walk treeData and fold all. Make sure the data is reactive before do this.

### unfoldAll
* Type: (treeData: [TreeData](#treedata))
* Detail: walk treeData and unfold all. Make sure the data is reactive before do this.

## Others
## Data Types
### TreeData
* Type: Array
* Detail: Tree data.
* Example: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]`

### Node
* Type: Object
* Detail: Node data, `children` is key of subtree, options key starts with `$`.
* Example: `{text: 'node 2', children: [{text: 'node 2-1'}, $draggable: false]}`

### PureTreeData
* Type: Array
* Detail: Pure tree data, without key starts with `$`.

### PureNode
* Type: Object
* Detail: Pure node data, without key starts with `$`.

### Path
* Type: Array
* Detail: Node position in TreeData. Starting from the highest second level, the serial number of each level in the parent.
* Example: `[{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 3'}]}]`, path of 'node 3' is [1, 0]

### Tree
* Detail: Vue instance(vm) of Tree.

### Store
* Type: Object
  * {HTMLElement} el: the moving el
  * {HTMLElement} originalEl: the original moving el, used when clone
  * {Object: {x, y}} mouse: the mouse position
  * {Number} movedCount: the moved times
  * {Event} startEvent: mousedown or touchstart event
  * {Event} endEvent: mouseup or touchend event
  * {HTMLElement} startTreeEl
  * {vm} startTree
  * {[Path](#path)} startPath
  * {HTMLElement} dragBranchEl
  * {[Node](#node)} dragNode
  * {HTMLElement} targetTreeEl
  * {vm} targetTree
  * {[Path](#path)} targetPath
  * {Boolean} targetPathNotEqualToStartPath
  * {HTMLElement} placeholder
  * {Boolean} pathChangePrevented: if path change be prevented by hooks.
  * {Boolean} pathChanged: Whether the path changes in the end.
* Detail: Related data during this dragging process. Created when drag start, destroyed when drag end. Also available through `tree.treesStore.store`.

### IsDraggable
* Type: [Boolean, undefined]
  * undefined: Inherit parent
* Detail: Whether a single node is draggable.

### IsDroppable
* Type: [Boolean, undefined]
  * undefined: Inherit parent
* Detail: Whether a single node is droppable.

### JSX
* Detail: [Vue JSX](https://vuejs.org/v2/guide/render-function.html).

## HTML Elements
### tree-children
* Detail: List. The top has class `tree-root`.

### tree-branch
* Detail: The child of tree-children. Branch element, including tree-node and tree-children.

### tree-node-back
* Detail: The child of tree-branch. Node back element. The main role is to serve as the full-width background element of the node. You can set the full-width background color when hover through css. It has a padding-left that automatically calculates the indentation of the node.

### tree-node
* Detail: The child of tree-node-back. Node element, including default slot.
