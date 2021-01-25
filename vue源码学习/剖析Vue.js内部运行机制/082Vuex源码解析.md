## Vuex

### 安装

#### 1. Vuex的安装

```js
Vue.use(Vuex);
new Vue({
    el: '#app',
    store
});
```
#### 2. Vuex是怎样把store注入到Vue实例中的呢？
	> Vue提供了Vue.use方法用来给Vue.js安装插件，内部通过调用插件的install方法进行插件的安装

* **Vuex的install实现**
    * 防止Vuex被重复安装
    * 执行applyMixin：执行vuexInit方法初始化Vuex（将vuexInint混入Vue的beforeCreate或_init方法）
```js
export default install(_Vue) {
  if(Vue) {
    if(process.env.NODE_ENV !== 'production') {
      console.error('[vuex] already installed.Vue.use(Vuex) should be called only once.');
    }
    return 
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

* **vuexInit使得所有组件都获取到同一份内存地址的store实例**
```js
function vuexInit() {
    const options = this.$options
    if(options.store) {
        this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if(options.parent && options.parent.$store){
        this.$store = options.parent.$store
    }
 
```

#### 3. 什么是Store实例？

### Store

#### 1. 用Vuex提供的Store方法构造Store实例

```js
export default new Vuex.Store({
    strict: true,
    modules: {
        moduleA,
        moduleB
    }
});
```

#### 2. Store的构造函数

```js
constructor(options = {}) {
  if(!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
  if(process.env.NODE_ENV !== 'production') {
    assert(Vue, `must call Vue.use(Vuex) before creatin a store instance.`)
    assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
    assert(this instanceof Store, `Store must be called with the new operator.`)
  }

  const {
    plugins = [],
    strict = false
  } = options

  let { state = {} } = options
  if(typeof state === 'function') {
    state = state()
  } 

  this._committing = false // 用来判断严格模式下是否是用mutation修改state的
  this._actions = Object.create(null) // 存放action
  this._mutations = Object.create(null) // 存放mutation
  this._wrappedGetters = Object.create(null) // 存放getter
  this._modules = new ModuleCollection(options) // module收集器
  this._modulesNamespaceMap = Object.create(null) // 根据namespace存放module
  this._subscribers = [] // 存放订阅者
  this._watcherVM = new Vue() // 用来实现Watch的Vue实例
  // 将dispatch与commit调用的this绑定为store对象本身，而不是实例
  const store = this
  const { dispatch, commit } = this
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload)
  }
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options)
  }

  this.strict = strict

  // 初始化根module，this._modules.root代表根module才独有保存Module对象
  installModule(this, state, [], this._modules.root)

  // 通过vm重设store，新建Vue对象使用Vue内部的响应式实现注册state以及computed
  resetStoreVM(this, state)

  // 调用插件
  plugins.forEach(plugin => plugin(this))

  // devtool插件
  if(Vue.config.devtools) {
    devtoolPlugin(this)
  } 
}
```

#### 3. installModule 初始化module

> 为module加上namespace名字空间后，注册mutation、action以及getter，同时递归安装所有子module

```js
function installModule(store, rootSatate, path, module, hot) {
  const isRoot = !path.length;
  const nameSpace = store._modules.getNamespace(path)

  // 如果有nameSpace则在_modulesNamespaceMap中注册
  if(module.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  if(!isRoot && !hot) {
    // 获取父级的state
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store.`_withCommit`(() => {
      // 将子module设成响应式的
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  // 遍历注册mutation
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  // 遍历注册action
  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })

  // 遍历注册getter
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespaceType, getter, local)
  })

  // 递归安装module
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

#### 4. resetStoreVM

> 通过vm重设store，新建Vue对象使用Vue内部的响应式实现注册state以及computed

