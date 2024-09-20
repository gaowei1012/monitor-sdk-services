import _ from 'lodash'

/**
 * 过滤对象属性
 * @param obj 传入对象
 * @param args 需要过滤的key
 * @param exclude 是否使用排除策略
 * @returns
 */
export function objectFilter(obj: any, args: any, exclude?: boolean) {
  return _.reduce(
    args,
    (result: any, value, key) => {
      if (!exclude) {
        result[value] = obj[value]
      } else {
        delete obj[value]
        result = obj
      }
      return result
    },
    {}
  )
}
