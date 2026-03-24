---
title: 算法题大混合
date: 2026-3-23 23:40:59
tags:
  - 2025
  - front-end-interview
  - 2026
  - algorithm
  - TODO
---

### [两数之和](https://leetcode.cn/problems/two-sum/description/)
`跟着瓶子刷算法`
`Leetcode-hot100-ts`
```js
function twoSum(nums: number[], target: number): number[] {
    let helperMap = new Map();
    let resArr = [];
    let resIndex = undefined;
    for(let i = 0; i< nums.length; i++){
        if(helperMap.has(target - nums[i])){
            resIndex = helperMap.get(target - nums[i])
            if(resIndex !== undefined){
                resArr = [resIndex, i]
                break;
            }
        } 
        helpMap.set(nums[i], i)

    }
    return resArr;
}

```

### [js两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/description/)
`跟着瓶子刷算法`
```js

function intersection(num1: number[], num2: number[]): number[] {
    return [...new Set(num1.filter(item => num2.includes(item)))]
}
```

### [三数之和](https://github.com/sisterAn/JavaScript-Algorithms/issues/31)

```js
function threeSum(nums: number[]): number[][] {
    const len = nums.length;
    const res = [];
    if(len < 3) {
        return res
    }

    nums.sort((a, b) => a - b) 

    for(let i = 0; i < len -2; i++){
        if(nums[i] > 0){
            break;
        }

        if(i && nums[i] === nums[i-1]){
            continue;
        }

        let left = i + 1;
        let right = len -1

        while(left < right){
            const sum = nums[i] + nums[left] + nums[right]
            if(sum === 0){
                res.push([nums[i], nums[left], nums[right]])

                while(left < right && nums[left] === nums[left + 1]){
                    left++
                }
                while(left < right && nums[right] === nums[right -1]){
                    right--
                }
                left++
                right--
            } else if(sum > 0){
                right --
            } else {
                left++
            }
        }
    }

    return res
}
```

### [49. Group Anagrams](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)

```ts

function groupAnagrams(strs: string[]): string[][] {
    let map: Map<string, Array<string>> = new Map();
    for(let i=0; i<strs.length; i++){
        let key = strs[i].split("").sort().join("")
        if(!map.has(key)){
            map.set(key, [])
        }
        map.get(key)!.push(strs[i])
    }
    return [...map.values()]
}

```

### [128. Longest Consecutive Sequence](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)

```js
function longestConsecutive(nums: number[]): number {
    const numSet: Set<number> = new Set<number>(nums);
    let longestSequence: number = 0;
    for(const currentNum of numSet){
        const isStartOfSequence: boolean = !numSet.has(currentNum - 1)
        if(isStartOfSequence){
            let sequenceLength: number = 1;
            let nextNum: number = currentNum + 1;
            while(numSet.has(nextNum)){
                sequenceLength++;
                nextNum++
            }

            longestSequence = Math.max(longestSequence, sequenceLength);
        }
    }

    return longestSequence;
}
```

### [283. Move Zeroes](https://leetcode.cn/problems/move-zeroes/?envType=study-plan-v2&envId=top-100-liked)

```js

function moveZeroes(nums: number[]): void {
    let left = 0;
    for(let right=0; right<nums.length; right++){
        if(nums[right]!==0){
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++
        }
    }
}

```

### [11. Container With Most Water](https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked)

```js

function maxArea(height: number[]): number{
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0
    while(left<right){
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const area = width * currentHeight;

        maxArea = Math.max(maxArea, area);
        if(height[left]<height[right]){
            left++
        } else {
            right--
        }
    }

    return maxArea;
}

```

### [15. 3Sum](https://leetcode.cn/problems/3sum/?envType=study-plan-v2&envId=top-100-liked)

```js

function threeSum(nums: number[]): number[][]{
    const result: number[][] = [];
    nums.sort((a, b) => a - b)
    for(let i=0; i<nums.length-2;i++){
        if(i>0 && nums[i]===nums[i-1]) continue;
        let left=i+1;
        let right=nums.length-1;
        while(left<right){
            const sum=nums[i]+nums[left]+nums[right];
            if(sum===0){
                result.push([nums[i],nums[left],nums[right]])
                while(left<right && nums[left]===nums[left+1]) left++;
                while(left<right && nums[right] === nums[right-1]) right--;
                left++;
                right--
            } else if(sum<0){
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}


```

### [42. Trapping Rain Water](https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked)

