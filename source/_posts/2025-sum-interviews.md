---
title: 2025年｜最近找工作在复习一些什么？
date: 2025-10-31 17:17:59
tags:
  - 2025
  - front-end-interview
  - 面试总结
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

#### vite和webpack
Vite 采用 ES modules 原生支持，在开发环境下无需打包，直接在浏览器中加载模块，所以启动速度快。Webpack 需要打包所有代码后才能在开发服务器运行，虽然有优化但启动较慢。
在热更新方面，Vite 只需要重新编译改动的模块，速度很快。Webpack 的热更新虽然也很成熟，但涉及整个模块系统的处理。
生产环境下，两者都进行完整的打包和优化，性能差异不大。但 Vite 的配置相对简洁，Webpack 配置更复杂但灵活性更强。
#### content-type
这个通常出现在网络请求相关的题目中。Content-Type是HTTP 头，用来告诉服务器或浏览器发送的数据格式。常见的包括：
application/json 用于 JSON 数据
application/x-www-form-urlencoded 用于表单数据
multipart/form-data 用于文件上传
text/html 用于 HTML 文档
text/plain 用于纯文本

#### 数组扁平化
```js
function flattern(arr, depth = 3){
  if(depth > 0){
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
  if (Number.isNaN(a) && Number.isNaN(b)) return false;

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
npm包按需加载依赖tree-shaking和代码分割。
只要npm包支持独立模块文件（如 lodash/debounce）或ESM格式（如 lodash-es），打包器就能自动删除未使用的代码。
也可以通过动态import实现运行时按需加载，而UI库通常通过 babel-plugin-import或自动按需工具实现组件级别加载。
本质是减少bundle体积和提升性能

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
    return () => { clearInterval(timer) } }, []) 
const handleClick = () => { setCount(count + 1) }

// 创建定时器，但无法访问最新的 count
const countRef = useRef(count)

useEffect(() => {
    countRef.current = count
}, [count])

useEffect(() => { 
    const timer = setInterval(() => { 
        console.log("count", countRef.current) 
    }, 1000); 
    return () => { clearInterval(timer) } //当组件从 DOM 中移除时，清理函数会执行，清除定时器。
}, [])  // 定时器只创建一次，但能访问最新的 count

//变种题型1
const [count, setCount] = useState(0)
useEffect(() => { //只在第一次render执行。永远打印0
  const timer = setInterval(() => {
	console.log("count", count);
  }, 1000);
  return () => {
	clearInterval(timer);
  };
}, []);

const handleClick = () => {
  setCount(count + 1);
};
//变种题型1 -> 优化
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
}, [count]);

useEffect(() => {
  const timer = setInterval(() => {
	console.log("count", countRef.current);
  }, 1000);
  return () => {
	clearInterval(timer);
  };
}, []);

const handleClick = () => {
  setCount(count + 1);
};
```

之前没好好做面试总结，接下来要好好做面试总结。

### apple一面

1. 三数之和，没写出来，忘记了。一段时间不写，连两数之和都会忘记，哎。
2. 自由职业者期间的项目日活。

```js
function threeSum(nums){
  const res = []
  nums.sort((a, b) => a - b);

  for(let i=0; i<nums.length-2; i++){
    if(i>0 && nums[i] === nums[i-1]) continue;

    let left = i+1;
    let right = nums.length -1;

    while(left<right){
      const sum=nums[i]+nums[left]+nums[right];

      if(sum === 0){
        res.push([nums[i], nums[left], nums[right]])

        while(left < right && nums[left] === nums[left+1]) left++
        while(left < right && nums[right] === nums[right-1]) right--

        left++
        right--
      } else if(sum<0){
        left++
      } else {
        right--
      }
    }
  }

  return res;
}

//暴力解法
function threeSum(nums){
  const res = [];
  const set = new Set();

  for(let i=0; i<nums.length-2; i++){
    for(let j=i+1; j<nums.length-1; j++){
      for(let k=j+1; k<nums.length; k++){
        if(nums[i] + nums[j] + nums[k] === 0){
          const arr = [nums[i], nums[j], nums[k]].sort((a,b) => a-b);
          const key = arr.join(',')

          if(!set.has(key)){
            set.add(key);
            res.push(arr)
          }
        }
      }
    }
  }

  return res;
}

```

### hireEZ二面
// Given a set of non-overlapping work experiences, insert a work experience into the work experiences (merge if necessary).

// You may assume that the work experiences were initially sorted according to their start times.

// Example 1:
// Input:

// Experiences:
// 2015-01-01 ~ 2016-01-01
// 2017-01-01 ~ 2018-01-01

// newExperience:
// 2015-12-01 ~ 2016-02-01

// Output:
// 2015-01-01 ~ 2016-02-01
// 2017-01-01 ~ 2018-01-01


// Example 2:
// Input:

// Experiences:
// 2010-01-01 ~ 2012-01-01
// 2013-01-01 ~ 2015-01-01
// 2016-01-01 ~ 2017-01-01
// 2019-01-01 ~ 2020-10-01

// newExperience:
// 2014-01-01 ~ 2018-01-01

