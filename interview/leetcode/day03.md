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

