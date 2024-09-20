import { errorCode } from '@/config'
import { DgError } from '@/helper'

/**
 * 判断接收验证码的手机号是否有效
 * @param hasPhone 手机号是否存在
 * @param type OTP类型：0注册，1：找回密码
 */
export function isValidRecivePhone(hasPhone: any, type: any) {
  console.log('isValidRecivePhone', hasPhone, type)
  switch (type) {
    case 0:
      if (hasPhone) throw new DgError(errorCode.DuplicatePhoneNumber, '该手机号已经注册!')
      break
    case 1:
      if (!hasPhone) throw new DgError(errorCode.phoneNumberNotFound, '手机号不存在!')
      break
    default:
      throw new DgError(errorCode.phoneNumberNotFound, '为指定短信类型!')
      break
  }
}

/**
 * 判断验证码是否合法，注册和找回的router中需要调用该方法
 * @param redis redis实例，由外部函数作为参数传入
 * @param phoneNumber 手机号
 * @param OTP 验证码
 */
export async function isValidOTP(redis: any, phoneNumber: string, OTP?: string) {
  if (OTP.length != 6) {
    throw new DgError(errorCode.OTPVerifyError, '验证失败，验证码格式错误！')
  }
  let hasOTP = await redis.get(`otp:${phoneNumber}`)
  if (hasOTP != OTP) {
    throw new DgError(errorCode.OTPVerifyError, '验证失败，验证码错误或已经过期')
  }
}