```js

function trap(height: number[]): number{
    let left=0;
    let right=height.length-1;
    let leftMax=0;
    let rightMax=0;
    let result=0;

    while(left<right){
        if(height[left]<height[right]){
            if(height[left]>=leftMax){
                leftMax=height[left];
            }else{
                result+=leftMax-height[left]
            }
            left++
        } else {
            if(height[right] >= rightMax){
                rightMax=height[right]
            }else{
                result+=rightMax-height[right]
            }
            right--
        }
    }
    return result;
}

```

## 链表
```
理解改指针。插入X，A → B
X.next = A.next
A.next = X
A → X → B
head 是 入口，丢了 head，整个链表就找不到了
```
### [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
`跟着瓶子刷算法`
`Leetcode-hot100-ts`
```js
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if(list1 === null){
        return list2
    }

    if(list2 === null){
        return list1
    }

    if(list1.val <= list2.val){
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoLists(list2.next, list1)
        return list2
    }
};
/**
1️⃣ 有空的，直接接
2️⃣ 比头结点，谁小选谁
3️⃣ 选中的 next = 递归剩下的
4️⃣ return 选中的
**/
```

### 从尾到头打印链表
`牛客网剑指offer`
```js
function printListFromTailToHead(head){
    let arr = [];
    while(head){
        arr.push(head.val)
        head = head.next
    }
    return arr.reverse()
}

//递归 head->1,2,3,null,先递归完成，再一个一个push3,2,1
function printListFromTailToHead1(head){
    if(!head) return []
    let result = printListFromTailToHead(head.next)
    result.push(head.val)
    return result
}
```

### [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
`牛客网剑指offer`
`Leetcode-hot100-ts`
```js
function reverseList(head){
    if(!head){
        return null;
    }
    let prev = null, cur = head, next
    while(cur){
        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev
}

```

### [两个链表的第一个公共结点](https://leetcode.cn/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)
`牛客网剑指offer`
```js
function FindFirstCommonNode(pHead1, pHead2){
    let p1 = pHead1, p2 = pHead2;
    while(p1 !== p2){
        p1 = p1 ? p1.next : pHead2;
        p2 = p2 ? p2.next : pHead1;
        // p1 = (p1 == null) ? pHead2 : p1.next;
        // p2 = (p2 == null) ? pHead1 : p2.next;
    }
    return p1
}
```

