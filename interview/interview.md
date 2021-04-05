## vue

### vue的工作原理?

* `vue`是一个构建`数据驱动`的web界面的`渐进式框架`，采用`MVVM模式`实现视图层与数据层的数据修改、更新监听。
* 其工作原理是`vue`在实例化的过程中会遍历`data`下的数据，通过`Object.defineProperty()`方法将它们设置为响应式属性。在内部通过追踪依赖，在属性被修改和访问时通知变化。

### vue是如何实现双向绑定的？

* `model -> view v-bind:value='val'`
* `view -> model v-on:input="val=$event.target.value"`

### vue的特点

* 简洁、数据驱动[计算属性和追踪依赖]、组件化、轻量、快速

### 为什么vue中的data必须是一个函数？

* 对象是引用类型。组件重用时，在一个组件中修改data时，其他重用组件中的data也会被修改。使用返回对象的函数，由于每次都返回一个新的对象，每个组件可以各自维护自己的data。

### vue中的ref是什么？

* ref用于给组件或元素注册引用信息，引用信息将被注册到父组件的$refs上

### v-for的key的作用是什么？

* 当使用v-for重新渲染元素列表时，默认采用“就地复用”原则，dom是不会根据数据项的顺序做重新排列的。提供key能够使vue跟踪到每个节点，使得vue能够基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

### vuex的用法，vuex和bus总线的区别

* vuex实现数据共享，跨组件传参，适用大型项目;
* bus当组件层级嵌套不深的时候可以用，适用于小型项目

### vue的响应式原理，以及get set分别做了什么

* vue在实例化时会遍历data下的属性，并通过object.defineProperty()把这些属性转为setter getter，并写入vue的实例。
* getter的时候会收集依赖，setter的时候会触发依赖。

### watch、computed、methods的区别

* watch用于监听实例下属性，当监听的值发生改变时会自动调用相对应的方法；
* computed用于声明式的描述一个值依赖了其他值，只有当它依赖的值发生改变的时候，才会被重新计算；

#### watch和computed最大的区别在于

* watch能处理异步操作，而computed不能。

#### computed和watch的区别

* 调用方式不同
* 是否有缓存

### vue有多少个生命周期函数

* 一般有8个生命周期
* `<keep-alive>`中创建的组件，会多出两个生命周期：`activated`与`deactivated`。`activated`在缓存组件激活时调用；`deactivated`在缓存组件失活时调用。

### 子组件为什么不能修改父组件传递的prop？

* 因为vue设计是单向数据流，数据的流动方向是自上往下的方向

### 组件通讯

#### 父传子

* 在调用组件时使用自定义属性名将属性传递；子组件使用props属性接收；

#### 子传父

* 在调用组件时使用自定义方法名将方法传递；子组件使用this.$emit(自定义方法名)触发

#### 事件总线

* 创建bus.js文件，创建vue实例
* 接收方：bus.$on(自定义事件名)
* 发送方：bus.$emit(自定义方法名, 数据)

### 如何实现路由动态渲染？

* 经过权限配置，在用户登录时向后台请求该用户对应权限的菜单栏数据，然后处理这些数据生成实际会被渲染的router。

### 路由守卫

#### 全局路由守卫--写在路由配置文件

* beforeEach
* afterEach

#### 路由独享守卫

* beforeEnter

#### 组件内守卫

* beforeRouteEnter
* beforeRouteUpdate
* beforeRouteLeave

### 介绍vuex

* vuex是一个状态管理工具，用于处理组件通讯的。有五种属性：第一个是state，vuex就是一个store，store里面存放了很多对象，state就是数据源的存放地，里面存放的数据都是响应式的，对应于vue的data；第二个是getter，对应与vue里面的computed，它是store的计算属性；mutation对应于vue里面的methods，它是改变state的唯一途径；action可用于做异步操作，但是不能直接改变state；module用于给vuex分模块。

### 为什么vuex的mutation不能做异步操作？

* 每个mutation执行完后都会对应到一个新的状态更新，这样就能通过devtool去观察到状态的变更过程。如果mutation支持一部，就无法很好的进行状态的追踪，给调试带来困难。

