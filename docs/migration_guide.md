# Migration Guide
[CHANGELOG](https://github.com/phphe/he-tree-vue/blob/master/CHANGELOG.md)

## v2
- Event `drop` renamed to `before-drop`. Added `drop` event after drop completed.
- In [store](api.md#store), `el` renamed to `movedElement`, `originalEl` renamed to `movedOrClonedElement`.
- New features: RTL, edgeScroll, triggerBySelf.