[LCR 022. 环形链表 II,链表中环的入口结点](https://leetcode.cn/problems/c32eOV/description/)
`牛客网剑指offer`
```js
function entryNodeOfLoop(pHead){
    let arr = [];
    while(pHead){
        if(arr.indexOf(pHead) !== -1){
            return pHead;
        } else {
            arr.push(pHead)
            pHead = pHead.next
        }
    }
    return null;
}
```
## [LRU缓存机制](https://leetcode.cn/problems/lru-cache/)

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
## 树
### [二叉搜索树的第k大节点|LCR 174. 寻找二叉搜索树中的目标节点](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)
`TODO`
```js
const kthLargest = function(root, k){
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

### [二叉树的深度｜104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree)
```js
function TreeDepth(pRoot){
    if(!pRoot) {
        return 0;
    } else {
        return Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1;
    }
}
```

## 十大排序算法
我记不住怎么办，每次从冒泡开始，就像是学习英语，每次只背了个abandon。
```
排序算法
├─ O(n²) 简单排序
│   ├─ 冒泡 Bubble
│   ├─ 选择 Selection
│   └─ 插入 Insertion
│
├─ O(n log n) 高级排序（基于分治）
│   ├─ 归并 Merge   —— 非原地 + 稳定
│   └─ 快排 Quick   —— 原地 + 不稳定
│
├─ O(n log n) 不基于分治
│   └─ 堆排序 Heap — 原地 + 不稳定
│
└─ O(n) 非比较排序（限定数据范围）
    ├─ 计数排序 Counting
    ├─ 桶排序 Bucket
    └─ 基数排序 Radix
```

### 冒泡排序
两两比较，大的往后沉，双重循环，交换！
```js
function bubbleSort(arr){
  for(let i = 0; i<  arr.length; i++){
    for(let j = 0; j< arr.length - i - 1; j++){
      if(arr[j] > arr[j+1]){
        const temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}

// 优化的话，加个flag判断有没有做交换，没有就break跳出循环。
function bubbleSort1(arr){
  for(let i = 0; i<  arr.length; i++){
    for(let j = 0; j< arr.length - i - 1; j++){
      let flag = false
      if(arr[j] > arr[j+1]){
        const temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
        flag = true
      }
      if(!flag) break
    }
  }
  return arr
}
```
### 选择排序
每次选最小，放到前面，固定位置，找最小index
```js

function selectionSort(arr) {
  let length = arr.length;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      let temp = arr[i];
      arr[i] = arr[indexMin];
      arr[indexMin] = temp;
    }
  }
  return arr;
}

```
### 插入排序
前面是有序区，把当前数插进去，适合几乎有序数组
```js

((arr) => {
  for(let i=1; i<arr.length; i++){
    let current = arr[i];
    let = j = i-1;
    while(j>=0 && arr[j] > current){
      arr[j+1] = arr[j]
      j--
    }
    arr[j+1] = current
  }
  return arr
})([1,5,4,2,9,7,8])

```
### *** 快速排序（Top1 高频）
快速排序其实是分治法，将待排序数组里的项和基准数对比，比基准数大的放在一边，小的放另一边，然后再对左右两边的子数组重复使用这个思路，直到整个数组排序完毕。
选基准，比它小的放左边，比它大的放右边。里面比较的是合法下标哦，是合法下标的区间哦！
```js
function quickSort(arr, left, right) {
  if (left >= right) return;

  let i = left;
  let j = right;
  let pivot = arr[left]; // 基准值

  while (i < j) {

    // 从右边找比 pivot 小的
    while (arr[j] >= pivot && i < j) j--;

    // 从左边找比 pivot 大的
    while (arr[i] <= pivot && i < j) i++;

    // 交换
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 此时 i===j，把 pivot 放回中间
  arr[left] = arr[i];
  arr[i] = pivot;

  // 递归左右两边
  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, right);

  return arr;
}

console.log(quickSort([1,5,4,2,9,7,8], 0, 6));

```
### *** 堆排序（面试经常问“Top K”）
建立大顶堆，堆顶最大，不断弹出再重建。
React Fiber = 一棵被不断“重新排序”的最小堆结构 → 面试官特别爱问堆。
React Fiber 的本体结构是一串 单向链表 + 树：
React Fiber 的调度器（Scheduler）用的是“最小堆（min-heap）”结构；
React Fiber 的任务执行顺序（Fiber 树构建 / Reconciliation）本身是用“可中断的链表（队列）结构”。
所以：
Fiber = 链表结构（队列式遍历）
Scheduler = 用最小堆来决定“下一件事做谁”
这两者完全不冲突，只是层级不一样。

React Fiber 本身不是堆，它是一套链表结构的 Fiber 树，用来支持可中断更新。
但 React 的调度器 Scheduler 为了按优先级选择下一个任务，使用了“最小堆”作为优先级队列。
所以：Fiber = 链表；调度 = 堆。

堆的特性：
必须是完全二叉树；
任一结点的值是其子树所有结点的最大值或最小值。 最大值时，称为"最大堆"，也称大顶堆； 最小值时，称为"最小堆"，也称小顶堆。
堆排序主要用到最大堆/最小堆的删除操作，也即根节点已经是最大/小的值，排序的话，只需要把根结点拿（删）掉，放入有序的新数组里，然后用下沉算法处理剩余的结点以便组成新的最大堆/最小堆……如此循环。
所谓下沉算法，拿最小堆来举例说（最大堆同理），就是把完全二叉树根结点R和该树第二层左右子结点的值比较，如果大，结点就互换位置（"下沉"），以此逐层递归，直到处理完整棵树，此时，根节点值最小。

堆的本质是完全二叉树，而完全二叉树最典型的表示方式就是“连续数组”。
只要数组里没有空洞（每个 index 都能访问到），它天然可以作为堆结构。
只要保证数组连续，堆排序一定能用。
```js
function isContinuousArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) return false; // 有洞
  }
  return true;
}
```

```js

