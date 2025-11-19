---

title: 2025年｜前端面试练习题
date: 2025-11-18 15:17:59
tags:
  - 2025
  - 面试
  - 前端

---

## 你在长列表优化中做了哪些具体的事情？

**核心思路**：避免同时渲染大量的 DOM 节点，因为 DOM 节点的创建、渲染和内存占用都非常消耗性能。

### 1. 虚拟滚动

- **计算可视区域**：监听容器的滚动事件，获取 `scrollTop` 和 `scrollTop + clientHeight`
- **计算渲染区间**：根据可视区域和每个列表项的高度，计算出需要渲染的起始索引 `startIndex` 和结束索引 `endIndex`。通常会上下多渲染 5-10 个项，防止滚动时出现白屏
- **动态渲染和定位**：
  - 只渲染 `[startIndex, endIndex]` 区间的列表项
  - 容器高度设置为所有列表项的总高度，通过"撑开容器"实现
  - 对渲染的列表项使用 `position: absolute` 或 `transform: translateY(...)`，设置 `top` 属性为 `索引 × 列表项高度`
- **性能优化**：
  - 使用 `requestAnimationFrame` 优化动画或 `Intersection Observer` 优化滚动监听
  - 缓存已计算的位置，对于动态高度的列表需要在渲染后测量并缓存高度
- **使用的库/技术**：
  - React: `react-window`, `react-virtualized`
  - Vue: `vue-virtual-scroller`
  - 也可根据业务需求使用 `Intersection Observer API` 自己实现简化版

### 2. 分页和无限滚动

#### 分页
- **实现方式**：明确将数据分成多页，用户通过点击页码或"加载更多"按钮请求新数据
- **优点**：实现简单，SEO 友好，内存压力小
- **缺点**：交互不连贯，需要用户主动操作

#### 无限滚动
- **实现方式**：当用户滚动到底部附近时，自动加载下一页数据并追加到当前列表
- **优点**：用户体验流畅，适合内容流（社交媒体、商品列表）
- **缺点**：实现复杂，需要管理滚动位置和加载状态；性能随滚动逐渐下降；页脚可能无法到达
- **优化点**：可与虚拟滚动结合，即使加载很多数据，DOM 节点数也保持恒定

### 3. 微观优化：必须渲染长列表时

- **优化 `key` 属性**：
  - 使用唯一且稳定的 key（如数据中的 id），而不是数组的 index
  - 帮助框架准确识别哪些节点可被复用、移动或销毁

- **避免内联对象和函数**：
  - 将内联样式对象和函数提取到组件外部，或使用 `useCallback`/`useMemo` 进行记忆化
  - 避免因引用不同导致的不必要重渲染

- **简化子组件**：
  - 将列表项拆分成独立的轻量子组件
  - 使用 `React.memo`（函数组件）或 `PureComponent`（类组件）进行包裹

- **不可变数据与结构共享**：
  - 使用不可变数据的方式更新列表数据（ES6 扩展运算符、Immer.js 等）
  - 让 `React.memo` 的浅比较快速失效，精确重渲染发生变化的项

- **控制更新粒度**：
  - 将频繁更新的状态（如点赞按钮）下放到每个列表项组件自身
  - 使用状态管理库避免触发整个列表的根组件更新

### 4. 其他辅助优化

- **图片懒加载**：
  - 使用 `loading="lazy"` 属性或 `Intersection Observer`
  - 减少页面初始化时的 HTTP 请求数和带宽占用

- **使用 CSS 属性 `contain: content`**：
  - 告诉浏览器元素的子树独立于页面其余部分
  - 减少重绘和重排时的计算量，提升滚动性能

## 数组扁平化、去重、排序

```javascript
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// 扁平化
let flatArr = arr.flat(4);

// 去重
let disArr = Array.from(new Set(flatArr));

// 排序
let result = disArr.sort(function(a, b) {
    return a - b;
});

console.log(result);
```

## LeetCode：LRU 缓存机制

运用你所掌握的数据结构，设计和实现一个 **LRU (最近最少使用)** 缓存机制。它应该支持以下操作：获取数据 get 和写入数据 put。

- 获取数据 `get(key)` - 如果密钥存在于缓存中，则获取密钥的值（总是正数），否则返回 -1
- 写入数据 `put(key, value)` - 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间

**进阶**：你是否可以在 O(1) 时间复杂度内完成这两种操作？

**示例**：
```javascript
LRUCache cache = new LRUCache(2); // 缓存容量

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回 1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回 3
cache.get(4);       // 返回 4
```

**实现**：
```typescript
class LRUCache {
    max: number = 0;
    cache: Map<number, number>;
    
    constructor(capacity: number) {
        this.max = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        const { cache } = this;
        let value = cache.get(key);
        
        if (value !== undefined) {
            cache.delete(key);
            cache.set(key, value);
            return value;
        } else {
            return -1;
        }
    }

    put(key: number, value: number): void {
        const { cache } = this;
        
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