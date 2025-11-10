---
title: 2025年｜手写promise
date: 2025-10-31 17:17:59
tags:
  - 2025
---

### 基础架子

```js

function Promise(executor){
  this.state = "pending";
  this.onFulfilledCB = [];
  this.onRejectedCB = [];

  const self = this;

  function resolve(value){
    setTimeout(function(){
      if(self.state === "pending") {
        self.state = "fulfilled";
        self.data = value;
        for(let i=0; i<self.onFulfilledCB.length;i++){
          self.onFulfilledCB[i](value)
        }
      }
    });
  }

  function reject(reason){
    setTimeout(function(){
      if(self.state === "pending"){
        self.state = "rejected";
        self.data = reason;
        for(let i=0; i<self.onRejectedCB.length;i++){
          self.onRejectedCB[i](reason);
        }
      }
    });
  }

  try{
    executor(resolve, reject)
  }catch(reason){
    reject(reason)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected){
  const self = this;
  let promise2;
  return promise2 = new Promise(function(resolve, reject){
    if(self.state === "fulfilled"){
      setTimeout(function(){
        if(typeof onFulfilled === "function"){
          try{
            const x = onFulfilled(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject);
          }catch(e){
            reject(e);
          }
        } else {
        resolve(promise1Value)
         }
      });
    } 
     else if(self.state === "rejected") {
      setTimeout(function(){
        if(typeof onRejected === "function"){
          try{
            const x = onRejected(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch(e){
            reject(e)
          }
        } else {
          reject(self.data)
          }
      })
     } else if(self.state === "pending"){
      self.onFulfilledCB.push(function(promise1Value){
        if(typeof onFulfilled === "function"){
          try{
            const x = onFulfilled(self.data)
            promiseResolutionProcedure(promise2, x, resolve, reject);
          }catch(e){
            reject(e)
          }
        } else {
          resolve(promise1Value)
        }
      });
      self.onRejectedCB.push(function(promise1Reason){
        if(typeof onRejected === "function"){
          try{
            const x = onRejected(self.data)
            promiseResolutionProcedure(promise2, x, resolve, reject)
          }catch(e){
            reject(e)
          }
        }
        else {
          reject(promise1Reason)
        }
      })
     }
  });
}

function promiseResolutionProcedure(promise2, x, resolve, reject){
  if(promise2 === x){
    return reject(new TypeError("chaining cycle detected for promise"))
  }

  if(x instanceof Promise){
    if(x.state === "pending"){
      x.then(function(value){
        promiseResolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    }
    else if(x.state === "fulfilled"){
      resolve(x.data);
    }
    else if(x.state === "rejected"){
      reject(x.data)
    }
    return
  }
  if(x && (typeof x === "object" || typeof x === "function")){
    let isCalled = false;
    try{
      let then = x.then;
      if(typeof then === "function"){
        then.call(
          x, 
          function resolvePromise(y){
            if(isCalled) return;
            isCalled = true;
            return promiseResolutionProcedure(promise2, y, resolve, reject)
          },
          function rejectPromise(r){
            if(isCalled) return;
            isCalled = true;
            return reject(r)
          }
        );
      }
      else{
        resolve(x);
      }
    }catch(e){
      if(isCalled) return;
      isCalled = true;
      reject(e)
    }
  }
  else {
    resolve(x)
  }
}

module.exports = Promise;
```

### test.js
```js
const Promise = require('./promise.js')
Promise.deferred = function(){
  const obj = {};
  obj.promise = new Promise(function(resolve, reject){
    obj.resolve = resolve;
    obj.reject = reject;
  })
  return obj;

}

module.exports = Promise;
```
### terminal
``` terminal
$ npx promises-aplus-tests test.js
```