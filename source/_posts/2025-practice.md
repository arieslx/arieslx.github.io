---

title: 2025年｜前端面试练习题
date: 2025-11-18 15:17:59
tags:
  - 2025
  - front-end-interview

---

## 你在长列表优化中做了哪些具体的事情？

**核心思路**：避免同时渲染大量的`DOM`节点，因为`DOM`节点的创建、渲染和内存占用都非常消耗性能。

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
- **优点**：实现简单，`SEO`友好，内存压力小
- **缺点**：交互不连贯，需要用户主动操作

#### 无限滚动
- **实现方式**：当用户滚动到底部附近时，自动加载下一页数据并追加到当前列表
- **优点**：用户体验流畅，适合内容流（社交媒体、商品列表）
- **缺点**：实现复杂，需要管理滚动位置和加载状态；性能随滚动逐渐下降；页脚可能无法到达
- **优化点**：可与虚拟滚动结合，即使加载很多数据，`DOM`节点数也保持恒定

### 3. 微观优化：必须渲染长列表时

- **优化`key`属性**：
  - 使用唯一且稳定的`key`（如数据中的 id），而不是数组的index
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

## 数组扁平化与去重

## 数组扁平化（数组降维）

### Array.prototype.flat() 方法

MDN：`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
const test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// 不传参数时，默认扁平化一层
test.flat()
// ["a", "b", "c", "d", ["e", ["f"]], "g"]

// 传入一个整数参数，整数即扁平化的层数
test.flat(2)
// ["a", "b", "c", "d", "e", ["f"], "g"]

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
test.flat(Infinity)
// ["a", "b", "c", "d", "e", "f", "g"]

// 传入 <=0 的整数将返回原数组，不扁平化
test.flat(0)
test.flat(-10)
// ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// 如果原数组有空位，******flat()方法会跳过空位。
["a", "b", "c", "d",,].flat()
// ["a", "b", "c", "d"]
```

### Array.prototype.flat() 特性总结

- 用于将嵌套的数组扁平化，变成一维的数组
- 该方法返回一个新数组，对原数据没有影响
- 不传参数时，默认扁平化一层
- 可以传入一个整数，表示想要扁平化的层数
- 传入 <=0 的整数将返回原数组，不扁平化
- `Infinity` 关键字作为参数时，无论多少层嵌套，都会转为一维数组
- 如果原数组有空位，`Array.prototype.flat()` 会跳过空位

## 手动实现扁平化方法

### 方法一：使用 reduce 方法

#### 一次性扁平化所有

```javascript
function flattenDeep(arr) { 
    return Array.isArray(arr)
      ? arr.reduce( (acc, cur) => [...acc, ...flattenDeep(cur)] , [])
      : [arr]
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
flattenDeep(test)
// ["a", "b", "c", "d", "e", "f", "g"]
```

#### 实现 flat 函数

```javascript
function flat(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, cur) => {
        if(Array.isArray(cur)) {
            return [...acc, ...flat(cur, depth-1)]
        }
        return [...acc, cur]
    } , [])
      : arr
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// 不传参数时，默认扁平化一层
flat(test)
// ["a", "b", "c", "d", ["e", ["f"]], "g"]

// 传入一个整数参数，整数即扁平化的层数
flat(test, 2)
// ["a", "b", "c", "d", "e", ["f"], "g"]

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
flat(test, Infinity)
// ["a", "b", "c", "d", "e", "f", "g"]

// 传入 <=0 的整数将返回原数组，不扁平化
flat(test, 0)
flat(test, -10)
// ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];

// 如果原数组有空位，flat()方法会跳过空位。
var arr = ["a", "b", "c", "d",,]
flat(arr)
// ["a", "b", "c", "d"]
```

### 方法二：使用栈

#### 一次性降维所有

```javascript
function flattenDeep(arr) {
  const result = [] 
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr]
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop() 
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val) 
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val)
    }
  }
  return result
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
flattenDeep(test)
// ["a", "b", "c", "d", "e", "f", "g"]
```

## 数组去重

### 方式一：Set（ES6）

```javascript
function unique(arr) {
    return Array.from(new Set(arr))
}
// 或者
var unique = arr => [...new Set(arr)]

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```

### 方式二：reduce

```javascript
function unique (arr) {
    return arr.sort().reduce((acc, cur) => {
    	if (acc.length === 0 || acc[acc.length - 1] !== cur) {
        	acc.push(cur);
    	}
    	return acc
	}, [])
}

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```

