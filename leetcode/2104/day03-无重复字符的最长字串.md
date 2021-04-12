# 20210412

## 无重复字符的最长子串

* 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

```js
// 转为数组处理，空间复杂度较高
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let arr = s.split('')
    let oArr = []
    let len = 0
    arr.map(item => {
        if(item === ' ') {
            item = 1
        }
        let oIndex = oArr.indexOf(item)
        if(oIndex >= 0) {
            oArr = oArr.slice(oIndex+1)
            oArr.push(item)
        } else {
            oArr.push(item)
        }
        len = Math.max(oArr.length, len)
    })
    return len
};
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let oArr = []
    let len = 0
    for(let i = 0; i < s.length; i++) {
        let oIndex = oArr.indexOf(s[i])
        if(oIndex < 0) {
            oArr.push(s[i])
        } else {
            oArr = oArr.slice(oIndex+1)
            oArr.push(s[i])
        }
        len = Math.max(oArr.length, len)
    }
    return len
};
```
