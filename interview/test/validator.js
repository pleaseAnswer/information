class Validator {
    // 存放 -- 所有规则校验的结果
    validateResult = []
    // 存放 -- 所有的校验规则
    rules = {
      isEmpty: function(value, errMsg) {
        if(!value) {
          return errMsg
        }
      },
      maxLength: function(value, length, errMsg) {
        if(value.trim().length > length) {
          return errMsg
        }
      }
    }
    /**
     * value：要校验的值
     * rules：该值要用到哪些校验规则
     * this.payAccount, [{ rule: 'isEmpty', errMsg: '付款卡号不能为空' },{ rule: 'maxLength: 12', errMsg: '付款卡号不能超过12个字符' }]
     */ 
    check(value, rules) {
      for(let i = 0; i < rules.length; i++) {
        let oRule = rules[0]
        let ruleArr= oRule.rule.split(':') // [ isEmpty ] | [maxLength, 12]
        let errMsg = oRule.errMsg // '付款卡号不能为空' | '付款卡号不能超过12个字符'
        let rule = ruleArr.shift() // isEmpty | maxLength
        ruleArr.unshift(value) // [ payAccount] | [payAccount, 12]
        ruleArr.push(errMsg) // [ payAccount, '付款卡号不能为空'] | [payAccount, 12, '付款卡号不能超过12个字符']
        // 遍历规则后，将结果扔进数组
        this.validateResult.push(
          this.rules[rule].appay(value, ruleArr)
        )
      }
    }
  
    // 遍历结果数组，若有值，则返回错误提示信息
    checkResult() {
      for(let i = 0; i < validateResult.length; i++) {
        let errMsg = this.validateResult[i]
        if (errMsg) return errMsg
      }
    } 
  }
  export {
    Validator
  }