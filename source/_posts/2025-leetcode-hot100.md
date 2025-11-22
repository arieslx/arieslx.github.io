---
title: 2025年｜Leetcode hot100 typescript
date: 2025-10-31 23:40:59
tags:
  - 2025
  - front-end-interview
---

### [1. Two Sum](https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked)

```ts
function twoSum(nums: number[], target: number): number[]{
    let helperMap: Map<number, number> = new Map();
    let index: number | undefined;
    let resArr: number[] = [];
    for(let i=0, length=nums.length;i<length;i++){
        index = helperMap.get(target-nums[i]);
        if(index!==undefined){
            resArr= [i, index];
            break;
        }
        helperMap.set(nums[i], i);
    }
    return resArr;
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
