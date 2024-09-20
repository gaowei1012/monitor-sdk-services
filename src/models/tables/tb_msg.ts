import { Model, DataTypes } from 'sequelize'

export class tb_msg extends Model {}

export function init_tb_msg_model(sequelize) {
  tb_msg.init(
    {
    //   msg_id: {
    //     allowNull: true,
    //     type: DataTypes.STRING(60),
    //     comment: '任务分类类型ID',
    //   },
      platform: {
        allowNull: false,
        type: DataTypes.STRING(64),
        comment: '平台类型'
      },
      os: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '设备型号'
      },
      lang: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '语言类型'
      },
      ov: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '系统版本号'
      },
      vr: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '应用版本号'
      },
      device_info: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '设备标识'
      },
      dt: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '设备标识'
      },
      start_time: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: '设备标识'
      },
      path: {
        type: DataTypes.STRING(62),
        allowNull: false,
        comment: '设备标识'
      }
    },
    {
      sequelize,
      tableName: 'tb_msg',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
}
