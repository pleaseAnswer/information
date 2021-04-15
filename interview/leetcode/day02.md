# 数组

* 删除数组的重复项--原地
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let len = nums.length;
    for(let i = len-1; i >= 0; i--) {
        for(let j = i - 1; j >= 0; j--) {
            if(nums[i] === nums[j]) {
                nums.splice(i, 1)
            }
        }
    }
    return nums.length
};

/**
 * 快指针+慢指针
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length == 0) return 0
    let i = 0; // 慢指针
    // j 快指针
    for(let j = i + 1, len = nums.length; j < len; j++) {
        if(nums[i] !== nums[j]) {
            i++;
            nums[i] = nums[j]
        }
    }
    // +1 是头元素的长度
    return i+1
};
```

* 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
* 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
```js
/**
 * 贪心算法
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    let allPric = 0
    for(let i = 1; i < len; i++) {
        if(prices[i] > prices[i-1]) {
            allPric += prices[i] - prices[i-1]
        }
    }
    return allPric
};
```

* 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let len = nums.length - 1;
    for(let i = 0; i < k; i++) {
        nums.unshift(nums[len])
        nums.pop()
    }
    return nums
};
```

* 给定一个整数数组，判断是否存在重复元素。
* 如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
```js
/**
 * 朴素线性查找 【超时】
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let len = nums.length;
    for(let i = 0; i < len; i++) {
        for(let j = i + 1; j < len; j++) {
            if(nums[i] === nums[j]) return true
        }
    }
    return false
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    for(let i = nums.length-1; i >= 0; i--) {
        let temp = nums[i];
        nums.pop()
        if(nums.indexOf(temp) >= 0) return true
    }
    return false
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let newNums = [];
    for(let i = 0, len = nums.length; i < len; i++) {
        if(newNums.indexOf(nums[i]) >= 0) return true
        newNums.push(nums[i])
    }
    return false
};
/**
 * 排序
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let newNums = nums.sort();
    for(let i = 0, len = nums.length; i < len; i++) {
        if(newNums[i] === newNums[i+1]) return true;
    }
    return false
};
```

* 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
* 你的算法应该具有线性时间复杂度
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    for(let i = nums.length-1; i >= 0; i-=2) {
        let temp = nums[i]
        nums.pop()
        if(nums.indexOf(temp) != -1) {
            nums.splice(nums.indexOf(temp),1)
        } else {
            return temp
        } 
    }
};
```

* 给定两个数组，编写一个函数来计算它们的交集。
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let newNums = []
    let len1 = nums1.length - 1;
    let len2 = nums2.length - 1;
    for(let i = len1; i >= 0; i--) {
        for(let j = len2; j >= 0; j--) {
            if(nums1[i] === nums2[j]) {
                newNums.push(nums1[i])
                nums1.splice(i,1)
                nums2.splice(j,1)
            }
        }
    }
    return newNums
};
/**
 * 哈希表
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let map = {};
    let res = [];
    nums1.map(item => {
        // if(res.indexOf(item) >= 0) {
        if(map[item]) {
            map[item]++;
        } else {
            map[item] = 1;
        }
    })
    nums2.map(item => {
        if(map[item] > 0) {
            res.push(item)
            map[item]--
        }
    })
    return res
};
```