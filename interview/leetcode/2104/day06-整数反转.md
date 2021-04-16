# 20210416

## 整数反转

* 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
* 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
* 假设环境不允许存储 64 位整数（有符号或无符号）。

```js
var reverse = function(x) {
    x = x + ''
    let arr = x.split('')
    if(arr[0] === '-') {
        delete arr[0]
        x = arr.reverse().join('')
        if(x > Math.pow(2, 31)) {
            return 0
        } else {
            return x * -1
        }
    } else {
        x= arr.reverse().join('')
        if(x > Math.pow(2, 31)) {
            return 0
        } else {
            return x
        }
    }
};
```

```js
var reverse = function(x) {
  let rev = 0
  while(x != 0) {
    let pop = x % 10
    x = parseInt(x / 10)
    rev = rev * 10 + pop
    if(rev > Math.pow(2, 31) || rev < Math.pow(-2, 31)) {
      return 0
    }
  }
  return rev
};
```

## 回文数

* 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
* 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

```js
var isPalindrome = function(x) {
    if(x < 0) {
        return false
    }
    let oX = x
    let rev = 0;
    while(x != 0) {
        let pop = x % 10
        x = parseInt(x / 10)
        rev = rev * 10 + pop
        if(rev > Math.pow(2, 31)) {
            return false
        }
    }
    if(rev === oX){
        return true
    } else {
        return false
    }
};
```