### ajax、axios、promise的区别

* ajax是jQ对原生XHR的封装；它通过在后台与服务器进行少量数据交换，使得页面可以在不重新加载整个页面的情况下，对网页进行局部更新，即实现了异步更新。
* axios是一个基于promise的http库，支持promise的所有API，能够拦截请求和响应，能够转换请求和响应的数据，而且安全性更高；
* promise对象代表了未来将要发生的事件，用来传递异步操作的消息，用来解决异步操作的回调地狱

### async和await是什么？

* async、await是函数定义的关键字。await用于等待promise的返回结果，并且只能在async声明的函数内使用；利用async声明的函数会返回一个promise对象。

## webpack

### webpack的工作原理？

* webpack是一个静态模块打包器。从入口开始，逐层分析项目下的所有模块和依赖，进行编译处理，并把他们打包成一个或多个文件。

### webpack配置--记住

* outputDir 出口
* lintOnSave 是否打开eslint
* devServer.proxy 本地调试的请求代理
* configureWebpack修改webpack
  * resolve.alias文件起别名
* chainWebpack定义loader和plugin(插件)

## js

### 什么是事件流？

* 事件流包括事件捕获+目标阶段+事件冒泡。

### 高阶函数

* 接收函数作为参数或者返回函数的函数

### 常用的高阶函数

* map
* reduce
* filter
* sort

### js执行机制

#### 事件循环

* js是一门单线程语言，其多线程都是用单线程模拟出来的。执行js代码时，同步任务会进入主线程，异步任务会进入任务队列等待执行。当主线程为空，会去任务队列读取对应的函数进入主线程执行。

* 怎么知道主线程执行栈为空？
  * js引擎存在一个监控进程，会不断地检查主线程执行栈是否为空。

* 异步任务分为微任务和宏任务，不同类型的任务会进入对应的任务队列
  * 微任务：promise.then、process.nextTick
  * 宏任务：整体script、setTimeout、setInterval、setImmediate、i/o

* 任务队列中，在每一次事件循环，macrotask只会提取一个执行，而microtask会一直提取，直到microtask队列为空

### 如何理解节流？

* 在一段时间内，只执行第一个函数，忽略后续函数

* 如何实现节流？
  * 可以通过一个开关跟定时器setTimeout实现。只有当开关打开时函数才会执行，函数执行时关闭开关，等到setTimeout时间到再把开关打开。

### 如何理解防抖？

* 当函数被持续触发时不执行，等最后一次触发结束的一段时间后再去执行

* 如何实现防抖？
  * 在定时器内执行函数，当函数再次调用时，先清除之前的定时器，再重新执行定时器。

### 浏览器和node事件循环的区别？

* 浏览器环境下，microtask的任务队列在每个macrotask执行完之后执行；
* nodejs中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕就会执行microtask队列的任务。

### 分析比较 opacity: 0、visibility: hidden、display: none的区别？

* opacity:0;占据空间，可以点击
* visibility:hidden;占据空间，不可以点击
* display:none;不占据空间，不能点击

### this指向

* this指向由函数调用的方式决定

| 函数调用方式 | 栗子 | 指向 | 严格模式指向 |
| --- | --- | --- | --- |
| `普通函数调用` | `f()` | `window` | `undefined` |
| `对象方法调用` | `o.f()` | `当前的对象o` | `当前的对象o` |
| `构造函数调用` | `new f()` | `当前实例对象` | `当前实例对象` |
| `函数上下文` | `call` `apply` `bind` | `第一个参数` | `第一个参数` |

### 实现深拷贝一个元素

