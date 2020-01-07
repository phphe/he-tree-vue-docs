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
