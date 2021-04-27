# 20210427

### 合并两个有序链表

* 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

#### 迭代

```js
var mergeTwoLists = function(l1, l2) {
  const prehead = new ListNode(-1)
  let prev = prehead
  while(l1 != null && l2 != null) {
      if(l1.val <= l2.val) {
          prev.next = l1
          l1 = l1.next
      } else {
          prev.next = l2
          l2 = l2.next
      }
      prev = prev.next
  }
  prev.next = l1 === null ? l2 : l1
  return prehead.next
};
```

* 时间复杂度O(n+m)
* 空间复杂度O(1)

#### 递归

```js
var mergeTwoLists = function(l1, l2) {
  if(l1 === null) return l2
  if(l2 === null) return l1
  if(l1.val <= l2.val) {
      l1.next = mergeTwoLists(l1.next, l2)
      return l1
  }
  if(l2.val < l1.val) {
      l2.next = mergeTwoLists(l1, l2.next)
      return l2
  }
};
```

* 时间复杂度O(n+m)
* 空间复杂度O(n+m)