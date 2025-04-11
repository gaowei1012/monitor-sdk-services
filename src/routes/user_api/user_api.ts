/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-08 11:44:29
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-11 10:16:03
 * @FilePath: /monitor-sdk-services/src/routes/user_api/user_api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from 'express'
import { Users } from '@/controller'
import {
  successBody,
  failBody,
  objectFilter,
  getUuidWithV4,
  redisUtil
} from '@/utils'
import { errorCode, redisServer } from '@/config'
import { tb_users } from '@/models/tables'
import { getRandom } from '@/utils'
import bcrypt from 'bcryptjs'

let usersInstance: Users

const router: express.Router = express()

router.use('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await tb_users.sync()
    usersInstance = new Users()
    next()
  } catch (error) {
    res.send(failBody(error.code))
  }
})

/**
 * 用户注册
*/
router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.username == '' || req.body.password == '') {
      res.send(failBody(errorCode.USERNAME_OR_PASSWORD_EMPTY))
    } else {
      const { username, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      req.body.password = bcrypt.hashSync(req.body.password, salt)
      const insertRes = await usersInstance.insert({
        username,
        password,
        user_id: getUuidWithV4()
      })
      const result = objectFilter(insertRes.dataValues, ['password'], true) // 过滤对象属性
      res.send(successBody('用户注册成功', result))
    }
  } catch (error) {
    res.send(failBody(error.code, error.message))
  }
})

/**
 * 用户登录
 */
router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.username == '' || req.body.password == '') {
      res.send(failBody(errorCode.USERNAME_OR_PASSWORD_EMPTY))
    } else {
      const { username, password } = req.body
      let findRes = await usersInstance.get({ username: username })
      let sessionID = getRandom(18)

      const userInfo = JSON.stringify({
        sessionID: sessionID,
        user_id: findRes.user_id,
        account: findRes.phone
      })
      // 生成的session有效期3天
      redisUtil
        .multi()
        .set(`${redisServer.redis_app_login_session}:${findRes.user_id}`, userInfo)
        .expire(`${redisServer.redis_app_login_session}:${findRes.user_id}`, 60 * 60 * 24 * 365)
        .exec(function (err, r) {
          if (err) {
            res.send(findRes(errorCode.LoginInfoIllegal, `登录失败,ERR${err.message}`))
          } else {
            objectFilter(findRes, ['password'], true) // 过滤对象属性
            res.send(successBody('登录成功', { token: findRes.user_id + '::' + sessionID, profile: findRes }))
          }
        })
    }
  } catch (error) {
    res.send(failBody(error.code, error.message))
  }
})


export default router