```js
var deepCopy = function(obj) {
  if(typeof obj != 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

### 提取url的查询字符串，将其按key-value形式返回一个json结构

```js
var url = "https:...?username=lh&...";
var oIndex = url.indexOf('?');
var oUrl = url.splice(oIndex, url.length-1);
var oArr = oUrl.split('&');
var obj = {};
oArr.map(item => {
  var o = item.split('=');
  var key = o[0];
  var value = o[1];
  obj[key] = value;
})
```

### 场景题

#### 1. 单机游戏：一只小鸟在飞，前面是无尽的沙漠，上下不断有钢管生成，你要躲避钢管。小明在玩游戏时老是卡顿甚至崩溃，说出原因（3-5个）以及解决办法（3-5个）

##### 原因

1. **内存溢出问题**
2. **资源过大问题**
3. **资源加载问题**
4. **canvas绘制频率问题**

##### 解决办法

1. 内存溢出问题：在钢管离开可视区之后，销毁钢管，让垃圾收集器回收钢管。
2. 资源过大问题：应该选择图片文件大小更小的图片格式【webp、png】。
3. 资源加载问题：应该在可视区之前就预加载好资源，如果在可视区才生成钢管，用户体验就认为钢管是卡顿后才生成的，不流畅。
4. canvas绘制频率问题：提高绘制频率

### 栗子1

```js
for(var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000);
}
```

* 一秒后输出5个5
* setTimeout会被放入任务队列，等待主线程运行，即for循环的5次执行完后再执行任务队列中的函数

### 栗子2

```js
for(let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000);
}
```

* 1 2 3 4 5
* 使用es6中let使for循环中的变量变成块级作用域，通过函数作用域可以保存变量的特性来将每次循环的变量保存到函数中

### 下面代码a=什么的情况下会打印1

```js
var a = ?; 
if (a == 1 && a == 2 && a == 3) { 
  console.log(1); 
}

var a = { 
  i: 1, 
  toString() { 
    return a.i++; 
  }
}
if ( a == 1 && a == 2 && a == 3 ) { 
  console.log(1); 
}

