# 寻找两个正序数组的中位数

* 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
* 请你找出并返回这两个正序数组的 中位数

> 二分法

```js
function findMedianSortedArrays(nums1, nums2) {
  if(nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  let n = nums1.length;
  let m = nums2.length;
  console.log(nums1, nums2)
  let low = 0, high = n;
  while(low <= high) {
    const i = low + Math.floor((high - low) / 2);
    const j = Math.floor((n + m + 1) / 2) - i;
    console.log(i,j)
    // i + j = m - i + n - j（m+n为偶数）
    // i + j = m - i + n - j + 1（m+n为奇数）
    const L1max = i === 0 ? -Infinity : nums1[i - 1];
    const L1min = i === n ? Infinity : nums1[i];
    const L2max = j === 0 ? -Infinity : nums2[j - 1];
    const L2min = j === m ? Infinity : nums2[j];
    if (L1max <= L2min && L2max <= L1min) {
    return (n + m) % 2 === 1
      ? Math.max(L1max, L2max)
      : (Math.max(L1max, L2max) + Math.min(L1min, L2min)) / 2
    } else if (L1max > L2min) {
      high = i - 1
    } else {
      low = low + 1
    }
  }
}
```

```js
var findMedianSortedArrays = function(nums1, nums2) {
  let n = nums1.length;
  let m = nums2.length;
  let nums = [];
  if(nums1[0] >= nums2[m-1]) {
    nums = nums2.concat(nums1)
  } else if(nums2[0] >= nums1[n-1]) {
    nums = nums1.concat(nums2)
  } else {
    nums = nums1.concat(nums2).sort((a, b) => {
      return a - b
    })
  }
  return (n + m) % 2 === 1
    ? nums[Math.floor(( n+ m) / 2]
    : (nums[(n + m) / 2] + nums[(n + m) / 2 - 1]) / 2
};
```