// Output:
// 2010-01-01 ~ 2012-01-01
// 2013-01-01 ~ 2018-01-01
// 2019-01-01 ~ 2020-10-01 
```js
function mergeDateRange(originalArrs, insertArr) {
  const result = [];
  let [newStart, newEnd] = insertArr.map(date => new Date(date).getTime());
  let inserted = false;

  for (const [startDate, endDate] of originalArrs) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // 当前区间完全在新区间左边
    if (end < newStart) {
      result.push([startDate, endDate]);
    }

    // 当前区间完全在新区间右边
    else if (start > newEnd) {
      if (!inserted) {
        result.push([
          new Date(newStart).toISOString().slice(0, 10),
          new Date(newEnd).toISOString().slice(0, 10)
        ]);
        inserted = true;
      }

      result.push([startDate, endDate]);
    }

    // 有重叠，合并
    else {
      newStart = Math.min(newStart, start);
      newEnd = Math.max(newEnd, end);
    }
  }

  if (!inserted) {
    result.push([
      new Date(newStart).toISOString().slice(0, 10),
      new Date(newEnd).toISOString().slice(0, 10)
    ]);
  }

  return result;
}

// end < newStart      // 在左边，无重叠
// start > newEnd      // 在右边，无重叠
// 否则就是有重叠
```

怎么给agent做性能分析呢？从几个方面来谈。日志、token、性能、代码质量

1. 日志分析
日志是最基础的观测入口，重点不是只存 prompt 和 response，而是记录一次 agent 执行链路。
可以看：
用户输入是什么
agent 做了哪些 planning
调用了哪些 tool
每个 tool 的入参、出参、耗时、失败原因
中间状态有没有被覆盖或丢失
最终回答是否引用了正确上下文
是否发生重试、循环、超时、异常 fallback
比较理想的日志结构是 trace 形式：
{
  traceId: 'xxx',
  userInput: '帮我分析代码性能',
  steps: [
    {
      type: 'plan',
      content: '先读取文件，再定位热点函数'
    },
    {
      type: 'tool_call',
      tool: 'read_file',
      durationMs: 120,
      success: true
    },
    {
      type: 'tool_call',
      tool: 'run_tests',
      durationMs: 3400,
      success: false,
      error: 'timeout'
    }
  ],
  finalAnswer: '...'
}
日志主要回答一个问题：
agent 到底是怎么走到这个结果的？

如果结果不好，日志能帮你判断是模型理解错了、上下文缺失、工具失败、还是执行路径太绕。
2. Token 分析
token 是 agent 系统的核心成本之一，也会直接影响速度和稳定性。
重点看：
单次请求 input token / output token
上下文里有多少是有效信息
有多少重复历史、无关文件、冗余日志
tool result 是否太长
是否频繁把完整文件、完整错误堆栈塞回模型
多轮任务里 token 是否线性膨胀
是否触发 context truncation，导致前文丢失
常见指标：
input_tokens
output_tokens
total_tokens
tokens_per_step
tokens_per_tool_result
cost_per_task
context_utilization
优化方向：
对长文件做摘要，而不是全量塞入
tool 输出做截断和结构化
历史消息做压缩
只保留和当前任务相关的上下文
对重复任务缓存中间结果
一句话：token 分析不是单纯为了省钱，而是为了让 agent 的“注意力”更干净。
3. 性能分析
性能可以分成延迟、吞吐和成功率。
关键指标：
首 token 延迟：用户多久看到回应
总耗时：一次任务完整完成要多久
tool 调用耗时：瓶颈是不是外部工具
模型调用次数：是不是拆得太碎
重试次数：是不是经常失败后重跑
并发能力：多个 agent / 多个用户同时跑是否稳定
超时率：任务是否容易卡死
成功率：最终是否真的完成用户目标
可以拆成链路：
用户输入
  -> prompt 构造耗时
  -> 模型推理耗时
  -> tool 调用耗时
  -> 结果解析耗时
  -> 下一轮模型推理
  -> 最终输出
很多 agent 慢，不是模型慢，而是：
工具串行调用太多
每次都重新读全量上下文
失败后无脑重试
planning 太碎
没有缓存
没有并行化独立任务
所以性能优化可以从这些地方入手：
并行执行互不依赖的 tool call
缓存文件索引、embedding、检索结果
减少无意义模型轮次
设置最大步数和超时
对失败路径做明确 fallback
让 agent 先判断“是否真的需要调用工具”
4. 代码质量分析
如果 agent 会写代码，就要评估它产出的代码质量，而不只是“能跑”。
可以看：
是否满足需求
是否破坏已有逻辑
是否符合项目风格
是否有重复代码
是否引入过度抽象
是否有边界条件处理
是否有测试
是否有类型错误、lint 错误
是否有安全问题
是否改了不该改的文件
指标可以分两类。
自动化指标：
test pass rate
lint pass rate
typecheck pass rate
build success rate
coverage diff
bug regression count
changed files count
diff size
人工/LLM review 指标：
需求符合度
可读性
可维护性
复杂度
异常处理
边界条件
架构一致性
一个比较实用的做法是：让 agent 每次提交前跑一套质量门禁：
1. npm test
2. npm run lint
3. npm run typecheck
4. npm run build
5. review diff
然后记录结果，长期统计 agent 的代码质量趋势。
可以总结成一张表
维度	关注问题	常用指标
日志	agent 为什么这么做	trace、tool call、错误、重试
token	成本和上下文效率	input/output token、上下文利用率
性能	完成任务快不快、稳不稳	延迟、耗时、成功率、超时率
代码质量	产物是否可靠	test/lint/typecheck、diff、review

面试里可以这样说：
我会从可观测性、成本、执行效率和产出质量四个方面分析 agent。日志负责还原执行链路，token 负责衡量上下文效率和成本，性能关注延迟、工具调用和成功率，代码质量则通过测试、lint、typecheck、review 和回归指标来评估。这样能判断 agent 是“想错了”“慢了”“贵了”，还是“产物质量不稳定”。