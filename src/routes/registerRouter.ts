// import index from './index'
import { msg_api } from './msg_api/index'
import { config } from '../config'
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
  open_api_register(app, [msg_api])
}

export default setRoutes