((arr) => {
  let result = []
  buildMinHeap(arr)
  for(let i = 0, length = arr.length; i< length; i++){
    // 将堆（完全二叉树）的根结点拿走，放入result数组，此时result是已排序好的。
    result.push(arr[0])
    // 将堆（完全二叉树）的根结点和最末尾的结点交换
    swap(0, length-result.length)
    // 然后下沉，重排树，让根节点是最小的。注意数组范围是length-result.length
    sink(arr, 0 , length-result.length)
  }

    // 根据给定的数组建一个最小堆
  function buildMinHeap(arr){
    let length = arr.length;
    let currentIndex; //当前要处理的下沉结点对应的数组索引
    // 请注意，currentIndex为什么是从 Math.floor((length - 2) / 2) 开始？
    // 读者可以画个草稿图归纳一下。
    // 这会让算法的循环次数由N次变为logN，这正是堆排序更高效的关键所在。
    for(currentIndex = Math.floor((length - 2) / 2); currentIndex >= 0; currentIndex--){
      console.log('正在处理的下沉结点索引' + currentIndex)
      sink(arr, currentIndex, length)
    }

  }

  function sink(arr, currentIndex, length){ 
    let minIndex = currentIndex
    let leftChildIndex = 2*currentIndex + 1 // 完全二叉树 左子结点索引
    let rightChildIndex = 2*currentIndex + 2 // 完全二叉树 右子结点索引
    // 左侧下沉
    if(leftChildIndex < length && arr[leftChildIndex] < arr[minIndex]){
      minIndex = leftChildIndex
    }

    // 右侧下沉
    if(rightChildIndex < length && arr[rightChildIndex] < arr[minIndex]){
      minIndex = rightChildIndex
    }

    if(minIndex !== currentIndex){
      swap(minIndex, currentIndex)
      sink(arr, minIndex, length)
    }
  }

  function swap(x, y){
    let temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
  }

  return result
})([1,5,4,2,9,7,8])

```
### 计数排序(不太会)
统计次数，再按次数依次输出,只适合整数小范围。
```js
((arr) => {
    function countingSort(arr) {
        const n = arr.length;
        
        // 找到数组中的最大值和最小值
        let max = arr[0];
        let min = arr[0];
        for (let i = 1; i < n; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        
        const range = max - min + 1;
        const count = new Array(range).fill(0);
        const output = new Array(n);
        
        // 统计每个元素出现的次数
        for (let i = 0; i < n; i++) {
            count[arr[i] - min]++;
        }
        
        // 计算每个元素应该放置的位置
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        // 从后往前遍历，保证稳定性
        for (let i = n - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }
        
        // 将结果复制回原数组
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
        
        return arr;
    }
    
    const sortedArr = countingSort(arr);
    console.log(sortedArr);
})([1, 5, 4, 2, 9, 7, 8]);//>> [1, 2, 4, 5, 7, 8, 9]
```
### 桶排序
分桶 → 各桶排序 → 合并
适合均匀分布的数据。
```js
((arr) => {
    function bucketSort(arr, bucketSize = 5) {
        if (arr.length === 0) return arr;
        
        // 找到数组中的最大值和最小值
        let min = arr[0];
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            if (arr[i] > max) max = arr[i];
        }
        
        // 创建桶
        const bucketCount = Math.floor((max - min) / bucketSize) + 1;
        const buckets = new Array(bucketCount);
        for (let i = 0; i < bucketCount; i++) {
            buckets[i] = [];
        }
        
        // 将数据分配到桶中
        for (let i = 0; i < arr.length; i++) {
            const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
            buckets[bucketIndex].push(arr[i]);
        }
        
        // 对每个桶中的数据进行排序
        for (let i = 0; i < buckets.length; i++) {
            buckets[i].sort((a, b) => a - b);
        }
        
        // 将桶中的数据按顺序合并
        let index = 0;
        for (let i = 0; i < buckets.length; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                arr[index++] = buckets[i][j];
            }
        }
        
        return arr;
    }
    
    const sortedArr = bucketSort(arr);
    console.log(sortedArr);
})([1, 5, 4, 2, 9, 7, 8]);//>> [1, 2, 4, 5, 7, 8, 9]
```
### 基数排序
按个位、十位、百位依次排
用桶 + 多次扫描。
```js
((arr) => {
    function radixSort(arr) {
        // 找到数组中的最大值
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        
        // 计算最大值的位数
        let maxDigit = 1;
        while (Math.floor(max / 10) > 0) {
            maxDigit++;
            max = Math.floor(max / 10);
        }
        
        // 对每一位进行排序
        for (let digit = 0; digit < maxDigit; digit++) {
            // 创建10个桶（0-9）
            const buckets = Array.from({length: 10}, () => []);
            
            // 将数据分配到桶中
            for (let i = 0; i < arr.length; i++) {
                const bucketIndex = Math.floor(arr[i] / Math.pow(10, digit)) % 10;
                buckets[bucketIndex].push(arr[i]);
            }
            
            // 将桶中的数据按顺序合并
            let index = 0;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < buckets[i].length; j++) {
                    arr[index++] = buckets[i][j];
                }
            }
        }
        
        return arr;
    }
    
    const sortedArr = radixSort(arr);
    console.log(sortedArr);
})([1, 5, 4, 2, 9, 7, 8]);//>> [1, 2, 4, 5, 7, 8, 9]
```
### *** 归并排序（分治 + 面试能问很深）
```js

