# Source
Some source code.

## Demo6
```vue
<!-- Demo6Custom.vue -->
<template>
  <TreeView :value="treeData" draggable droppable></TreeView>
</template>
<script>
import TreeView from './Demo6CustomTreeView.vue'

export default {
  components: {TreeView},
  data() {
    return {
      treeData: [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
    }
  },
}
</script>
```
```vue
<!-- Demo6CustomTreeView.vue -->
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Fold, Check, Draggable} from 'he-tree-vue'
import * as hp from 'helper-js'

export default {
  extends: Tree,
  mixins: [Fold, Check, Draggable],
  props: {
    triggerClass: {default: 'drag-trigger'},
    // 让树默认不可拖拽. prevent drag by default.
    draggable: {type: [Boolean, Function], default: false},
    droppable: {type: [Boolean, Function], default: false},
  },
  data() {
    return {
      treeClass: 'my-tree-view1',
    }
  },
  computed: {
    total() {
      let i = 0
      this.walkTreeData((node) => {
        i++
      })
      return i
    },
  },
  methods: {
    overrideSlotDefault({node, index, path, tree}, original) {
      return <div class="node-content">
        <button class="mrs drag-trigger">Drag</button>
        <button class="mrs fold-btn" onClick={() => tree.toggleFold(node, path)}>{node.$folded ? '+' : '-'}</button>
        {original()}
        <button class="mls">edit</button>
        <button class="mls" onClick={() => this.removeNodeByPath(path)}>remove</button>
        <button class="mls" onClick={() => this.hideNode(node)}>hidden</button>
      </div>
    },
    blockHeader() {
      return <div class="header">
        <div>
          <button onClick={this.add}>add</button>
          <button onClick={this.showHidden} class="mls">show hidden</button>
        </div>
        <input onKeydown={(e) => e.key === 'Enter' && this.search(e)} placeholder="Search"  />
      </div>
    },
    blockFooter() {
      return <div class="footer">
        <i>Nodes count:</i> {this.total}
      </div>
    },
    //
    add() {
      this.treeData.push({text: `node ${hp.strRand(3).toLowerCase()}`})
    },
    showHidden() {
      this.walkTreeData((node) => {
        this.$set(node, '$hidden', false)
      })
    },
    hideNode(node) {
      this.$set(node, '$hidden', true)
    },
    search(e) {
      const value = e.target.value || ''
      this.walkTreeData((node) => {
        this.$set(node, '$hidden', !node.text.includes(value))
      })
    },
  },
}
</script>

<style>
.my-tree-view1 .mls{
  margin-left: 5px;
}
.my-tree-view1 .mrs{
  margin-right: 5px;
}
.my-tree-view1 .tree-node{
  padding: 0;
  border: none;
}
.my-tree-view1 .node-content{
  display: flex;
}
.my-tree-view1 .node-content .fold-btn{
  display: flex;
  justify-content: center;
  width: 22px;
  border-radius: 100%;
  border: none;
  background: #fcf1a8;
}
.my-tree-view1 .tree-node-back:hover{
  background: #f5f5f5;
}
.my-tree-view1 .header{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.my-tree-view1 .footer{
  border-top: 1px solid #ccc;
  margin-top: 10px;
}
</style>
```
