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
