const interfaces = require("os").networkInterfaces();

let IPAddress = "";
for (var devName in interfaces) {
  var iface = interfaces[devName];
  for (var i = 0; i < iface.length; i++) {
    var alias = iface[i];
    if (
      alias.family === "IPv4" &&
      alias.address !== "127.0.0.1" &&
      !alias.internal
    ) {
      IPAddress = alias.address;
    }
  }
}

const config = {
  port: 5200,
  host: IPAddress,
  database: {
    DATABASE: "monitor",
    USERNAME: "root",
    PASSWORD: "961204",
    PORT: 3306,
    HOST: "localhost",
    // HOST: '115.159.158.244'
  },
  redisbase: {
    PORT: 6379,
    HOST: "127.0.0.1",
  },
  token: {
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,
    jwtSecret: "jwtSecret",
  },
  version: "v0.1.0",
  corsOrigins: ["http://localhost:1204"],
  wx: {
    appId: "wxe55d00325d1e7da5",
    appSecrent: "24c96917f0d247932d755c8812c86583",
  },

  // 成功状态
  SuccessCode: 200,
  // 用户名错误
  DuplicateUsername: 422,
  // 手机号码不正确
  DuplicatePhoneNumber: 423,
  phoneNumberNotFound: 424,

  // 查询失败
  DbFindError: 501,
  // 更新失败
  DbUpdateError: 502,
  // 删除失败
  DbDeleteError: 515,
  // 图片上传失败
  FileUploadError: 503,
  ContractRpcError: 504,
  RequestRpcError: 505,
  DbInsertError: 506,
  // token 错误
  jwtExpiredError: 507,
  jwtFlourish: 508,
  jwtInvalidError: 509,
  // redis 错误
  redisStopWorkingError: 510,
  transactionError: 511,
  rollbackError: 513,
  paramterError: 514,

  // 捕获异常
  catchError: 516,

  UserLoginErr: 517,
  DbkeyErr: 518,

  LoginInfoIllegal: 601,
  UserSessionIllegal: 602,
  ProductIllegal: 603,
  TagNotEnough: 604,
  InheritLabelsFail: 605,
  UserAlreadyExists: 606,
  UserAccessLimitedError: 607,
  DbInfoRepeat: 608,
  DataIllegal: 609,
  collectionNotExist: 610,
  blockchainError: 611,
  InvalidPermission: 612,
  NotFoundUser: 613,

  // 超时错误
  timeOut: 4000,

  // 定义未传递
  NotEmpty: 41010,
};

export { config };
