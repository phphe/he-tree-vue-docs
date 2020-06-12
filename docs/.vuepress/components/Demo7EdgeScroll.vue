<!-- Demo7EdgeScroll.vue -->
<template>
  <div style="width:200px; height:200px; overflow: auto;">
    <Tree :value="treeData" edgeScroll style="width:400px;"></Tree>
  </div>
</template>
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Draggable} from 'he-tree-vue'

export default {
  components: {Tree: Tree.mixPlugins([Draggable])},
  data() {
    return {
      treeData: [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}, {text: 'node 3'}, {text: 'node 4'}, {text: 'node 5'}, {text: 'node 6'}]
    }
  },
}
</script>
