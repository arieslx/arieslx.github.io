---
title: 2025年｜Binary Tree Excercise
date: 2025-11-11 11:17:59
tags:
  - 2025
  - front-end-interview
---

## 判断是否是平衡二叉树

### 前序遍历

```js

const isBalanced = function(root){
  if(root === null){
    return true;
  }else {
    return Math.abs(height(root.left) -height(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
  }
}

const height = function(root){
  if(root === null){
    return 0
  } else {
    return Math.max(height(root.left), height(root.right)) + 1
  }
}


```

### 后序遍历

```js
let isBalanced = function(root){
  return height(root) != -1
}

let height = function(root){
  if(root == null){
    return 0
  }
  
  const left = height(root.left)
  const right = height(root.right)

  if(left === -1 || right === -1 || Math.abs(left-right)>1){
    return -1
  }

  return Math.max(left, right)

}

```

## new操作符的模拟实现

```js

function fakeNew() {
  let obj = Object.create(null);
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" && rest !== null ? ret : obj;
}

function Group(name, member){
    this.name = name;
    this.member = member;
  }

let group = fakeNew(Group, 'xx', 1)
```

## 防抖和节流
### 防抖：搜索/窗口大小变化

```js

function debounce(func, delay){
  let timer = null;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

function debounce1(func, delay){
  let timer = null;
  return function(){
    if(timer){
      clearTimeout(timer);
      timer = null
    }
    let self = this;
    let args = arguments

    timer = setTimeout(() => {
      func.apply(self, args)
      timer = null
    }, delay)
  }
}

```

### 节流：滚动事件/按钮防止重复点击/鼠标移动和拖拽

```js

function throttle(func, delay){
  let last = 0;
  return function(...args){
    const now = Date.now();
    if(now-last >= delay){
      func.apply(this, args);
      last = now;
    }
  }
}

function throttle1(func, delay, options = {}) {
  let last = 0;
  let timer = null;
  const { leading = true, trailing = true } = options;

  return function(...args) {
    const now = Date.now();
    const context = this;

    // 如果是第一次且不需要立即执行
    if (!last && !leading) {
      last = now;
    }

    const remainWaitTime = delay - (now - last);

    if (remainWaitTime <= 0) {
      // 清除之前的定时器
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      func.apply(context, args);  
    } else if (!timer && trailing) {
      // 设置定时器确保最后一次执行
      timer = setTimeout(() => {
        last = leading ? Date.now() : 0;
        timer = null;
        func.apply(context, args);
      }, remainWaitTime);
    }
  };
}

// 1. 默认行为：首尾都执行
throttle1(func, 300); // 等同于 {leading: true, trailing: true}

// 2. 只执行首部（立即执行）
throttle1(func, 300, {leading: true, trailing: false});

// 3. 只执行尾部（延迟执行）
throttle1(func, 300, {leading: false, trailing: true});

// 4. 都不执行（无意义，函数永远不会执行）
throttle1(func, 300, {leading: false, trailing: false});

```

## 反转链表

```js

const reverseList = function(head){
  let cur = header;
  let pre = null;
  while(cur){
    const temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre
}

const reverseList1 = function(head){
  if(head == null || head.next == null){
    return head;
  }

  const reverseHead = reverseList(head.next)
  head.next.next = head;
  head.next = null;
  return reverseHead;
}
```

## 将列表还原为树状结构
### 递归

```js

function listToTree(list, pid = null, {idName = "id", pidName = "pid", childName = "children"} = {}){
  return list.reduce(() => {
    if(item[pidNmae] === pid){
      const children = listToTree(list, item[idName]);
      if(children.length > 0){
        item[childName] = children;
      }
      return [...root, item];
    }
    return root;
  }, [])
}

function listToTree1(list, rootId = null, {idName = "id", pidName = "pid", childName = "children"} = {}){
  const record = {};
  const root = [];

  list.forEach(item => {
    record[item[idName]] = item;
    item[childName] = []
  })

  list.forEach((item) => {
    if(item[pidName] === rootId){
      root.push(item)
    }else{
      record[item[pidName]][childName].push(item)
    }
  });
  return root;
}


function listToTree2(list, rootId = null, {idName="id", pidName="pid", childName="children"} = {}){
  const record = {};
  const root = [];

  list.forEach((item) => {
    const id = item[idName]
    const parentId = item[pidName]

    record[id] = !record[id] ? item : {...item, ...record[id]}
    const treeItem = record[id]
    if(parentId === rootId){
      root.push(treeItem)
    }else{
      if(!record[parentId]){
        record[parentId] = {}
      }

      if(!record[parentId][childName]){
        record[parentId][childName] = []
      }

      record[parentId][childName].push(treeItem)
    }
  })

  return root;
}

function listToTree3(list, rootId=null, {idName="id", pidName="pid", childName="children"}={}){
  const record = {};
  const root = [];
  list.forEach((item) => {
    const newItem = Object.assign({}, item);
    const id = newItem[idName]
    const parentId = newItem[pidName]

    newItem[childName] = record[id]?record[id]:(record[id]=[])
    if(parentId === rootId){
      root.push(newItem)
    }else{
      if(!record[parentId]){
        record[parentId] = []
      }
      record[parentId].push(newItem)
    }
  })
  return root;
}
```

