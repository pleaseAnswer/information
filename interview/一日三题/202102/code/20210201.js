function LinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
    this.visited = 0; // 访问标记
  };
  var head = null;
  var length = 0;
  // 添加新节点
  this.append = function(element) {
    var node = new Node(element);
    var current;
    if(head === null) {
      head = node; // 链表中第一个节点
    } else {
      current = head;
      // 循环链表直到最后一项
      while(current.next) {
        current = current.next;
      }
      // 找到最后一项，将其next赋为node，建立链接
      current.next = node;
    }
    length++;
  };
  // 插入新节点
  this.insert = function(position, element) {
    // 检查临界值
    if(position >= 0 && position <= length) {
      var node = new Node(element);
      var current = head;
      var previous;
      var index = 0;
      if(position === 0) {
        node.next = current;
        head = node;
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  // 根据指定位置移除节点
  this.removeAt = function(position) {
    // 检查临界值
    if(position > -1 && position < length) {
      var current = head;
      var previous;
      var index = 0;
      if(position === 0) {
        head = current.next;
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  // 移除节点
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  // 查询节点位置
  this.indexOf = function(element) {
    var current = head;
    var index= 0;
    while(current) {
      if(element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
  // 返回首元节点
  this.getHead = function() {
    return head;
  };
  // 判断链表是否为空
  this.isEmpty = function() {
    return length === 0;
  };
  // 判断链表长度
  this.size = function() {
    return length;
  };
  // 输出链表
  this.print = function() {
    var current = head;
    var arr = [];
    while(current) {
      arr.push(current.element);
      current = current.next;
    }
    return arr;
  };
  // 返回指定节点
  this.search = function(element) {
    var current = head;
    while(current) {
      if(current.element === element) {
        return current;
      }
      current = current.next;
    }
    return null;
  };
}

var linkedList = new LinkedList();
linkedList.append('A');
linkedList.append('B');
linkedList.append('C');
linkedList.append('D');
linkedList.getHead();

linkedList.search('D').next = linkedList.search('B');

var list = linkedList.getHead();