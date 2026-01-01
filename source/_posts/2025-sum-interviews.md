---
title: 2025年｜最近找工作在复习一些什么？
date: 2025-10-31 17:17:59
tags:
  - 2025
  - front-end-interview
---

## 最近找工作在复习些什么？
### 面试题题库
1. [剑指前端offer](https://febook.hzfe.org/awesome-interview/)
- webpack内容不详细。
2. [前端内参](https://coffe1891.gitbook.io/frontend-hard-mode-interview)
- 前端内参是从简单到难涵盖了前端大部分的新概念和提醒以及部分算法题。讲得挺深入详细的。
1. 暂时还没写AMD和CommonJS
2. 三大框架那些省略了。
3. 看完十大排序算法即可，后面有些内容写的不好，设计模式那章也可以读读看。
3. [瓶子君博客](https://github.com/sisterAn/JavaScript-Algorithms)

这两个题库都是我之前保存还没有完整背过的题库，大部分是八股文，涵盖范围也比较广
- 剑指前端offter分为四块模拟题：每个模块都包涵不同的提醒，内容有些简单有些详细，建议喂给chatgpt或deepseek，延展一些题目的细节，亲测很好用。

- 瓶子君的博客有关源码和算法的内容讲的特别棒，里面有些错漏需要自己跑代码来排查，不过逻辑上很值得学习，深入浅出，非常好。
### 面试技巧

1. 类比法（很有效）
你不会 Webpack 原理 → 类比 Vite → 类比 ESBuild → 引导到你会的 bundler 经验。
你不会红黑树 → 讲 JS Map 查找复杂度 + GC 优化。

这个知识点我记不全，但如果让我推断，我会从 XX 和 XX 逻辑入手

2. 现实工程举例（面试官最爱听）
你不会 HTTP2 push → 讲 CSR/SSR/预渲染优化。
你不会微任务细节 → 讲调试 async/await 卡死的经验。

工程落地。

3. 主动给改进建议
比如问你一个虚拟 DOM 的细节你忘了：
“虽然我答不全，但基于现在的框架趋势我其实更推荐 signals / fine-grained reactivity，这能解决虚拟 DOM 的一些瓶颈。”
立刻显得你懂趋势、懂架构。

4. 小结法（让你显得稳）
“虽然我不能把这个知识点 100% 复述，但我能从原理、关联技术和工程实践三个角度保证我能把它用对。”

5. 动态拆解。这个知识点我没有完全记住/我平时接触不多，但我可以基于原理尝试分析一下。

### 作业帮一面

vite和webpack
content-type
数组扁平化
```js
function flattern(arr, depth){
  if(depth > 0) {
    return arr.reduce((acc, cur) => acc.concat(flattern(cur, depth - 1)), [])
  } else {
    return arr
  }
}
```
执行顺序问题
答的不好。

### 某公司一面，怎么判断链表有环

用快慢指针，slow指针每次走一步，fast指针每次走两步。如果链表无环，fast一定会先走到null，说明没有环。如果链表有环，fast和slow指针会相遇。只有slow===fast，说明有环。时间复杂度O(n)，空间复杂度O(1)。

### 某公司一面

```js
/** * 
 * 1.实现一个sameValue函数，判断两个值是否相等。相等返回 true，不相等返回 false。
 * 2.参数a和b可以是任意类型，包括基本类型和引用类型。 
 * 3.保证以下Case输出目标值 
 * 4.禁止使用JSON.stringify方法 
 * console.log("0 and -0",sameValue(0, -0)); // false
 * console.log("NaN and NaN",sameValue(NaN, NaN)); // false 
 * console.log("undefined and null",sameValue(undefined, null)); // false 
 * console.log("array and array",sameValue([1, 2, 3], [1, 2, 3])); // true 
 * console.log("object and object",sameValue({a: 1}, {a: 1})); // true 
 * console.log("object and object",sameValue({a: 1}, {a: 1, b: 2})); // false 
 * console.log("object and null",sameValue({a: 1}, null)); // false 
 * console.log("null and object",sameValue(null, {a: 1})); // false 
 * console.log("array and object",sameValue([1, 2], {0: 1, 1: 2})); // false
 **/
function sameValue(a, b) {
  // 1️⃣ 处理 NaN
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  // 2️⃣ 处理 0 与 -0（0 === -0 为 true，但本题要求 false）
  if (a === 0 && b === 0) return 1 / a === 1 / b;

  // 3️⃣ 基本类型（包括函数）直接比较
  if (a === b) return true;

  // 4️⃣ 处理 null（typeof null === 'object'）
  if (a === null || b === null) return false;

  // 5️⃣ 引用类型：必须类型一致（都是数组 或 都是对象）
  if (typeof a !== "object" || typeof b !== "object") return false;

  // 6️⃣ 数组类型必须一致
  const isArrA = Array.isArray(a);
  const isArrB = Array.isArray(b);
  if (isArrA !== isArrB) return false;

  // 7️⃣ 键数量必须一致
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  // 8️⃣ 每个 key 的对应值也必须相等（递归）
  for (let key of keysA) {
    if (!sameValue(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
```
#### npm包按需加载
npm包按需加载依赖 tree-shaking 和代码分割。
只要 npm 包支持独立模块文件（如 lodash/debounce）或 ESM 格式（如 lodash-es），打包器就能自动删除未使用的代码。
也可以通过动态 import 实现运行时按需加载，而 UI 库通常通过 babel-plugin-import 或自动按需工具实现组件级别加载。
本质是减少 bundle 体积和提升性能

### web3公司一面，被问懵了。

```js
function main() {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 1000);
  setTimeout(() => {
    console.log(3);
    Promise.resolve(4).then((res) => {
      console.log(res);
    });
  }, 500);
  try {
    new Promise((resolve, reject) => {
      console.log(5);
      reject(6);
      console.log(7);
      resolve(8);
    }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log("error", error);
  }
  console.log(9);
}
//
// 1
// 5
// 7
// 9
// 3
// 4
// 2

```
```js
const [count, setCount] = useState(0) 
useEffect(() => { 
    const timer = setInterval(() => { console.log("count", count) }, 1000); 
    return () => { clearInterval(timer) } }, ) 
const handleClick = () => { setCount(count + 1) }
```

