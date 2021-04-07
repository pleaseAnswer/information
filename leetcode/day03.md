##### 加一
* * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
* 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

```js
	/**
     * @param {number[]} digits
     * @return {number[]}
     */
    var plusOne = function(digits) {
        let len = digits.length;
        for(let i = len - 1; i >= 0; i--) {
            digits[i]++;
            digits[i] %= 10 
            if(digits[i] != 0) return digits 
        }
        digits = [...Array(len)].map(item => 0)
        digits.unshift(1)
        return digits
    };
```

##### 两数之和
* 给定一个整数数组 nums 和一个目标值 target
* 在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 // 更优
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
    for(let i = len - 1; i >= 0; i--) {
        let temp = target - nums[i];
        let tempInd = nums.indexOf(temp)
        console.log(tempInd)
        if(tempInd != i && tempInd >= 0) return [i, tempInd]
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
};
```