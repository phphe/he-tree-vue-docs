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
