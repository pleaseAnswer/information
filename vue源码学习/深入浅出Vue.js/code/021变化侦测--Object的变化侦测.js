// Dep类--专门管理依赖
export class Dep {
  constructor() {
    this.subs = []
  }
  addSubs(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  depend() {
    if(window.target) {
      this.addSubs(window.target)
    }
  }
  notify() {
    const subs = this.subs.splice()
    for(let i = 0, len = subs.length; i < len; i++) {
      subs[i].update()
    }
  }
}
function reomve(arr, item) {
  if(arr.length) {
    const index = arr.indexOf(item)
    if(index > -1) {
      return arr.splice(arr, index)
    }
  }
}

// Watcher就是依赖
export class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }
  get() {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }
  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}
const bailRE = /[^\w.$]/
export function parsePath(path) {
  if(bailRE.test(path)) return
  const segments = path.split('.')
  return function(obj) {
    for(let i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
// Observer--递归侦测所有key
export class Observer {
  constructor(value) {
    this.value = value
    if(!Array.isArray(value)) {
      this.walk()
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for(let i = 0, len = keys.length; i < len; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}
// 使用Object.defineProperty实现变化侦测原理
function defineReactive(data, key, val) {
  if(typeof val === 'object') {
    new Observer(val)
  }
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.depend()
      return val
    },
    set: function(newVal) {
      if(val === newVal) {
        return
      }
      dep.notify()
      val = newVal
    }
  })
}