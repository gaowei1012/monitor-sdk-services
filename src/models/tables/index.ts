import { init_tb_msg_model, tb_msg } from './tb_msg'

export { tb_msg }

export function init_tb_model(sequelize) {
  init_tb_msg_model(sequelize)
}
