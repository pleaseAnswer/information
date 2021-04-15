# 20210407

## 两数之和

* 给定一个整数数组 nums 和一个目标值 target
* 在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let len = nums.length;
    for(let i = 0; i <= len - 1; i++) {
        for(let j = i + 1; j <= len - 1; j++) {
            if(nums[i] + nums[j] === target)  return [i, j]
        }
    }
};
var twoSum = function(nums, target) {
    let len = nums.length;
    let map = new Map();
    for(let i = len - 1; i >= 0; i--) {
       if(map.has(nums[i])) {
           return [map.get(nums[i]), i]
       } else {
           map.set(target-nums[i], i)
       }
    }
    return []
};
```
