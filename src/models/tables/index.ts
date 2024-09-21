import { init_tb_msg_model, tb_msg } from './tb_msg'
import { init_tb_error_model, tb_error } from './tb_error'

export { tb_msg, tb_error }

export function init_tb_model(sequelize) {
  init_tb_msg_model(sequelize),
  init_tb_error_model(sequelize)
}
