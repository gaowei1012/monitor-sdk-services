/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2024-06-09 22:37:45
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 11:51:49
 * @FilePath: /monitor-sdk-services/src/models/tables/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { init_tb_msg_model, tb_msg } from './tb_msg'
import { init_tb_error_model, tb_error } from './tb_error'
import { init_tb_users_model, tb_users } from './tb_users'

export { tb_msg, tb_error, tb_users }

export function init_tb_model(sequelize) {
  init_tb_msg_model(sequelize),
  init_tb_error_model(sequelize),
  init_tb_users_model(sequelize)
}
