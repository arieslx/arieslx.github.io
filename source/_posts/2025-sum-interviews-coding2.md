---
title: 2025年｜还是一些来自前端内参的编码题目
date: 2025-11-12 17:17:59
tags:
  - 2025
  - front-end-interview
---

## call，apply，bind函数

### 常见面试题
```js
for(var i=0;i<=5;i++){
  setTimeout(function(i){
    console.log(i)
  }.bind(null, i), i*1000)
}

```

### javascript手写call，apply，bind函数，尤其是bind函数

```js

Function.prototype.myCall = function(thisArg, ...arr){
  if(thisArg === null || thisArg === undefined){
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  const specialMethod = Symbol('anything');
  thisArg[specialMethod] = this;
  let result = thisArg[specialMethod](...arr);

  delete thisArg[specialMethod];
  return result;
};

let obj = {
  name: "coffe1891"
};

function func(){
  console.log(this.name)
}

func.myCall(obj)

Function.prototype.myApply = function(thisArg){
  if(thisArg === null || thisArg === undefined){
    thisArg = window;
  } else {
    thisArg = Object(thisArg)
  }

  function isArrayLike(obj){
    if(o && typeof o === "object" && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296)
    return true;
  else return false
  }

  const specialMethod = Symbol("anything")
  thisArg[specialMethod] = this;

  let args = arguments[1]
  let result;

  if(args){
    if(!Array.isArray(args) && !isArrayLike(args)){
      throw new TypeError("args must be an array-like object")
    } else{
      args = Array.from(args);
      result = thisArg[specialMethod](...args);
  } else {
    result = thisArg[speacialMethod]
  }
  delete thisArg[specialMethod]
  return result;
}

Function.prototype.myBind = function(objThis, ...params){
  const thisFn = this;
  let funcForBind = function(...secondParams){
    const isNew = this instanceof funcForBind;
    const thisArg = isNew ? this : objThis;
    return thisFn.call(thisArg, ...params, ...secondParams)
  };

  funcForBind.prototype = Object.create(thisFn.prototype)
  return funcForBind;
}

let func = function(p,secondParams){//其实测试用的func其参数可以是任意多个
    console.log(p.name);
    console.log(this.name);
    console.log(secondParams);
}
let obj={
    name:"1891"
}
func.myBind(obj,{name:"coffe"})("二次传参");
//>> coffe
//>> 1891
//>> 二次传参

```

## 循环

### for，forEach，map
如果使用箭头函数表达式来传入thisArg 参数会被忽略，因为箭头函数在词法上绑定了`this`值。
for循环满足特定条件时跳出循环体，或者跳出本次循环直接进入下一次循环。

### reduce
`initialValue`可选作为第一次调用`callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素（也即针对数组的arr循环计算少一次，千万要注意这点）。 在没有初始值的空数组上调用`reduce`将报错。

数组—->对象

```js

const arr  = [
    {
        username:    'makai',
        displayname: '馆长',
        email:       'guanzhang@coffe1891.com'
    },
    {
        username:    'xiaoer',
        displayname: '小二',
        email:       'xiaoer@coffe1891.com'
    },
    {
        username:    'zhanggui',
        displayname: '掌柜',
        email:       null
    },
];

function cb1(acc, person){
  return {...acc, [person.username]: person}
}
const obj = arr.reduce(cb1, {})

```

## 深拷贝

缺点：
- 会忽略`undefined`；
- 会忽略`symbol`；
- 如果对象的属性为`Function`，因为JSON格式字符串不支持`Function`，在序列化的时候会自动删除；
- 诸如 `Map`, `Set`, `RegExp`, `Date`, `ArrayBuffer`和其他内置类型在进行序列化时会丢失；
- 不支持循环引用对象的拷贝。
```js
let a = {x: 2}
let b = JSON.sringiy(a)
```

缺点：
对象嵌套层次超过2层，就会出现浅拷贝的状况；
非可枚举的属性无法被拷贝。
```js
let a = {x:3}
let b = Object.assign({}, a)

```

缺点：
这个方法是异步的；
拷贝有函数的对象时，还是会报错。

```js

