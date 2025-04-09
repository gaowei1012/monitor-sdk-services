/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2024-09-20 16:48:55
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-09 13:59:27
 * @FilePath: /monitor-sdk-services/src/routes/msg_api/msg_api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    const { page, size } = req.query
    const pageNum = Number(page) || 1
    const pageSize = Number(size) || 10
    const result = await msgInstance.getAll({}, [], [['created_at', 'DESC']], pageNum, pageSize)
    res.send(successBody('获取列表成功', result))
  } catch (err) {
    res.send(failBody(err.code, '获取列表失败'))
  }
})

export default router
