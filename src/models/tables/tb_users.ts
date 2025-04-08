/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-08 11:50:55
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 11:51:20
 * @FilePath: /monitor-sdk-services/src/models/tables/tb_users.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model, DataTypes } from 'sequelize'

export class tb_users extends Model {}

export function init_tb_users_model(sequelize) {
  tb_users.init(
    {
      user_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '用户ID'
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '用户名称',
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '密码',
        validate: {
          len: [3, 64],
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'tb_users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
}