### 方法三：filter

```javascript
function unique(arr) { 
    return arr.filter( (element, index, array) => {
    	return array.indexOf(element) === index
	})
}

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```

## 数组原地去重方法

## 方法一：排序去重

```javascript
const removeDuplicates = (nums) => {
    // 原地排序
    nums.sort()
    // 去重
    let len = 1
    for (let i = 1; i < nums.length; i++)
        if (nums[i] != nums[i-1]) nums[len++] = nums[i];
    // 删除重复项
    nums.splice(len)
    return nums
}

// 测试
removeDuplicates([1, 2, 3, 1, 3])
// [1, 2, 3]
```

**特点：**
- 使用 `sort()` 方法进行原地排序
- 通过双指针技巧在排序后的数组中去除重复项
- 最后使用 `splice()` 删除多余的重复元素

## 方法二：优化版本

```javascript
const removeDuplicates = (nums) => {
    let len = nums.length - 1
    for(let i = len; i>=0; i--) {
        if(nums.indexOf(nums[i]) != i) {
            nums[i] = nums[len --]
        }
    }
    // 删除重复项
    nums.splice(len+1)
    return nums
}

// 测试
removeDuplicates([1, 2, 3, 1, 3])
// [1, 2, 3]
```

**特点：**
- 从后向前遍历数组
- 使用 `indexOf` 检查当前元素是否为重复项
- 将重复元素与数组末尾元素交换，然后缩短数组长度
- 最后使用 `splice()` 删除末尾的重复元素

## 两种方法的比较

| 方法 | 优点 | 缺点 | 是否保持原顺序 |
|------|------|------|----------------|
| 排序去重 | 效率较高 | 改变元素原始顺序 | 否 |
| 优化版本 | 保持元素原始顺序 | 效率相对较低 | 是 |

## 数组去重函数（支持对象和数组元素）

###  需求说明

实现一个数组去重函数，能够处理包含对象、数组等复杂类型的元素：

- 输入：`[123, "meili", "123", "mogu", 123]`
- 输出：`[123, "meili", "123", "mogu"]`

- 输入：`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`
- 输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`

- 输入：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`
- 输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

## 基础解法：使用 JSON.stringify

```javascript
const removeDuplicates = (arr) => {
    let map = new Map()
    arr.forEach(item => {
        map.set(JSON.stringify(item), item)
    })
    return [...map.values()]
}

// 测试
removeDuplicates([123, "meili", "123", "mogu", 123])
// [123, "meili", "123", "mogu"]

removeDuplicates([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"])
// [123, [1, 2, 3], [1, "2", 3], "meili"]

removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"])
// [123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
```

## 问题分析

使用 `JSON.stringify` 的局限性：

```javascript
let o1 = {a:1, b:2}
let o2 = {b:2, a:1}

JSON.stringify(o1)
// "{"a":1,"b":2}"

JSON.stringify(o2)
// "{"b":2,"a":1}"

JSON.stringify(o1) === JSON.stringify(o2)
// false
```

**问题**：对象键顺序不同会被认为是不同的元素。

## 解决方案

### 解决思路

一个数组（包含对象等类型元素）去重函数，需要在基础类型判断相等条件下满足以下条件：

- 如果元素是数组类型，则需要数组中的每一项相等
- 如果元素是对象类型，则需要对象中的每个键值对相等

去重本身就是遍历数组，然后比较数组中的每一项是否相等而已，所以关键步骤有两步：**比较**、**去重**

**比较**：
1. 首先判断类型是否一致，类型不一致则认为两个数组元素是不同的
2. 如果是数组类型，则递归比较数组中的每个元素是否相等
3. 如果是对象类型，则递归比较对象中的每个键值对是否相等
4. 否则，直接 `===` 比较

**去重**：
- 采用 `reduce` 去重，初始 `accumulator` 为 `[]`
- 采用 `findIndex` 找到 `accumulator` 是否包含相同元素
- 如果不包含则加入，否则不加入
- 返回最终的 `accumulator`，则为去重后的数组

### 代码实现

