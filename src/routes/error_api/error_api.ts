import { successBody, failBody } from '@/utils'
import { tb_error } from '@/models/tables'
import { Error } from '@/controller'
import express from 'express'

let errorInstance: Error

const router: express.Router = express()

router.use('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    await tb_error.sync()
    errorInstance = new Error()
    next()
  } catch (err) {
    res.send(failBody(err.code))
  }
})

// 错误统计
router.post('/error/upload', async function (req: express.Request, res: express.Response) {
  try {
    const parseBody = req.body ? JSON.parse(req.body['msg']) : ''
    console.log("parseBody", parseBody);
    if (parseBody) {
      const body = {
        dt: parseBody['dt'],
        start_time: parseBody['start_time'],
        os: parseBody['h']['os'],
        platform: parseBody['h']['platform'],
        lang: parseBody['h']['lang'],
        ov: parseBody['h']['ov'],
        vr: parseBody['h']['vr'],
        device_info: parseBody['h']['device_info'],
        path: parseBody['options']['path'],
        errorMsg: parseBody['options']['errorMsg'],
        errorInfo: parseBody['options']['errorInfo'] ? JSON.stringify(parseBody['options']['errorInfo']).replace(/\s+/g, "").substring(0, 499) : ''
      }
      const result = await errorInstance.insert(body)
      res.send(successBody('收集错误成功', result))
    }
  } catch (err) {
    res.send(failBody(err.code, '收集错误失败'))
  }
})

router.get('/error/list', async function (req: express.Request, res: express.Response) {
  try {
    const result = await errorInstance.getAll({})
    res.send(successBody('获取列表成功', result))
  } catch (err) {
    res.send(failBody(err.code, '获取列表失败'))
  }
})

export default router
