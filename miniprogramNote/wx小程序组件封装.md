# 微信小程序组件封装

* 类似于页面，一个自定义组件由 json wxml wxss js 4个文件组成

## 1.在json文件中做自定义组件声明

```json
{
    "component": true
}
```

## 2.在wxml文件中编写组件模板，在wxss文件中加入组件样式

```html
<view class="inner">
    {{innerText}}
</view>
<slot></slot>
```

```css
/*
 * 这里的样式只应用于这个自定义组件
 * 注意：在组件wxss中不应该使用id选择器、属性选择器和标签名选择器
 */
.inner {
    color: red;
}
```

## 3.在自定义组件的js文件中，需要使用Component()来注册组件，并提供组件的属性定义、内部数据和自定义方法

```js
Component({
    // 组件的对外属性，是属性名到属性设置的映射表
    // 属性设置可包含三个字段
    properties: {
        innerText: {
            // 类型（必填）String Number Boolean Object Array null
            type: String,
            // 属性初始值（可选）
            value: '',
            // 属性被改变时执行的函数（可选）
            observer(newVal, oldVal, changePath) {
                //
            }
        },
        myProperty2: String
    },

    // 私有数据，供组件内部使用，可用于模板渲染
    data: {},

    // 组件的方法列表
    methods: {
        // 内部方法建议以下划线开头
    }
})
```

## 4.使用自定义组件

### 1.在json文件中进行引用声明

```json
{
    "usingComponents": {
        "component-tag-name": "path/component"
    }
}
```

### 2.在页面的wxml中就可以像使用基础组件一样使用

```html
<view>
    <component-tag-name inner-text="some text"></component-tag-name>
</view>
```

## 注意

* 因为 wxml 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。
* 自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用usingComponents 字段）。
* 自定义组件和页面所在项目根目录名不能以“wx-”为前缀，否则会报错。