```javascript
// 获取类型
const getType = (function() {
    const class2type = {
        '[object Boolean]': 'boolean', 
        '[object Number]': 'number', 
        '[object String]': 'string', 
        '[object Function]': 'function', 
        '[object Array]': 'array', 
        '[object Date]': 'date', 
        '[object RegExp]': 'regexp', 
        '[object Object]': 'object', 
        '[object Error]': 'error', 
        '[object Symbol]': 'symbol' 
    }

    return function getType(obj) {
        if (obj == null) {
            return obj + ''
        }
        // javascript高级程序设计中提供了一种方法,可以通用的来判断原始数据类型和引用数据类型
        const str = Object.prototype.toString.call(obj)
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[str] || 'object' : typeof obj
    };
})();

/**
 * 判断两个元素是否相等
 * @param {any} o1 比较元素
 * @param {any} o2 其他元素
 * @returns {Boolean} 是否相等
 */
const isEqual = (o1, o2) => {
    const t1 = getType(o1)
    const t2 = getType(o2)

    // 比较类型是否一致
    if (t1 !== t2) return false
    
    // 类型一致
    if (t1 === 'array') {
        // 首先判断数组包含元素个数是否相等
        if (o1.length !== o2.length) return false 
        // 比较两个数组中的每个元素
        return o1.every((item, i) => {
            return isEqual(item, o2[i])
        })
    }

    if (t1 === 'object') {
        // object类型比较类似数组
        const keysArr = Object.keys(o1)
        if (keysArr.length !== Object.keys(o2).length) return false
        // 比较每一个元素
        return keysArr.every(k => {
            return isEqual(o1[k], o2[k])
        })
    }

    return o1 === o2
}

// 数组去重
const removeDuplicates = (arr) => {
    return arr.reduce((accumulator, current) => {
        const hasIndex = accumulator.findIndex(item => isEqual(current, item))
        if (hasIndex === -1) {
            accumulator.push(current)
        }
        return accumulator
    }, [])
}

// 测试
removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}])
// [123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili", {a: 1, b: 2}]
```

## 总结

这种方法解决了 `JSON.stringify` 在面对对象键顺序不同时的局限性，通过深度比较实现了真正的对象内容去重。

### 

```js

// 模拟异步数据获取
async function* asyncNumberGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// 使用 for await...of 遍历
async function processNumbers() {
  for await (const num of asyncNumberGenerator()) {
    console.log(num); // 依次输出: 1, 2, 3
  }
}
processNumbers();

```

```js
// 模拟多个异步操作
const fetchUserData = (id, delay) => 
  new Promise(resolve => 
    setTimeout(() => resolve(`用户${id}的数据`), delay)
  );

const promises = [
  fetchUserData(1, 1000),
  fetchUserData(2, 500),
  fetchUserData(3, 1500)
];

async function processUsers() {
  console.log('开始获取用户数据...');
  
  for await (const userData of promises) {
    console.log('收到:', userData);
    // 按完成顺序输出，不是按数组顺序
  }
  
  console.log('所有数据获取完成');
}
processUsers();

```
```js
// Node.js 文件系统示例
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function readLargeFile() {
  const fileStream = createReadStream('large-file.txt');
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  
  for await (const line of rl) {
    lineCount++;
    console.log(`第${lineCount}行:`, line);
    
    // 可以在这里处理每一行，不会阻塞其他操作
    if (lineCount >= 10) {
      console.log('只显示前10行');
      break;
    }
  }
  
  console.log(`总共处理了 ${lineCount} 行`);
}
```

```js

// 同步 vs 异步迭代对比
async function compareIteration() {
  const syncArray = [1, 2, 3];
  const asyncArray = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ];

  console.log('=== 同步迭代 ===');
  for (const item of syncArray) {
    console.log(item); // 立即输出 1, 2, 3
  }

  console.log('=== 异步迭代 ===');
  for await (const item of asyncArray) {
    console.log(item); // 等待 Promise 解决后输出 1, 2, 3
  }
}
compareIteration();

```

### 手写aysnc和await

```js

ffunction asyncToGenerator(genFunc) {
  return function (...args) {
    const gen = genFunc.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = gen[key](arg);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = result;

        if (done) {
          return resolve(value);
        }

        Promise.resolve(value).then(
          val => step("next", val),
          err => step("throw", err)
        );
      }

      step("next");
    });
  };
}

// ----------------------------
// 测试代码
// ----------------------------
function* testGen() {
  const a = yield Promise.resolve(1);
  const b = yield Promise.resolve(a + 1);
  return b + 1;
}

const test = asyncToGenerator(testGen);

test().then(res => {
  console.log("结果: ", res); // 3
});


```


### 合并两个有序数组

