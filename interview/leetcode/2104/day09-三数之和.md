# 20210427

## 三数之和

* 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
* 注意：答案中不可以包含重复的三元组。

### 排序 + 双指针

```js
function threeSum(nums) {
  let output = []
  const len = nums.length
  if(nums == null || len < 3) return output
  nums.sort((a, b) => a-b) // 排序
  for(let i = 0; i < len; i++) {
    if(nums[i] > 0) break
    if(i > 0 && nums[i] == nums[i-1]) continue
    let L = i + 1, R = len - 1
    while(R > L) {
      const sum = nums[i] + nums[L] + nums[R]
      if(sum == 0) {
        output.push([nums[i], nums[L], nums[R]])
        while(L < R && nums[L] == nums[L + 1]) L++
        while(L < R && nums[R] == nums[R - 1]) R--
        R--
        L++
      }
      else if(sum > 0) R--
      else if(sum < 0) L++
    }
  }
  return output
}

```