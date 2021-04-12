# 20210408

## 两数相加

* 给你两个非空的链表，表示两个非负的整数。
* 它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。
* 请你将两个数相加，并以相同形式返回一个表示和的链表。

```js
// 定义单链表
function ListNode(val, next) {
  this.value = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l1
 * @return {ListNode}
 */
function addTwoNums(l1, l2) {
  let head, tail = null;
  let carry = 0;
  while(l1 || l2) {
    let n1 = l1 ? l1.value : 0;
    let n2 = l2 ? l2.value : 0;
    let sum = n1 + n2 + carry;
    if(!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }
    carry = Math.floor(sum / 10)
    if(l1) {
      l1 = l1.next
    }
    if(l2) {
      l2 = l2.next
    }
  }
  if(carry) {
    tail.next = new ListNode(carry)
  }
  return head
}
```