```js
function resetStoreVM(store, state, hot) {
  const oldVm = store._vm
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}

  // 001 通过Object.defineProperty为每一个getter方法设置get方法
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumberable: true
    })
  })

  const silent = Vue.config.silent
  // 为了再new一个Vue实例的过程不会报出一切警告
  Vue.config.silent = true
  // 002 采用了new一个Vue对象来实现数据的“响应式化”
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  ValueScope.config.silent = silent

  // 使能严格模式，保证修改store只能通过mutation
  if(store.strict) {
    enableStrictMode(store)
  }

  if(oldVm) {
    // 解除旧vm的state的引用，以及销毁旧的Vue对象
    if(hot) {
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

#### 5. 严格模式

* 通过commit(mutation)修改state数据时，会在调用mutation方法之前将committing置为true
* 接下来再通过mutation修改state中的数据，此时触发$watch中的回调断言committing是不会抛出异常的
* 直接修改state的数据时，触发$watch的回调执行断言，这时committing为false，则会抛出异常

```js
function enableStrictMode(store) {
  store._vm.$watch(function() { return this._data.$$state }, () => {
    if(process.env.NODE_ENV !== 'production') {
      assert(store._committing, `Do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}

// Store的commit方法中，执行mutation的语句
this._withCommit(() => {
  entry.forEach(function commitIterator(handler) {
    handler(payload)
  })
})

// _withCommit的实现
_withCommit(fn) {
  const committing = this._committing
  // 调用withCommit修改state的值时会将store的committing值置为true
  this._committing = true
  fn()
  this._committing = committing
}
```

### Store提供的一些API

#### 1. commit(mutation) -- 调用mutation的commit方法

* commit方法会根据type找到并调用`_mutations`中的所有type对应的mutation方法
* 当没有`namespace`时，commit方法会触发所有module中的mutation方法
* 之后会执行`_subscribers`中的所有订阅者，提供给外部一个监视state变化的可能
* state通过mutation改变时，可以有效捕获这些变化

```js
commit(_type, _payload, _options) {
  const { type, payload, options } = unifyObjectStyle(_type, _payload, _options)
  const mutation = { type, payload }
  // 取出type对应的mutation的方法
  const entry = this._mutations[type]
  if(!entry) {
    if(process.env.NODE_ENV !== 'production') {
      console.error(`[]vuex] unknown mutation type: ${type}`)
    }
    return
  }
  // 执行mutation中的所有方法
  this._withCommit(() => {
    entry.forEach(function commitIterator(handler) {
      handler(payload)
    })
  })
  // 通知所有订阅者
  this._subscribers.forEach(sub => sub(mutation, this.state))

  if(
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type：${type}. Silent option has been removed.` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}

// 注册一个订阅函数，返回取消订阅的函数
subscribe(fn) {
  const subs = this._subscribers
  if(subs.indexOf(fn) < 0) {
    subs.push(fn)
  }
  return () => {
    const i = subs.indexOf(fn)
    if(i > -1) {
      subs.splice(i, 1)
    }
  }
}
```

#### 2. dispatch(action) -- 调用action的dispatch方法

```js
dispatch(_type, _payload) {
  const { type, payload } = unifyObjectStyle(_type, _payload)

  // actions中取出type对应的action
  const entry = this._actions[type]
  if(!entry) {
    if(process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] unknown action type: ${type}`)
    }
    return
  }
  // 是数组则包装Promise形成一个新的Promise，只有一个则返回第一个
  return entry.length > 1
  ? Promise.all(entry.map(handler => handler(payload)))
  : entry[0](payload)
}
```

* **遍历注册action**
    * 对push进`_actions`的action进行了一层封装
    * 1. 在进行dispatch的第一个参数中获取`state`、`commit`等方法
    * 2. 执行结果会被进行判断是否是Promise，不会则会将其转为Promise对象
    * 3. dispatch时则从`_actions`中取出，返回

```js
function registerAction(store, type, handler, local) {
  // 取出type对应的action
  const entry = store._actions[type] || (store._actions[type] = [])
  // 对push进_actions的action进行封装
  entry.push(function wrappedActionHandler(payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if(!isPromise(res)) {
      // 不是Promise对象时，转为Promise对象
      res = Promise.resolve(res)
    }
    if(store._devtoolHook) {
      // 存在devtool插件时触发vuex的error给devtool
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```

#### 3. watch -- 观察一个getter方法

```js
watch(getter, cb, options) {
  if(process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', `store.watch only accepts a function.`)
  }
  // _watcherVM是Vue实例-> 采用了Vue内部的watch特性提供的一种观察数据getter变动的方法
  return this._watcherVM.$watch(() => getter(this.state, this.getter), cb, options)
}
```

#### 4. registerModule -- 注册动态module

> 当业务进行异步加载时，可以通过该接口进行动态注册module

```js
registerModule(path, rawModule) {
  if(typeof path === 'string') path = [path]
  if(process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), `module path must be a string or an Array.`)
    assert(path.length > 0, `cannot register the root module by using registerModule.`)
  }
  // 注册
  this._modules.register(path, rawModule)
  // 初始化module
  installModule(this, this.state, path, this._modules.get(path))
  // 通过vm重设store，新建Vue对象使用Vue内部的响应式实现注册state以及computed
  resetStoreVM(this, this.state)
}
```

#### 5. unregisterModule -- 注销动态module

* 先从state中删除模块，然后重制store

```js
unregisterModule(path) {
  if(typeof path === 'string') path = [path]
  if(process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), `module path must be a string or an Array.`)
  }

  // 注销
  this._modules.unregister(path)
  this._withCommit(() => {
    // 获取父级的state
    const parentState = getNestedState(this.state, path.slice(0, -1))
    // 从父级中删除
    Vue.delete(parentState, path[path.length - 1])
  })
  // 重制store
  resetStore(this)
}
```

#### 6. resetStore -- 重置store

```js
function resetStore(store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  installModule(store, state, [], store._modules.root,true)
  resetStoreVM(store, state, hot)
}
```

### 插件 devtools

```js
// 从window对象的__VUE_DEVTOOLS_GLOBAL_HOOK__中获取devtool插件
const devtoolHook = 
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

export default function devtoolPlugin(store) {
  if(!devtoolHook) return

  // devtool插件实例存储在store的_devtoolHook上
  store._devtoolHook = devtoolHook

  // 触发vuex的初始化事件，并将store地址传给devtool插件，使插件获取store的实例
  devtoolHook.emit('vuex:init', store)

  // 监听travel-to-state事件
  devtoolHook.on('vuex:travel-to-state', targetState => {
    // 重制state
    store.replaceState(targetState)
  })

  // 订阅state的变化
  store.subscribe((mutation, state) => {
    devtoolHook.emit('vuex: mutation', mutation, state)
  })
}
```














