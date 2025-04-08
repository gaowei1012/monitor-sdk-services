/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2024-06-09 22:37:45
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 12:04:03
 * @FilePath: /monitor-sdk-services/src/routes/registerRouter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import index from './index'
import { msg_api } from './msg_api/index'
import { error_api } from './error_api/index'
import { config } from '../config'
import { user_api } from './user_api/index'
import _ from 'lodash'

function open_api_register(app, ...routes) {
  _.each(routes, (router) => {
    app.use(`/api/${config.version}`, router)
  })
}

// function auth_api_register(app, ...routes) {
//   _.each(routes, (router) => {
//     app.use(`/apis/${config.version}/auth`, router)
//   })
// }

function setRoutes(app): void {
  open_api_register(app, [msg_api, error_api, user_api])
}

export default setRoutes
