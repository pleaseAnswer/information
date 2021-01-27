#### 文本复制 wx.setClipboardData

```js
var inviteName = this.data.copyData[0].url;
wx.setClipboardData({
    //准备复制的数据
    data: inviteName,
    success: function (res) {
      this.toastComponent.showToastComponent("复制成功")
    }
});
```

#### 实现分享到朋友圈

* 页面允许被分享到朋友圈，需满足两个条件：
  * 页面需设置“发送给朋友” --- **Page.onShareAppMessage**
  * 页面需设置允许“分享到朋友圈”，同时可自定义标题、分享图等 --- **Page.onShareTimeline**

```js
Page({
    // 第一步：设置可被分享
    onShareAppMessage(res) {
        return {
            title: '传统分享的标题'
        }
    },
    // 第二步：设置分享到朋友圈的标替
    onShareTimeline(res) {
        return {
            title: '转发到朋友圈',
            query: '我是携带的参数'
        }
    }
})
```

#### 人脸识别 wx.startFacialRecognitionVerify(OBJECT)

> 验证方式：在线验证 -- 读数字 屏幕闪烁

```js
/**
 * return 值
 * errMsg: String 错误信息
 * errCode：Number 错误码
 * verifyResult: String 本次认证结果凭证
*/
wx.startFacialRecognitionVerify({
    name: String, // 必填
    idCardNumber: String, // 必填
    success: Function,
    fail: Function,
    complete: Function, // 必填
    // 0-读数字 1- 反光 2-检查是否支持反光
    checkAliveType: Number
})
```

#### 小程序内跳转至其他小程序 wx.navigateToMiniProgram(Object object)

```js
wx.navigateToMiniProgram({
    appId: string, // 必填--要打开的小程序appId
    path: string, // 打开的页面路径，为空则打开首页
})
```
#### 长按识别二维码

* image标签设置**show-menu-by-longpress**属性为true