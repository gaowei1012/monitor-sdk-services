require('express-async-errors')
require('module-alias/register')
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import setRoutes from './routes/registerRouter'
import { failBody } from './utils'
import { config } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

const app: express.Application = express()

app.set('port', process.env.PORT || config.port)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(
  express.urlencoded({
    limit: '15mb',
    extended: true,
  })
)
// 解析body参数
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const corsOptions = {
//   origin: config.corsOrigins,
//   credentials: true,
//   maxAge: 1728000,
//   //这一项是为了跨域专门设置的
// }

app.use(cors())

setRoutes(app)

app.use(function (req, res, next) {
  next(createError(404))
})

// 如果在接口内有try{}catch{}将无法捕获err
app.use(function (err: any, req: any, res: any, next: any) {
  res.send(failBody(err.code, err.message))
  next()
})

const http = require('http').Server(app)
http.listen(app.get('port'), '0.0.0.0', function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
