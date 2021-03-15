#### 小程序接口入参使用formdata格式

##### 引进js文件

> `const FormData = require('./infomation/formData.js')`

```js
function loanAdd(filePath, params, cb) {
  var {name, sex, idCard, birthday, location, homeOwnership, familyAddress, phone, zipCode, guaranteeType} = params;
  
  let formData = new FormData();

  formData.append('name', name);
  formData.append('sex', sex);
  formData.append('idCard', idCard);

  if(birthday) formData.append('birthday', birthday);
  if(location) formData.append('location', location);
  if(homeOwnership) formData.append('homeOwnership', homeOwnership); 
  if(familyAddress) formData.append('familyAddress', familyAddress); 
  if(phone) formData.append('phone', phone);
  if(zipCode) formData.append('zipCode', zipCode);
  if(guaranteeType) formData.append('guaranteeType', guaranteeType);
  filePath.map(item => {
    formData.appendFile('fileList', item);
  })

  let data = formData.getData();

  wx.request({
    url: urlSet.loanAdd,
    header: {
      "content-type": data.contentType,
      "Authorization": wx.getStorageSync(common.CC_TICKET)
    },
    method: 'post',
    data: data.buffer,
    success: function (res) {
      var code = res.data.code;
      var msg = res.data.msg;
      //添加超时拦击判断
      if (util.checkTokenInvalid(code)) {
        return typeof cb == "function" && cb("修改失败！", false);
      }
      if (code != null && code == "0") {
        return typeof cb == "function" && cb('修改成功!', res.data)
      } else {
        return typeof cb == "function" && cb(msg ? msg : "修改失败！", false)
      }
    },
    fail: function (e) {
      console.log(e)
      return typeof cb == "function" && cb('修改失败！', false)
    }
  })
}
```