##### 什么是VNode？

> render function会被转化成VNode节点

* Virtual DOM
    > 一个结构类似于真实DOM的js对象
* 实现一个简单的**VNode**类，加入一些基本属性
```js
class VNode {
    constructor (tag, data, children, text, elm) {
        // 当前节点的标签名
        this.tag = tag;
        // 当前节点的一些数据信息
        this.data = data;
        // 当前节点的文本
        this.text = text;
        // 当前虚拟节点对应的真实DOM
        this.elm = elm;
    }
}
```

###### 栗子

1. Vue组件
```html
<template>
	<span class="demo" v-show="isShow">
		This is a span.
	</span>
</template>
```
2. 用js代码形式表示该Vue组件
```js
function render () {
    return new VNode(
    	'span',
    	{
            // 指令集合数组
            directives: [
                {
                    // v-show指令
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            // 静态class
            staticClass: 'demo'
    	},
    	[new VNode(undefined, undefined, undefined, 'This is a span.')]
    );
}
```
3. 转换成VNode
```js
{
    tag: 'span',
    data: {
        // 指令集合数组
        directives: [
            {
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        // 静态class
        staticClass: 'demo'
    },
    text: undefined,
    children: [
    	// 子节点是一个文本VNode节点
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

###### 生成常用VNode的方法封装

* 创建一个空节点
```js
function createEmpty VNode () {
    const node = new VNode();
    node.text = '';
    return node;
}
```
* 创建一个文本节点
```js
function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val));
}
```
* 克隆一个VNode节点
```js
function cloneVNode (node) {
    const cloneVnoed = new VNode(
    	node.tag,
    	node.data,
    	node.children,
    	node.text,
    	node.elm
    );
    return cloneVnode;
}
```

###### 总结

* VNode就是一个js对象，用js对象的属性来描述当前节点的一些状态，用VNode节点的形式模拟一棵Virtual DOM树
	