## 二叉搜索树的第k大节点
### 递归
```js
const kthLargest = () => {
  let res = null;
  const dfs = (root) => {
    if(!root) return;
    dfs(root.right);
    if(k===0) return;
    if(--k===0){
      res=root.val
    }
    dfs(root.left);
  }
  dfs(root);
  return res;
}

const kthLargest1 = function(root, k){
  if(!root) return 0;
  const stack = [];
  while(stack.length || root){
    while(root){
      stack.push(root);
      root = root.right;
    }

    const cur = stack.pop();
    k--;
    if(k===0) return cur.val;
    root = cur.left;
  }
  return 0
}

```

## 实现apply/call/bind

### apply
```js

Function.prototype.apply = function(thisArg, argsArray){
  if(typeof this !== 'function'){
    throw new TypeError('Function.prototype.apply called on non-function')
  }

  if(thisArg === undefined || thisArg === null){
    thisArg = window;
  }else{
    thisArg = Object(thisArg)
  }

  const func = Symbol('func');
  thisArg[func] = this;

  let result;

  if(argArray && typeof argArray === 'obejct' && 'length' in argsArray){
    result = thisArg[func](...Array.from(argsArray))
  } else if(argsArray && undefined || argsArray === null){
    result = thisArg[func]()
  } else {
    throw new TypeError('argsArray must be an array-like object')
  }

  delete thisArg(func)

  return result;
}


```

### call

```js
Function.prototype.call = function(thisArg, ...argsArray){
  if(typeof this !== 'function'){
    throw new TypeError('function.prototype.call called on non-function')
  }

  if(thisArg === undefined || thisArg === null){
    thisArg = window;
  } else {
    thisArg = Object(thisArg)
  }

  const func = Symbol('func');

  thisArg[func] = this;

  let result;
  if(argsArray.length){
    result = thisArg[func](...argsArray)
  }else{
    result = thisArg[func]()
  }

  delete thisArg[func];

  return result;
}

```

### bind

```js
Function.prototype.bind = function(thisArg, ...argsArray){
  if(typeof this !== 'function'){
    throw new TypeError('function.prototype.bind called on non-function')
  };

  if(thisArg === undefined || thisArg === null){
    thisArg = window;
  }else{
    thisArg = Object(thisArg)
  }

  const func = this;

  const bound = function(...boundArgsArray){
    let isNew = false;

    try{
      isNew = this instanceof func;
    }catch(e){

    }

    return func.apply(isNew ? this: thisArg, argsArray.concat(boundArgsArray))
  }

  const Empty = function(){}
  Empty.prototype = this.prototype;
  bound.prototype = new Empty();

  return bound;
}

```

## 找的数组中重复的数字
### 哈希表

```js
const findRepeatNumber = function(nums){
  let map = new Map();
  let i =0;
  while(i<nums.length){
    if(map.has(nums[i])){
      return map.get(nums[i]);
    }

    map.set(nums[i], nums[i]);
    i++;
  }
}

```

### 交换

```js

const findRepeatNumber = function(nums) {
  let i = 0;
  while(i<nums.length){
    if(nums[i] === i){
      i++;
      continue;
    }

    if(nums[nums[i]] === nums[i]){
      return nums[i]
    }

    [nums[nums[i]], nums[i]] = [nums[i], nums[nnums[i]]]
  }

  return -1;
}

```

[面试题来源](https://febook.hzfe.org/awesome-interview/)