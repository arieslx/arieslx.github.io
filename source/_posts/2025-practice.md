---
title: 2025年｜某些面试联系题
date: 2025-11-18 15:17:59
tags:
  - 2025
---

## 你在长列表优化中做了哪些具体的事情？

- 思路是避免同时渲染大量的DOM节点，DOM节点的创建、渲染和内存占用都是非常消耗性能的。
1. 采用非渲染优化
1. 虚拟滚动：
- 计算可视的区域：监听容器的滚动事件：`scrollTop`和`scrollTop + clientHeight`。
- 计算渲染区间：根据上一步的可视区域、每个列表项的高度，计算出需要渲染的起始索引`startIndex`和结束索引`endIndex`。通常会渲染比可视区域更多一些的项（上下多渲染5-10个），以防止滚动时出现白屏。
动态渲染和定位：
- 只渲染`[startIndex, endIndex]`这个区间的列表项。
为了保持滚动条的准确性，容器的高度必须设置为所有列表项的总高度。这通常通过一个具有总高度的“撑开容器”来实现。
对渲染的列表项实用`position: about`属性或者`transform: translateY(...)`，并设置`top`属性为列表项的索引乘以列表项的高度。
性能优化：
实用虚拟滚动，并使用`requestAnimationFrame`来优化动画或Interaction Observer来优化滚动监听，避免频繁的样式计算和布局。
缓存已计算的位置，对于高度固定的列表项，可以提前计算好，对于动态高度的列表，需要在渲染列表之后测量好并缓存高度，以便下次快速计算。
使用的库/技术：
- `React: react-window, react-virtualized`
- `Vue: vue-virtual-scroller`
- 有时也会根据业务需求，使用`Intersection Observer API`自己实现一个简化版。
2. 分页和无限滚动。
分页/无限滚动
这是两种更业务层面的策略。
分页：
做了什么：明确地将数据分成多页，用户通过点击页码或“加载更多”按钮来请求和渲染新数据。
优点：实现简单，SEO友好，对浏览器内存压力小。
缺点：交互不连贯，需要用户主动操作。
无限滚动：
做了什么：当用户滚动到底部附近时，自动加载下一页数据并追加到当前列表后面。
优点：用户体验流畅，适合内容流（如社交媒体、商品列表）。
缺点：实现比简单分页复杂，需要管理滚动位置和加载状态；页面性能会随着滚动逐渐下降（因为DOM节点在持续增多）；页脚可能永远无法到达。
优化点：可以与虚拟滚动结合，即在无限滚动的列表上再套一层虚拟滚动，这样即使加载了很多数据，DOM 节点数也保持恒定。

2. 微观优化：当必须渲染长列表时
如果因为某些原因（如SEO、复杂的交互）不能使用虚拟滚动，我会做以下优化：
优化 key 属性
做了什么：确保为每个列表项使用一个唯一且稳定的 key（如数据中的 id），而不是数组的 index。
为什么：这能帮助框架（React/Vue）更准确地识别哪些节点可以被复用、移动或销毁，从而最大限度地减少不必要的 DOM 操作。
避免内联对象和函数
做了什么：
- 将内联的样式对象`(style={{ color: 'red' }}) 和函数 (onClick={() => {...}}) 提取到组件外部或使用 useCallback/useMemo`进行记忆化。
为什么：内联的引用类型（对象、函数）每次渲染都会创建一个新的引用，导致子组件即使 props 内容没变，也会因为引用不同而进行不必要的重渲染。
简化子组件/使用`PureComponent`或`React.memo`。
做了什么：
将列表项拆分成独立的、轻量的子组件。
使用`React.memo（函数组件）`或`PureComponent（类组件）`来包裹它们。这些组件会对props进行浅比较，只有在 props 真正变化时才会重新渲染。
为什么：当父列表组件因为状态更新而重渲染时，可以阻止所有子项都跟着重渲染。
不可变数据与结构共享
做了什么：在更新列表数据时（如增、删、改），使用不可变数据的方式（如`ES6 扩展运算符 ...， Immer.js等`）来创建新的数据引用。
为什么：这能让 React.memo 的浅比较快速失效，从而只精确地重渲染发生变化的那一个列表项，其他项因为引用未变，会被跳过。
控制更新粒度
做了什么：如果列表项内部有频繁的独立状态更新（如每个项都有一个点赞按钮），我会使用状态管理库（如 Redux, Zustand）或将状态下放到每个列表项组件自身，避免触发整个列表的根组件更新。
3. 其他辅助优化
图片懒加载
做了什么：对于列表中的图片，使用`loading="lazy"`属性或`Intersection Observer`来实现懒加载。只有当图片进入或接近视口时才加载它们。
为什么：极大减少页面初始化时的HTTP请求数和带宽占用。
使用 CSS属性 `contain: content`
做了什么：为列表项添加`contain: content; CSS`属性。
为什么：这告诉浏览器，这个元素的子树是独立于页面其余部分的。这可以让浏览器在重绘和重排时做更少的计算，从而提升滚动性能。

## 数组扁平化、去重、排序

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
let flatArr = arr.flat(4)
let disArr = Array.from(new Set(flatArr))
let result = disArr.sort(function(a, b){return a - b})
```

## leetcode：LRU 缓存机制

- 运用你所掌握的数据结构，设计和实现一个`LRU (最近最少使用)`缓存机制。它应该支持以下操作： 获取数据 get 和写入数据 put 。
获取数据`get(key) - 如果密钥 ( key )`存在于缓存中，则获取密钥的值（总是正数），否则返回-1 。
写入数据`put(key, value)`- 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间。
进阶:
你是否可以在 O(1) 时间复杂度内完成这两种操作？
示例:
```js
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4

class LRUCache {
    max: number = 0
    cache: Map<number, number>
    constructor(capacity: number) {
        this.max = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        const {cache} = this;

        let value = cache.get(key)
        if(value !== undefined){
            cache.delete(key)
            cache.set(key, value)
            return value;
        } else {
            return -1
        }
    }

    put(key: number, value: number): void {
        const {cache} = this;
        
        // 如果键已存在，先删除再重新插入以更新顺序
        if (cache.has(key)) {
            cache.delete(key);
        }
        // 如果缓存已满且要添加新键，删除最久未使用的
        else if (cache.size >= this.max) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        
        cache.set(key, value);
    }
}
```