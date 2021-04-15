# 20210415

## 合并两个有序数组

* 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

* 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let total = m + n - 1;
    while(p1 >= 0 || p2 >= 0) {
        let cur
        if(p1 === -1) {
            cur = nums2[p2--]
        } else if(p2 === -1) {
            cur = nums1[p1--]
        } else if(nums1[p1] > nums2[p2]) {
            cur = nums1[p1--]
        } else {
            cur = nums2[p2--]
        }
        nums1[total--] = cur
    } 
    return nums1
};
```
