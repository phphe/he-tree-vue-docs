<template lang="pug">
Tree(:value="treeData")
</template>

<script>
import {Tree, Check, Fold, Draggable} from 'he-tree-vue'
import 'he-tree-vue/dist/he-tree-vue.css'

const MixedTree = Tree.mixPlugins([Fold, Check, Draggable])

export default {
  components: {
    Tree: MixedTree,
  },
  data() {
    return {
      treeData: [
        {text: 'node1'},
        {text: 'node2', children: [
          {text: 'node2-1'},
          {text: 'node2-2', children: [
            {text: 'node2-2-1'},
            {text: 'node2-2-2'},
          ]},
          {text: 'node2-3'},
        ]},
        {text: 'node3'},
      ]
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
</style>