let a = [1,2,3];
a.toString = a.shift;
if( a == 1 && a == 2 && a == 3 ) { 
  console.log(1);
}
```

### 什么是闭包

* 闭包是指有权访问其他函数作用域中的变量的函数【函数嵌套】

### 实现深度拷贝

```js
var deepCopy = function(obj) {
  if(typeof obj != 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

### es6新特性

1. let关键字
    > let声明的变量不会进行变量声明的提升
2. const关键字
3. 暂时性死区
4. 对象的增强写法
5. 箭头函数
6. 扩展运算符
7. 对象解构
8. class类
    > constructor + 原型方法 + 静态方法
9. for...of循环
10. Symbol符号类型
11. Object.assign()
    > 用来合并多个对象
12. Set集合
13. Map映射
14. 数组扩展方法
    > `include()` `find()` `findIndex()` `from()` `of()<->new Array()`
15. 字符串扩展方法
    > `includes()` `trim()` `repeat()` `endWith()`

## http

### 什么是三次握手？

* 前端向后端发送请求
* -> 后端接收请求，向前端发送“确认接收”信息
* -> 前端接收并确认了后端的接收能力，向后端发送“确认接收”信息
* -> 后端接收到前端正常接收能力信息

### 什么是四次挥手？

* 前端向后端发送“可中断”信息
* 后端接收请求信息，向前端发送“真正需要中断的时候告诉我”
* 前端接收到响应信息，等待异步执行完毕之后，向后端发送“确认中断”信息
* 后端接收到“确认中断”信息

#### 为什么不直接中断？

* 因为数据的前后端交互是异步的。所以后端把中断的权利交给了前端。

## 了解前端安全

### 同源访问策略：域名、端口、协议一致

### 跨站脚本攻击XSS

* 攻击者利用脚本对客户端进行篡改，当用户浏览网页时，对用户浏览器进行控制或者窃取用户隐私信息的一种攻击方式

### 跨站点请求伪造CSRF

* 攻击者伪造一个后端请求地址，诱导用户点击发起请求，窃取用户的注册凭证，冒充用户执行某些操作

## 对前端页面性能优化有自己的理解？

* pc端就是减少http资源请求、避免空的href和src、减少页面重定向、减少DOM元素数量和深度；
* 移动端就是首屏加载和按需加载、合理利用浏览器缓存、图片压缩处理、图片懒加载

## 源码

1. Object。defindeProperty()
2. 依赖收集 -> 形成数据与视图一一对应的关系
   * how
   * 实现订阅者Dep，用于存放Watcher观察者
   * dep.addSubs() + dep.notify
3. VNode
   * VNode就是一个js对象，用js对象的属性描述当前节点的一些状态
4. 修改data -> 视图更新
   * setter -> Dep ->watch[queue,nextTick时触发patch] -> patch -> 视图

## 项目如果重构你会选择重构哪些地方？重构的方法以及必要性？

* “来一个需求加一段代码”导致的代码结构混乱。

1. 请求方法封装
2. 代码符合编写规范-->使用esLint代码检查工具
3. 文件分模块
4. 重复性高的代码做封装 --> css样式

* 模块解耦，提高页面性能、提高代码的可维护性

## 小程序

* textarea <-> 下拉弹框重叠
* 403 -> image.weserve.nl
* 识别二维码 show-menu-by-longpress
* 服务通知 模板id
* 人脸识别
* base64转临时url

## 了解nodejs

### 模块化开发

| 框架 | 规范 | 区别 | |
| -- | -- | -- | -- |
| nodejs | commonJS | 同步 | 后端 |
| es6 | esModule | 同步 | 前端 |

#### CommonJS规范模块分类

* 内置模块
* 自定义模块：exports + require
* 第三方模块：安装npm
* 文件模块

## jQuery

## 设计模式

* 单例模式
  * 确保一个类只有唯一实例，一般用于全局缓存，可采用闭包实现。
* 工厂模式
  * 是创建对象的常用设计模式，即封装一个函数，依次调用即可创建一个不同的对象。
* 策略模式
  * 将算法的使用与算法的实现分离开，避免多重判断调用；
  * 适用于有多个判断分支的场景--表单验证；
* 观察者模式
  * 当一个特定事件发生的时候，发布者会通知所有的订阅者
* 模块模式
  * 可以指定类想暴露的属性和方法，并且不会污染全局。 采用闭包的形式

## 排序算法

### 冒泡排序

```js
function bubble(arr) {
    let len = arr.length;
    // 外层循环表示第i轮比较
    for(let i = 0; i < len - 1; i++) {
        // 内层循环表示当前轮比较j次
        for(let j = 0; j < len - i - 1; j++) {
            if(arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        }
    }
    return arr;
}
let arr = [12, 10, 8, 18, 1];
bubble(arr);

function bubbleSort(arr) {
    let exchange = arr.length; // 第一轮冒泡区间[0, len-1]
    while(exchange != 0) { // 当上一轮冒泡有交换记录时
        bound = exchange; // 每轮冒泡的边界
        exchange = 0;
        for(i = 0; i < bound; i++) {
            if(arr[i] > arr[i+1]) { 
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                exchange = i // 记录最后一次交换的位置作为下一轮比较的边界
            }
        }
    }
    return arr;
}
let arr2 = [12, 10, 8, 18, 1];
bubbleSort(arr2);
```

### 插入排序

```js
function insert(arr) {
    // 借用新数组
    let handle = [];
    handle.push(arr[0])
    for(let i = 0; i < arr.length; i++) {
        let A = arr[i];
        for(let j = handle.length - 1; j >= 0; j--) {
            let B = handle[j];
            if(A > B) {
                handle.splice(j+1, 0, A);
                break;
            }
            if(j === 0) {
                handle.unshift(A);
            }
        }
    }
    return handle;
}
let arr3 = [12, 10, 8, 18, 1];
bubbleSort(arr3);
```

### 快速排序

```js
function quick(arr) {
    if(arr.length <= 0) return arr
    let middleIndex = Math.floor(arr.length/2);
    let middleValue = arr.splice(middleIndex, 1)[0];
    let arrLeft = [],arrRight = [];
    for(let i = 0; i < arr.length; i++) {
        let item = arr[i];
        item < middleValue ? arrLeft.push(item) : arrRight.push(item);
    }
    return quick(arrLeft).concat(middleValue).concat(quick(arrRight));
}
```
