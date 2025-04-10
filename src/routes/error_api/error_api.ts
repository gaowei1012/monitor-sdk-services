/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2024-09-21 14:02:01
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-10 19:02:04
 * @FilePath: /monitor-sdk-services/src/routes/error_api/error_api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    // console.log('parseBody', parseBody)
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
        errorInfo: parseBody['options']['errorInfo']
          ? JSON.stringify(parseBody['options']['errorInfo']).replace(/\s+/g, '').substring(0, 499)
          : ''
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
    const { page, size } = req.query
    const pageNum = Number(page) || 1
    const pageSize = Number(size) || 10
    const result = await errorInstance.getAll({}, [], [['created_at', 'DESC']], pageNum, pageSize)
    res.send(successBody('获取列表成功', result))
  } catch (err) {
    res.send(failBody(err.code, '获取列表失败'))
  }
})

export default router