// 有undefined + 循环引用
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  f: undefined
}

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

function deepClone(obj){
  return new Promise((resolve) => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  })
}


deepClone(obj).then((copy) => {
  let copyObj = copy;
  console.log(copyObj, obj)
  console.log(copyObj == obj)
})
```

```js

function deepClone(obj, parent = null){
  let result = {};
  let keys = Object.keys(obj),
      key = null,
      temp = null,
      _parent = parent;
  while(_parent){
    if(_parent.originalParent === obj){
      return _parent.currentParent
    }
    _parent = _parent.parent
  }

  for(let i=0; i<keys.length; i++){
    key = keys[i];
    temp = obj[key]
    if(temp && typeof temp === 'object'){
      result[key] = deepClone(temp, {
        originalParent: obj,
        currentParent: result,
        parent: parent
      });
    }else{
      result[key] = temp
    }
  }
  return result;
}

```

```js

function deepClone(obj){
  let map = new WeakMap();
  function dp(obj){
    let result = null;
    let keys = null,
    key = null,
    temp = null,
    existsObj = null;

    existObj = map.get(obj)
    if(existObj){
      reurn existObj
    }
    keys = Object.keys(obj);
    result = {};
    map.set(obj, result);
    for(let i=0; i<keys.length; i++){
      key = keys[i];
      temp = obj[key];
      if(temp && typeof temp === 'object'){
        result[key] = dp(temp)
      }else{
        result[key] = temp;
      }
    }
    return result;

return dp(obj)
  }
}


```


终极方案是lodash的cloneDeep。
```js

_cloneDeep({xx:11})


```

## 柯里化

bind的柯里化
```js 
Function.prototype.bind = function(context){
  let _this = this;
  let args = Array.prototype.slice.call(arguments, 1)
  return function(){
    return _this.apply(context, args)
  }
}
```
给定一个函数fn，设计一个通用封装（currying函数）作用于这个fn，让这个fn可以支持柯里化，该怎么实现呢？思路：

要让fn(a,b)等价于fn(a)(b)，那么fn(a)要返回一个函数，这个函数接受参数b，并返回与fn(a,b)相同的结果。

设计一个currying函数，它接受第一个参数是要被柯里化的函数fn，第2~N个参数是原本要传递给fn的参数（这个可用rest操作符实现）。

柯里化主要围绕“处理参数”思考，不管怎么变化传参形式，柯里化之后的函数要把之前函数的参数都统统处理完毕才算合格。

```js

let promaryCurrying = function(fn, length){

  length = length || fn.length;

  return function(...args2){

    if(args2.length < length){
      var combinedArgs = [fn].concat(args2)

      return curry(primaryCurrying.apply(this, coombinedArgs), length - args2.length);
    }

    else {
      return fn.apply(this, args2)
    }
    
  };
}


```

// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;

```js

function add(){
  var _args = Array.prototype.slice.call(arguments);
  var _addr = function(){
    _args.push(...arguments)
    return _addr;
  }

  _adder.toString = function(){
    return _args.reduce(function (acc, cur){
      return acc + cur;
    }, 0)
  }
  return _adder;
}


```

## reflect和proxy
### 数据绑定和响应式
```js

function createReactive(obj){
  return new Proxy(obj, {
    get(target, prop){
      console.log('reading'+ prop)
      return target[prop]
    },
    set(target, prop, value){
      console.log('setting', value)
      target[prop] = value;
      return true;
    }
  });
}

const data = createReactive({ count: 0 });
data.count;
data.count = 1


```

### 日志记录
```js
function createLoggingProxy(obj){
  return new Proxy(obj, {
    get(target, prop){
      console.log('get', [prop])
      return target[prop]
    }
    set(target, prop, value){
      console.log(`setting ${prop} = ${value}`)
      return Reflect.set(target, prop, value)
    }
  });
}

```

### 权限控制
```js
function createSecureProxy(obj, allowedProps){
  return new Proxy(obj, {
    get(target, prop) {
      if(allowedProps.includes(prop)){
        return target[prop]
      }
      throw new Error(`Not allowed to access ${prop}`)
    }
  })
}

```


