import { mysqlServer } from '@/config'
import { init_tb_model } from '@/models/tables'
import { Sequelize } from 'sequelize'

let sequelize = new Sequelize(mysqlServer)

sequelize
  .authenticate()
  .then(() => {
    let connectMsg = '成功链接数据库' + mysqlServer.host + ':' + mysqlServer.port + '/' + mysqlServer.database
    init_tb_model(sequelize)
    console.log('\x1b[32m%s\x1b[0m', connectMsg)
  })
  .catch((err) => {
    let connectError = '连接数据库' + mysqlServer.host + ':' + mysqlServer.port + '/' + mysqlServer.database + '出错' + err.message
    console.log('\x1b[31m%s\x1b[0m', connectError)
  })

export { sequelize }