```js

let merge = function(nums1, m, nums2, n){
    let len1 = m-1,
        len2 = n-1,
        len = m+n-1
    while(len2 >=0){
        if(len1<0){
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--]
    }

}


```

## js判断数据类型

`typeof 判断`
`Array.isArray()`
`instanceof`
`Object.prototype.toString.call()`

```js
typeof 123          // "number"
typeof "abc"        // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof {}           // "object"
typeof []           // "object"  ⚠️数组也返回 object
typeof null         // "object"  ⚠️历史 bug
typeof function(){} // "function"


Array.isArray([])   // true
Array.isArray({})   // false

[] instanceof Array      // true
{} instanceof Object     // true
new Date() instanceof Date // true

Object.prototype.toString.call(123)        // "[object Number]"
Object.prototype.toString.call("abc")      // "[object String]"
Object.prototype.toString.call(true)       // "[object Boolean]"
Object.prototype.toString.call([])         // "[object Array]"
Object.prototype.toString.call({})         // "[object Object]"
Object.prototype.toString.call(null)       // "[object Null]"
Object.prototype.toString.call(undefined)  // "[object Undefined]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(/abc/)      // "[object RegExp]"

```

## map实现reduce

```js
function myReduceMap(arr, callback, initialValue) {
  let hasInitial = arguments.length > 2;
  let accumulator = hasInitial ? initialValue : arr[0];

  arr.forEach((item, index) => {
    // 如果没有初始值，跳过第一个元素
    if (!hasInitial && index === 0) return;
    accumulator = callback(accumulator, item, index, arr);
  });

  return accumulator;
}

// 测试
const arr = [1, 2, 3, 4];

const sum = myReduceMap(arr, (acc, cur) => acc + cur, 0);
console.log(sum); // 10

const sumNoInit = myReduceMap(arr, (acc, cur) => acc + cur);
console.log(sumNoInit); // 10

const product = myReduceMap(arr, (acc, cur) => acc * cur, 1);
console.log(product); // 24
function myReduceMap(arr, callback, initialValue) {
  let hasInitial = arguments.length > 2;
  let accumulator = hasInitial ? initialValue : arr[0];

  arr.forEach((item, index) => {
    // 如果没有初始值，跳过第一个元素
    if (!hasInitial && index === 0) return;
    accumulator = callback(accumulator, item, index, arr);
  });

  return accumulator;
}

// 测试
const arr = [1, 2, 3, 4];

const sum = myReduceMap(arr, (acc, cur) => acc + cur, 0);
console.log(sum); // 10

const sumNoInit = myReduceMap(arr, (acc, cur) => acc + cur);
console.log(sumNoInit); // 10

const product = myReduceMap(arr, (acc, cur) => acc * cur, 1);
console.log(product); // 24

function myReduce(arr, callback, initialValue) {
  let hasInitial = arguments.length > 2; // 判断是否传了初始值
  let accumulator = hasInitial ? initialValue : arr[0];
  let startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

// 测试
const arr = [1, 2, 3, 4];

const sum = myReduce(arr, (acc, cur) => acc + cur, 0);
console.log(sum); // 10

const sumNoInit = myReduce(arr, (acc, cur) => acc + cur);
console.log(sumNoInit); // 10

const product = myReduce(arr, (acc, cur) => acc * cur, 1);
console.log(product); // 24


function mapReduce(arr, callback, initialValue){
  if(arr.length === 0) return initialValue;
  const accArray = arr.map((item, index) => {
    if(index === 0) {
      return callback(initialValue, item, index, arr)
    }

    return callback(accArray[index-1], item, index, arr)
  })

  return accArray[accArray.length-1];
}

function functionalReduce(arr, callback, initialValue) {
  if (arr.length === 0) return initialValue;

  const accArray = arr.map((item, index) =>
    index === 0
      ? callback(initialValue, item, index, arr)        // 第一项累加初始值
      : callback(accArray[index - 1], item, index, arr) // 后续项累加上前一步
  );

  return accArray[arr.length - 1];
}

// 测试
const arr = [1, 2, 3, 4];

const sum = functionalReduce(arr, (acc, cur) => acc + cur, 0);
console.log(sum); // 10

const product = functionalReduce(arr, (acc, cur) => acc * cur, 1);
console.log(product); // 24

```


## Jsx和React.createElement()

