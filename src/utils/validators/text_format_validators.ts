import validator from 'validator'
import { DgError } from '@/helper'
import { errorCode } from '@/config'

export default {
  isMobilePhone: (phone) =>{
    console.log('phone', phone)
    if (!validator.isMobilePhone(phone, 'zh-CN'))
    throw new DgError(errorCode.phoneFormatError, '手机号格式错误')
  },

  isEmial: (email) => {
    if (!validator.isEmail(email)) 
    throw new DgError(errorCode.emailFormatError, '邮箱格式错误')
  },

  isIdentityCard: (str) => {
    if (!validator.isIdentityCard(str, 'zh-CN'))
    throw new DgError(errorCode.IdCardFormatError, '身份证格式错误')
  }
}