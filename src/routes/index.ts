import express from 'express'
import { redisServer } from '@/config'
import { failBody, redisUtil, authValidator } from '@/utils'

const router: express.Router = express()

router.use('/auth', async function (req: any, res: express.Response, next) {
  try {
    const sessionid = req.headers['sessionid'] ? req.headers['sessionid'] : ''
    const sessionArr = sessionid.split('::')
    const userId = sessionArr[0]
    const sessionId = sessionArr[1]
    const userInfo = await redisUtil.get(`${redisServer.redis_app_login_session}:${userId}`)
    authValidator.isValidSessionId(userInfo, sessionId)
    req.payload = JSON.parse(userInfo)
    next()
  } catch (err) {
    res.send(failBody(err.code, err.message))
  }
})

export default router