```js

const name = 'Alice';
const element = <h1>Hello, {name}</h1>;

const element = React.createElement(
  'h1',
  null,
  `Hello, ${name}` // 注意这是 JS 表达式求值后的结果
)

```
```
+------------------------------------------------------+
|                      JSON                            |
|------------------------------------------------------|
| {                                                    |
|   "type": "BinaryExpression",                        |
|   "operator": "+",                                   |
|   "left": { "type": "NumericLiteral", "value": 1 },  |
|   "right": { "type": "NumericLiteral", "value": 2 }  |
| }                                                    |
+------------------------------------------------------+
                          |
                          v
+------------------------------------------------------+
|                        AST                            |
|------------------------------------------------------|
|                BinaryExpression                       |
|                   /           \                       |
|    NumericLiteral(1)     NumericLiteral(2)            |
+------------------------------------------------------+
                          |
                          v
+------------------------------------------------------+
|                   Babel Parser                        |
+------------------------------------------------------+
                          |
                          v
+------------------------------------------------------+
|                    JavaScript                         |
|------------------------------------------------------|
|                const a = 1 + 2;                       |
+------------------------------------------------------+
```

低代码平台的核心就是“配置转代码”和“代码回流配置”。
用户拖拽产生的是 JSON Schema，我会把这个 Schema 转成 AST，使用 Babel Types 生成 JSX，再用 Generator 输出 React/Vue 代码。
用户修改代码时，我反向用`Babel Parser`把代码解析成AST，再还原成`JSON Schema`，这样可视化和代码能双向同步。
事件表达式、安全校验、自动 import、属性补全、跨端转换（React → H5/Native）也都是基于`AST`的遍历和重写完成的。
所以AST是低代码的“编译器基础设施”.

## AST转换

为什么前端`AST`转换用`DFS`？
因为Babel、ESLint都是基于`DFS preOrder + postOrder`的。

```js
const ast = {
  type: "BinaryExpression",
  operator: "+",
  left: {
    type: "NumericLiteral",
    value: 1
  },
  right: {
    type: "BinaryExpression",
    operator: "*",
    left: { type: "NumericLiteral", value: 2 },
    right: { type: "NumericLiteral", value: 3 }
  }
}


function traverse(node, callback){
  if(!node) return;
  callback(node)
  if(node.left) traverse(node.left, callback)
  if(node.right) traverse(node.right, callback)
}

traverse(ast, (node) => {
  console.log("visit:", node.type);
});
```

## 预加载

❓“preload 和 prefetch 区别是什么？”
完美回答：
preload 是为当前页面做的高优先级加载；
prefetch 是为未来页面做的低优先级加载。
preload 立即加载并参与渲染；
prefetch 在空闲时间加载，不阻塞当前渲染。
❓“preload 字体为什么要加 crossorigin？”
因为字体是跨域资源，浏览器需要使用 CORS 才能缓存。
否则会重复下载两次。
❓“什么时候用 preconnect？”
当你要请求第三方域名（CDN、API、字体）时，提前建好连接，可以减少 50~300ms 的延迟。

7. 最佳实践（实际项目中这样写）
🌟 推荐的 HTML 头部
```html
<!-- 提前解析 DNS -->
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 提前建立连接 -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<!-- 首屏关键 CSS / JS -->
<link rel="preload" href="/static/main.css" as="style">
<link rel="preload" href="/static/main.js" as="script">

<!-- 字体 -->
<link rel="preload" href="/fonts/myfont.woff2" as="font" crossorigin>
```

### 浅拷贝和深拷贝

```js
//浅拷贝
const copy1 = {...obj};

const copy2 = Object.assign({}, obj)

const copy3 = arr.slice();

const copy4 = Array.from(arr)
```

```js
//深拷贝
const deepCopy1 = JSON.parse(JSON.stringify(obj))

const deepClone(obj){
  if(obj===null || typeof obj !== 'object') return obj;
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof Array) return obj.map(item => deepClone(item));

  const cloned = {};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      cloned[key] = deepClone(obj(key))
    }
  }
  return cloned
}

const deepCopy3 = _.cloneDeep(obj)
```

### JSON方法深拷贝的局限性
```js
const obj = {
  date: new Date(),           // 会被转为字符串
  func: function() {},        // 会被丢失
  undefined: undefined,       // 会被丢失
  infinity: Infinity,         // 会被转为 null
  regexp: /pattern/,          // 会被转为空对象
  symbol: Symbol('foo'),      // 会被丢失
  // 循环引用会导致错误
};

// 循环引用问题
obj.self = obj;
JSON.parse(JSON.stringify(obj)); // 报错：Converting circular structure to JSON
```
