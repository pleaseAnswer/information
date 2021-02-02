// 工具函数
function def(obj, key, val, enumberable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumberable: !!enumberable,
    writabel: true,
    configurable: true
  })
}
// 拦截器
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  // 缓存原始方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    // 获取新增的元素
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if(inserted) ob.observeArray(inserted) // 侦测新增元素
    ob.dep.notify() // 向依赖发送消息
    return result
  })
})

/**
 * 尝试为value创建一个Observer实例；
 * 如果创建成功，直接返回新创建的Observer实例
 * 如果value已经存在一个Observer实例，则直接返回它
 * 避免重复侦测value变化
 * */
export function observe(value, asRootData) {
  if(!isObject(value)) {
    return
  }
  let ob
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

export class Observer {
  constructor(value) {
    this.value = value
    // 把Array的依赖存放在Observer中
    this.dep = new Dep()
    // 在拦截器中获取Observer实例
    def(value, '__ob__', this)
    if(Array.isArray(value)) {
      this.observeArray(value)
    } else {
        this.walk()
    }
  }
  // ...

  // 侦测Array中的每一项
  observeArray(items) {
    for(let i = 0, len = items.length; i < len; i++) {
      observe(items[i])
    }
  }
}
// 如何收集依赖
function defineReactive(data, key, val) {
  if(typeof val === 'object') new Observer(val)
  let dep = new Dep()
  // childOb即Observer实例
  let childOb = observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.depend()
      // 这里收集Array的依赖
      if(childOb) {
        childOb.dep.depend()
      }
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
