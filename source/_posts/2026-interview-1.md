---
title: 2026年｜interview test
date: 2025-11-7 17:17:59
tags:
  - 2025
  - front-end-interview
  - done
---

### 一维数组每三个切成一个数组，形成二维数组
```js
// 一维数组每三个切成一个数组，形成二维数组
function chunk(arr, size=3){
    let result = [];
    for(let i =0; i < arr.length; i+=size){
        result.push(arr.slice(i, i+size))
    }
    return result;
}

chunk([1,2,3,4,5,6,7,8,9,10])    
```

### 数组转树（扁平结构 → Tree）,list -> tree

```js
// const list = [
//   { id: 1, parentId: null },
//   { id: 2, parentId: 1 },
//   { id: 3, parentId: 1 },
//   { id: 4, parentId: 2 }
// ];

function arrayToTree(list) {
    const map = {};
    const result = [];

    list.forEach(item => {
        map[item.id] = {...item, children: []}
    })

    list.forEach(item => {
        if(item.parentId == null){
            result.push(map[item.id])
        } else {
            map[item.parentId].children.push(map[item.id])
        }
    })

    return result;
}   
```

### 事件循环执行顺序分析

```js
const async1 = async () => {
console.log('async1');
setTimeout(() => {
console.log('timer1')
}, 2000)
await new Promise(resolve => {
console.log('promise1')
})
console.log('async1 end')
return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
.then(2)
.then(Promise.resolve(3))
.catch(4)
.then(res => console.log(res))
setTimeout(() => {
console.log('timer2')
}, 1000)

// script start
// async1
// promise1
// script end
// 1
// timer2
// timer1

// ❓ 3. 如果在 Promise 里加一句 resolve() 呢？
// await new Promise(resolve => {
//   console.log('promise1');
//   resolve();
// });


// 那输出会变成：

// script start
// async1
// promise1
// script end
// async1 end
// async1 success
// 1
// timer2
// timer1

```

### linux部署环境

[linux环境配置文章](https://juejin.cn/post/7118919471317647397/)

### web3大公司
1. 准备一个demo。
2. 提前了解web3的专业术语和相关知识。

面试被鸽了，继续普通面试题+ai辅助。我感觉这堆题目好难记，过段时间就忘了，理解了之后又忘了的过程无敌痛苦，可能还是我重刷太少。

### 获取数组层级

```js

// 递归 ?
function getArrayDepth(arr){
    if(!Array.isArray(arr)) return 0

    let maxDepth = 1;

    for(const item of arr){
        if(Array.isArray(item)){
            maxDepth = Math.max(
                maxDepth,
                1+getArrayDepth(item)
            )
        }
    }

    return maxDepth
}

function getArrayDepth1(arr){
    if(!Array.isArray(arr)) return 0
    return arr.reduce((max, item) => {
        const depth = Array.isArray(item)
        ? getArrayDepth(item)
        : 0;
        return Math.max(max, depth);
    }, 0) + 1
}

// ? 用stack好不方便记忆啊
function getArrayDepth2(arr){
    if(!Array.isArray(arr)) return 0;

    let maxDepth = 0;
    const stack = [{value: arr, depth: 1}];

    while(stack.length) {
        const {value, depth} = stack.pop();
        maxDepth = Math.max(maxDepth, depth);

        for (const item of value){
            if(Array.isArray(item)) {
                stack.push({value: item, depth: depth + 1})
            }
        }
    }

    // RAG chunking / JSON 裁剪, RAG / AST / JSON Schema 分析
    return maxDepth;
}

```

### 实现 Promise.all()

```js
/**
Promise.all(iterable) 有几个硬规则：
参数是可迭代对象（一般是数组）
返回一个 新的 Promise
全部成功 → 按顺序返回结果数组
有一个失败 → 立刻 reject（短路）
元素可以不是 Promise（要用 Promise.resolve 包一层）
顺序 ≠ 完成顺序，而是输入顺序
*/

function myPromiseAll(promises){
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)){
            return reject(new TypeError('Argument must be an array'))
        }

        const result = [];
        let count = 0;
        const total = promises.length;

        if(total === 0){
            resolve([]);
            return;
        }

        promises.forEach((p, index) => {
            Promise.resolve(p)
            .then(value => {
                result[index] = value;
                count++;

                if(count === total){
                    resolve(result)
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    })
}
```

7. 一句话总结关键词，方便记忆，方便后期拓展搜索。
- React.memo 用于函数组件、只浅比较 props；PureComponent用于类组件、同时浅比较 props和state，本质都是避免不必要的重新渲染。memo可以用useMemo来做优化，避免值一样的Obj重新render。
- 如何判断object为空，严谨：`Reflect.ownKeys({}).length === 0`
- ==和===的区别：“==”先隐式类型转换，再判断值是否相等。“===”直接判断，类型+值是否相等。
- 基础类型存放于栈，变量记录原始值；引用类型存放堆，变量记录地址。
- typeof null // "object",历史遗留问题
- Object.prototype.toString.call(null) //"[object Null]"
- arr instanceof Array // true
- Array.isArray([]) // true
- 常用判断对象：JSON.stringify(obj1) === JSON.stringify(obj2);
- 某个feishu上的55题关于事件循环解释得很好。
- 清空数组：arr.length = 0
- 找到页面上所有a标签的href属性：Array.from(document.getElementByTagName('a')).map(item => item.href)
- 反转字符串：str.split('').reverse().join('')
- depcheck：检查幽灵依赖。
- Hooks为什么必须写在最外层？依赖调用顺序来索引Fiber上的hook链表
- 为什么hooks不能写在if里？Hooks依赖调用顺序来匹配Fiber上的hook链表。

8. useRef和useState的本质区别是什么？为什么 useRef 改变不会触发重新渲染？
核心点

useState → 状态参与渲染流程
useRef → 逃离渲染系统的可变容器

useRef 返回的是 { current }，React 不会追踪 current 的变化
useState 的变化会进入 Fiber 的 update queue
useRef 更像是「组件级别的instance变量」

useRef在一次组件生命周期内地址是稳定的，相当于class component的this.xxx

hooks 本质是按顺序挂在Fiber上的链表
useRef在mount阶段创建一次
update阶段直接复用同一个ref对象

useRef的current并不是“保存状态”，而是React帮你保存了一个不参与diff的对象引用

useRef解决的闭包问题
```js
const countRef = useRef(count)

useEffect(() => {
  countRef.current = count
})
```

```js
// useMemo,useCallback
useCallback(fn, deps)
// 等价于
useMemo(() => fn, deps)
```

### 手写useEvent hooks
```js
function useEvent(fn) {
  const ref = useRef(fn)
  ref.current = fn

  return useCallback((...args) => {
    return ref.current(...args)
  }, [])
}
```