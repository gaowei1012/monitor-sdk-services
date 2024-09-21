import { Model, DataTypes } from 'sequelize'

export class tb_error extends Model {}

export function init_tb_error_model(sequelize) {
    tb_error.init(
    {
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
      },
      errorMsg: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '错误信息'
      },
      errorInfo: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '详细错误详细'
      }
    },
    {
      sequelize,
      tableName: 'tb_error',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
}
