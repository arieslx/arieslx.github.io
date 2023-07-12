---
title: 2023年｜五月tech相关
date: 2023-5-1 21:17:59
tags:
  - 2023
---

Q: 在node项目中调试另一个npm包，直接在node_modules里面的npm包里可以通过`cls-hooked`中的`getNamespace`方法获取namespace，但是通过npm link链接的本地npm包源码,cls.getNamespace('xxx') 返回undefined，这是为什么？

A: 在 Node.js 项目中调试另一个 npm 包时，如果您使用 npm link 将该包链接到本地，可能会遇到 cls.getNamespace('xxx') 返回 undefined 的问题。

这是因为`cls-hooked`使用了`Node.js`自带的模块`async_hooks`实现了钩子，这些钩子在应用程序中创建异步操作（例如网络请求、定时器等）时触发。而这些异步操作是在异步上下文中执行的，例如使用`setTimeout`等函数创建的回调函数。

当您将包链接到本地并从本地调用时，这些异步操作的上下文已经与包中的代码分离了。因此，cls.getNamespace('global') 返回undefined。

解决这个问题的方法是在包的代码中初始化 cls-hooked 的命名空间。可以使用类似以下的代码初始化：

```js
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-namespace');

// 将命名空间绑定到全局对象
global.myNamespace = namespace;
```

然后，在包的代码中，您可以使用 myNamespace 代替 cls.getNamespace('global') 来访问命名空间。

另一种解决方法是将包中的异步操作与父级上下文绑定。可以使用以下代码将父级上下文传递给异步操作：

https://zblogs.top/how-to-register-openai-chatgpt-in-china/ chatgpt安装教程


### low code research
star了两个项目
- 组件数据绑定和联动
- 随着组件数量的增加需要将组件服务化，动态部署等
- 组件开发者的成本与维护者的上手成本权衡
- 组件模板化
- 页面部署投产等

其中这两个项目看起来比较靠谱：
1. https://www.dimajia.com/technology/icejs/
2. https://www.dimajia.com/technology/nocobase/ 最贴近的是这个项目，好好读读

#### nocobase research

