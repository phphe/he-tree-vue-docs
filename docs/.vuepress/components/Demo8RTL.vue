<!-- Demo8RTL.vue -->
<template>
  <Tree :value="treeData" rtl></Tree>
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
