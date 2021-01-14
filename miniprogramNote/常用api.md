##### 文本复制 setClipboardData

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
