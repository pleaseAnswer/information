## 20210426

### 最长公共前缀

#### 粗暴遍历

```js
function longestCommonPrefix(strs) {
  if(strs.length === 0) return ''
  let ans = strs[0]
  for(let i = 0; i < strs.length; i++) {
    for(let j = 0; j < ans.length && j < strs[i].length; j++) {
      if(ans[j] !== strs[i][j]) {
        ans = ans.substr(0, j)
        break
      }
    }
    if(ans === '') return ans
  }
  return ans
}
console.log(longestCommonPrefix(['abc', 'abd', 'abe']))
```

* 时间复杂度 O(mn)  (m是strs中字符串的平均长度，n是字符串数)
* 空间复杂度 O(1)

#### 逐位比较

```js
function longestCommonPrefix(strs) {
  let re = ''
  if(!strs.length) return re
  for(let j = 0; j < strs[0].length; j++) {
    for(let i = 1; i < strs.length; i++) {
      if(strs[i][j] !== strs[0][j]) return re
    }
    re += strs[0][j]
  }
  return re
}
console.log(longestCommonPrefix(['abc', 'abd', 'abe']))
```

* 时间复杂度 O(mn)  (m是strs中字符串的平均长度，n是字符串数)
* 空间复杂度 O(1)

#### 分治

> 对于问题LCP(S[i]...S[j])，可以分解成两个子问题LCP(S[i]...S[mid])与LCP(S[mid+1]...S[j])，其中mid=(i+j)/2

```js
// 两个子串的最长公共前缀
function commonPrefix(lcpLeft, lcpRight) {
  let minLength = Math.min(lcpLeft.length, lcpRight.length)
  for(let i = 0; i < minLength; i++) {
    // 如果两个子串出现不同字符
    if(lcpLeft[i] != lcpRight[i]) {
      return lcpLeft.substr(0, i) 
    }
  }
  // 如果两个子串在minlength没有出现不同字符
  return lcpLeft.substr(0, minLength)
}
// 分解到只有一个元素
function longestCommonPrefix(strs, start, end) {
  // strs只有一个元素时 
  console.log(strs, start, end)
  if(start == end) {
    return strs[start]
  } else {
    let mid = parseInt((start + end) / 2)
    let lcpLeft = longestCommonPrefix(strs, start, mid)
    let lcpRight = longestCommonPrefix(strs, mid + 1, end)
    // 递归，分解到只有一个元素时
    return commonPrefix(lcpLeft, lcpRight)
  }
}
// 函数入口
function solutionLongestCommonPrefix(strs) {
  if(!strs.length) {
    return ''
  } else {
    return longestCommonPrefix(strs, 0, strs.length - 1)
  }
}
```

##### 测试用例

```js
let strs = ["flower","flow","flight"]
solutionLongestCommonPrefix(strs)
// ["flower", "flow", "flight"] 0 2
// ["flower", "flow", "flight"] 0 1
// ["flower", "flow", "flight"] 0 0
// ["flower", "flow", "flight"] 1 1
// lcpLeft flower
// lcpRight flow
// ["flower", "flow", "flight"] 2 2
// lcpLeft flow
// lcpRight flight
// "fl"
```

* 时间复杂度 O(mn)  (m是strs中字符串的平均长度，n是字符串数)
    > T(n) = 2 · T(n/2) + O(m) 

* 空间复杂度 O(mlogn)
    > 主要取决于递归调用的层数，层数最大为logn，每层需要m的空间存储返回结果