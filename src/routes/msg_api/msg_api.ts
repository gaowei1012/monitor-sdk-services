import { successBody, failBody } from '@/utils'
import { tb_msg } from '@/models/tables'
import { Msg } from '@/controller'
import express from 'express'

let msgInstance: Msg

const router: express.Router = express()

router.use('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    await tb_msg.sync()
    msgInstance = new Msg()
    next()
  } catch (err) {
    res.send(failBody(err.code))
  }
})

// 统计数据
router.post('/msg/upload', async function (req: express.Request, res: express.Response) {
  try {
    const parseBody = req.body ? JSON.parse(req.body['msg']) : ''
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
        path: parseBody['options']['path']
      }
      const result = await msgInstance.insert(body)
      res.send(successBody('统计数据成功', result))
    }
  } catch (err) {
    res.send(failBody(err.code, '统计数据失败'))
  }
})

router.get('/msg/list', async function (req: express.Request, res: express.Response) {
  try {
    const result = await msgInstance.getAll({})
    res.send(successBody('获取列表成功', result))
  } catch (err) {
    res.send(failBody(err.code, '获取列表失败'))
  }
})

export default router
