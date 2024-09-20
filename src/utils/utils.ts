import { v4 as uuidv4 } from 'uuid'

export function failBody(statusCode: number, message?: string, data?: any) {
  if (message === void 0) message = ''
  if (data === void 0) data = null
  return {
    success: false,
    statusCode: statusCode ? statusCode : 99999,
    message: message,
    data: data
  }
}

export function successBody(message: string, data?: any, extra?: any) {
  if (message === void 0) message = ''
  if (data === void 0) data = {}
  return {
    success: true,
    statusCode: 200,
    message: message,
    data: data,
    ...extra
  }
}

export function getTimeStamp() {
  return new Date().getTime()
}

export function getUuidWithV4() {
  return uuidv4()
}

export function getUserId(req) {
  const sessionid = req.headers['sessionid'] ? req.headers['sessionid'] : ''
  const sessionArr = sessionid.split('::')
  const userId = sessionArr[0]
  return userId
}

export const isDateIntersection = () => {
  return null
}

/**
 * 过滤对象中的假值
 * @param obj 目标对象
 * @returns 
 */
export const filteredObj = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}
