# 人脸识别

## 1 能力背景

* 调用人脸核身的小程序 其主体以及类目需要在限定的类目范围内，且与小程序的业务场景一致

## 2 准备接入

* 申请接口

## 3 接口文档

* wx.startFacialRecognitionVerify(OBJECT)
* 功能：请求进行基于生物识别的人脸核身
* 验证方式：在线验证 -- 读数字 屏幕闪烁

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

```js
export function startFacialRecognitionVerify(data,callBack) {
  let mune = {
    10001: '参数错误',
    10002: '人脸特征检测失败',
    10003: '身份证号不匹配',
    10004: '比对人脸信息不匹配',
    10005: '环境光线太亮',
    10006: 'appid没有权限（后台验证部分）',
    10007: '后台获取图片失败',
    10008: '比对系统失败',
    10009: '未查到身份证照片比对源',
    10010: '照片质量不满足比对要求',
    10015: '比对服务暂时不可用',
    10016: '存储用户图片失败',
    10017: '非法identify_id',
    10018: '用户信息不存在',
    10020: '认证超时',
    10022: '重复的请求，返回上一次的结果',
    10026: '用户身份证数据不在比对数据库中',
    10027: '语音识别失败',
    10028: '唇动检测失败',
    10031: '公众号/小程序没有设置昵称',
    10040: '请求数据编码不对，必须是UTF8编码',
    10041: '非法user_id_key',
    10042: '请求过于频繁，稍后再重试',
    10045: '系统失败',
    10052: '请求数超限制',
    10057: '请求数超限制',
    10066: '人脸流水号bioid重复',
    10069: '活体检测暂时不可用',
    90100: '用户取消',
    90101: '用户未授权',
    90102: '底层库出错',
    90103: 'CDN上传出错',
    90104: '获取配置信息出错',
    90105: '获取确认页信息失败',
    90106: '相机初始化失败',
    90107: '用户采集人脸超时',
    90108: '用户采集过程中抖动太剧烈',
    90109: '设备不支持人脸采集',
    90199: '未知错误',
  }
  // 检查是否支持反光 -- 支持则使用反光 不支持则调用微信自带判断
  wx.checkIsSupportFacialRecognition({
    checkAliveType: 1,
    success:function(res) {
      if(res.errcode == 0 || res.errMsg == 'checkIsSupportFacialRecognition:ok') {
        let cb = {
          ...data,
          success(){
            callBack("人脸识别成功",true)
          },
          fail(res){
            let msg = res.errMsg
            if(res.errCode) {
              let tip = mune[res.errCode];
              msg = `人脸核身失败(${tip})，请稍后重试`
            }
            callBack(msg,false)
          }
        }
        wx.startFacialRecognitionVerifyAndUploadVideo(cb)
        return
      } else {
        data.checkAliveType = 2
        let cb = {
          ...data,
          success(){
            callBack("人脸识别成功",true)
          },
          fail(res){
            let msg = res.errMsg
            if(res.errCode) {
              let tip = mune[res.errCode];
              msg = `人脸核身失败(${tip})，请稍后重试`
            }
            callBack(msg,false)
          }
        }
        wx.startFacialRecognitionVerifyAndUploadVideo(cb)
        return
      }
    },
    fail: res => {
      wx.showToast('微信版本过低')
    }
  })
}
```
