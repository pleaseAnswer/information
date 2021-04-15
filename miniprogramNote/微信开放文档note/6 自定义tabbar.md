# 基础能力

## 自定义tabBar

* tabBar为自定义组件：推荐使用fixed在底部的cover-view+cover-image组件渲染样式，以保证tabBar层级相对较高
* 每个tab页下的自定义tabBar组件实例是不同的，可通过自定义组件下的getTabBar接口获取当前页面的自定义tabBar组件实例

### 使用流程

#### 1 配置信息

* 在 app.json 中的 tabBar 项指定 custom 字段。
* 所有 tab 页的 json 里需声明 usingComponents 项，也可以在 app.json 全局开启。

```js
{
  "tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [{
      "pagePath": "page/component/index",
      "text": "组件"
    }, {
      "pagePath": "page/API/index",
      "text": "接口"
    }]
  },
  "usingComponents": {}
}
```

#### 2 添加tabBar代码文件

> 在代码根目录下添加入口文件:

* custom-tab-bar/index.js
* custom-tab-bar/index.json
* custom-tab-bar/index.wxml
* custom-tab-bar/index.wxss

#### 3 编写tabBar代码