### Node中的Event Loop

#### Node.js的运行机制

1. V8引擎解析js脚本
2. 解析后的代码，调用Node API
3. `libuv库`负责Node API的执行。
    * 它将不同的任务分配给不同的线程，形成一个Event Loop，以异步的方式将任务的执行结果返回给V8引擎
4. V8引擎再将结果返回给用户

#### libuv引擎的事件循环--6个阶段

> 每当进入某一个阶段时，都会从对应的回调队列中取出函数去执行，当队列为空或者执行的回调函数数量达到系统设定的阈值，就会进入下一阶段

![libuv引擎的事件循环](./img/libuv引擎的事件循环.png)

* node中的事件循环：外部输入数据 -> 轮询阶段(poll) -> 检查阶段(check) -> 关闭事件回调阶段(close callback) -> 定时器检测阶段(timer) -> I/O事件回调阶段(I/O callbacks) -> 闲置阶段(idel, prepare) -> 轮询阶段(按照该顺序反复运行)...
    * **poll阶段**：获取新的I/O事件，适当的条件下node将阻塞在这里
    * **check阶段**：执行setImmediate()的回调
    * **close callbacks阶段**：执行socket的close事件回调
    * **timers阶段**：这个阶段执行timer（setTimeout、setInterval）的回调
    * **I/O callbacks阶段**：处理一些上一轮循环中的少数未执行的I/O回调
    * **idel, prepare阶段**：仅node内部使用

> 上面六个阶段都不包括process.nextTick()

##### timers

* timers阶段会执行`setTimeout`和`setInterval`回调，并且是由poll阶段控制的
* 在node中定时器指定的时间也不是准确时间，只能是尽快执行 

##### poll

* poll是一个至关重要的阶段，这一阶段中，系统会做两件事：
    * 回到timer阶段执行回调
    * 执行I/O回调

* 在进入该阶段时如果没有设定timer，会执行两件事：
    * 如果poll队列不为空，会遍历回调队列并同步执行，直到队列为空|达到系统限制
    * 如果poll队列为空，会发生两件事：
        * 如果有`setImmediate回调`需要执行，poll阶段会停止并且进入到check阶段执行回调
        * 如果没有`setImmediate回调`需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

* 设定了timer的话且poll队列为空，则会判断是否有timer超时，如果有的话会回到timer阶段执行回调

##### check

> `setImmediate()`的回调会被加入到check队列中，从`event loop`的阶段图可以知道，check阶段的执行顺序在poll之后

```js
console.log('start')
setTimeout(() => {
	console.log('timer1')
	Promise.resolve().then(function() {
            console.log('promise1')
      })
}, 0)
setTimeout(() => {
	console.log('timer2')
    Promise.resolve().then(function() {
    	console.log('promise2')
  	})
}, 0)
Promise.resolve().then(function() {
  	console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
```

* 一开始执行栈的同步任务完毕后（start end，并将2各timer一次放入timer队列），会先执行微任务（**这点跟浏览器端的一样**），所以打印了promise3
* 进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；**这点跟浏览器端相差比较大，timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器，每执行一个宏任务后就去执行一个微任务**

#### 注意点

##### setTimeout和setImmediate

* `setImmediate`设计在poll阶段完成时执行，即`check`阶段
* `setImmediate`设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行

###### 栗子1

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```
* 以上代码，`setTimeout`可能执行在前，也可能执行在后
* setTimeout(fn, 0) === setTimeout(fn, 1) 是由源码决定的
    * 进入事件循环也需要时间，如果在准备时间花费大于1ms时，在timer阶段就会直接执行setTimeout回调
    * 如果准备时间花费小于1ms，就是setImmediate回调先执行

###### 栗子2

* 当两者在异步I/O callback内部调用时，总是先执行`setImmediate`，再执行`setTimeout`

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout
```

* 上述代码中，`setImmediate`永远先执行。
* 两个代码写在I/O回调中，I/O回调是在poll阶段执行，当回调执行完毕后队列为空，发现存在`setImmediate`回调，就直接跳转到check阶段去执行回调了

##### process.nextTick

> 独立于event loop之外的，它有一个自己的队列，当每个阶段完成后，如果存在nextTick队列，就会清空队列中的所有回调函数，并且优先于其它microtask执行

```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```