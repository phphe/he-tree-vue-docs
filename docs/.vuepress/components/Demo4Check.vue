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
