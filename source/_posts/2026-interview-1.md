---
title: 2026年｜interview test
date: 2025-11-7 17:17:59
tags:
  - 2025
  - front-end-interview
---

1. 一维数组每三个切成一个数组，形成二维数组
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

2. 数组转树（扁平结构 → Tree）

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

3. 分析

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

4. linux环境

[linux环境配置文章](https://juejin.cn/post/7118919471317647397/)

5. 准备一个demo。
7. 提前了解web3的专业术语和相关知识。