function mergeSort(arr){
  let array = mergeSortRec(arr)
  return array
}

function mergeSortRec(arr){
  let length = arr.length;
  if(length === 1){
    return arr;
  }
  let mid = Math.floor(length/2),
  left = arr.slice(0, mid),
  right = arr.slice(mid, length)
  return merge(mergeSortRec(left), mergeSortRec(right))
}

function merge(left, right){
  let result = [], ileft = 0, iright=0
  while(ileft<left.length && iright<right.length){
    if(left[ileft] < right[iright]){
      result.push(left[ileft++])
    } else {
      result.push(right[iright++])
    }
  }

  while(ileft<left.length){
    result.push(left[ileft++])
  }

  while(iright<right.length){
    result.push(right[iright++])
  }

  return result
}

```

### 希尔排序
```js
((arr) => {
    function shellSort(arr) {
        const n = arr.length;
        
        // 初始间隔设为数组长度的一半
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            // 对每个子序列进行插入排序
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j;
                
                // 在子序列中寻找插入位置
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                
                arr[j] = temp;
            }
        }
        
        return arr;
    }
    
    const sortedArr = shellSort(arr);
    console.log(sortedArr);
})([1, 5, 4, 2, 9, 7, 8]);//>> [1, 2, 4, 5, 7, 8, 9]



### 找出字符串中不含重复字符的最长子串的长度
```js
var lengthOfLongestSubstring = function(s){
  let arr = [];
  let max = 0;
  for(let i = 0; len = s.length; ++i){
    const sameIndex = arr.findIndex(item => item === s[i])
    arr.push(s[i])
    if(sameIndex > -1){
      arr = arr.splice(sameIndex+1)
    }
    max = Math.max(arr.length, max)
  }
  return max;
}

```

### 给定一个字符串，判定其能否排列成回文串
```js
var canPermutePalindrome = function(s){
  const set = new Set()
  s.split('').forEach(key => {
    if(set.has(key)){
      set.delete(key)
    } else {
      set.add(key)
    }
  })
  return set.size <= 1
}
```

### 反转链表
```js
const node = {
  val:
  next:
}

var reverseList = function(head){
  if(!head){
    return head;
  }

  let pre = null;
  let cur = head;

  while(cur){
    const {next} = cur;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre
}

```

### 二叉树的遍历
```js
const node = {
  value:
  left:
  right:
}

//前序：根左右
var preorderTraversal = function(root){
  if(!root){
    return [];
  }

  const result = [];
  result.push(root.val)
  if(root.left){ result.push(...preorderTraversal(root.left))}
  if(root.right){result.push(...preorderTraversal(root.right))}
  return result
}

var inorderTraversal = function(root){
  if(!root){
    return []
  }
  let result = []
  result = result.concat(inorderTraversal(root.left))
  result.push(root.val)
  result = result.concat(inorderTraversal(root.right))
  return result;
}

var postorderTraversal = function(root){
  if(!root){
    return []
  }
  const result = []
  result.push(...postorderTraversal(root.left))
  result.push(...postorderTraversal(root.right))
  result.push(root.val)
  return result;
}

```

### 实现一个全排列
```js
function permute(arr){
  const result = [];
  function backtrack(subarr, remaining){
    if(remaining.length === 0){
      result.push(subarr.slice())
    } else {
      for(let i=0; i<remaining.length; i++){
        subarr.push(remaining[i]);
        const newRemaining = [...remaining.slice(0,1), ...remaining.slice(i+1)]
        backtrack(subarr, newRemaining)
        subarr.pop()
      }
    }
  }

  backtrack([], arr);
  return result;
}

const inputArray = [1,2,3]
const permutations = permute(inputArray)
console.log(permutations)
```

### 快速找到链表的中间节点
```js

class ListNode {
  constructor(val, next = null){
    this.val = val;
    this.next = next;
  }
}

function findMiddleNode(head){
  let slow = head;
  let fast = head;

  while(fast !== null && fast.next !== null){
    slow = slow.next;
    fast = fast.next.next
  }
  return slow
}

```