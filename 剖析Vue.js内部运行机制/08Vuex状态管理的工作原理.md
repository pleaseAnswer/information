## Vuex状态管理的工作原理

### 为什么要使用Vuex

> 解决多组件通讯问题

* Vuex是一个专门为Vue.js框架设计的状态管理工具
* Vuex借鉴了flux、redux的基本思想，将状态抽离到全局，形成一个Store
* Vuex内部采用了new Vue来将Store内的数据进行`响应式化`

### 安装

> Vue提供了一个`Vue.use()`来安装插件，内部会调用插件提供的`install`方法

```js
Vue.use(Vuex);
```

* Vuex提供一个`install`方法来安装：采用`Vue.mixin`方法将`vuexInit`方法混进`beforeCreate`钩子中，并用`Vue`保存Vue对象

```js
let Vue;
export default install(_Vue) {
    Vue.mixin({ beforeCreate: vuexInit });
    Vue = _Vue;
}
```

* `vuexInit`方法实现了什么？
> 在使用Vuex时，需要将`store`传入到Vue实例中

* `vuexInit`方法实现了在每一个vm中都可以访问该`store`
* 如果是根节点（`$options`中存在`store`说明是根节点），则直接将`options.store`赋值给`this.$store`
* 否则说明不是根节点，从父节点的$store中获取

```js
function vuexInit() {
    const options = this.$options;
    if(options.store) {
        this.$store = options.store;
    } else {
        this.$store = options.parent.$store;
    }
}
```

### Store

#### 数据的响应式化

* **1.在`Store`构造函数中对`state`进行响应式化**
    * `state`会将需要的依赖收集在`Dep`中，在被修改时更新对应视图

```js
constructor() {
    this._vm = new Vue({
        data: {
            ?state: this.state
        }
    })
}
```

#### commit

* **`commit`方法用来触发`mutation`**
	* 从`_mutations`中取出对应的mutation，循环执行其中的每一个mutation
```js
commit(type, payload, _options) {
    const entry = this._mutations[type];
    entry.forEach(funciton commitIterator(handler) {
        handler(payload);
    })
}
```

#### dispatch

* **`dispatch`用于触发action，可以包含异步状态**
    * 取出`_actions`中的所有对应action，将其执行，如果有多个则用`Promise.all`进行包装

```js
dispatch(type, payload) {
    const entry = this._actions[type];
    return entry.length > 1 
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload);
}
```
