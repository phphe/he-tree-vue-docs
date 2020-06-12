# 编译

本库以及相关依赖编译目标是[defaults browserlist](https://browserl.ist/?q=defaults), 涵盖90%的浏览器. 如果需要兼容更多的浏览器, 则需要添加相关依赖到编译列表. 下面的方法也适用于其他的第三方依赖.

<del>本库以及相关依赖提供es6, commonjs, umd编译结果. vue-cli和nuxt默认使用es6文件. 但是它们的babel默认不编译第三方依赖, 所以会导致编译结果包含es6语法, 导致在老的浏览器出现语法错误, 如ie11. 以下是解决办法.</del>

## vue-cli
在`vue.config.js`的`transpileDependencies`添加相关依赖.
```js
module.exports = {
  transpileDependencies: ['he-tree-vue', 'helper-js', 'draggable-helper', 'vue-functions', 'drag-event-service'],
}
```

## nuxt
在`nuxt.config.js`的`build.transpile`添加相关依赖.
```js
module.exports = {
  build: {
    transpile: ['he-tree-vue', 'helper-js', 'draggable-helper', 'vue-functions', 'drag-event-service'],
  }
}
```
