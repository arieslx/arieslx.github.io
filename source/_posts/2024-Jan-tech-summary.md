---
title: 2024年｜一月tech相关
date: 2024-1-29 07:15
tags:
  - 2024
---

### 链式调用
[Javascript.info](https://zh.javascript.info/object-methods)

有一个可以上下移动的 `ladder` 对象：
```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // 显示当前的 step
    alert( this.step );
  }
};
```
修改 `up`，`down` 和 `showStep` 的代码，让调用可以链接，就像这样：
```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```
修改 `up`，`down` 和 `showStep` 的代码，让调用可以链接，就像这样：
```javascript
ladder.up().up().down().showStep().down().showStep(); // 展示 1，然后 0
```

A: 每个方法后面返回return this;