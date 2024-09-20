import { DgError } from "@/helper";
import { errorCode } from "@/config";
import bcrypt from "bcryptjs";

export default {
  //判断Token是否合法
  isValidSessionId: (userInfo, sessionID) => {
    console.log('isValidSessionId', userInfo, sessionID)
    if (!userInfo) {
      throw new DgError(errorCode.SessionNotFoundError, "未找到登陆信息，请重新登陆");
    }
    if (JSON.parse(userInfo).sessionID !== sessionID) {
      throw new DgError(errorCode.SessionInvalidError, "会话非法，会话被服务器拒绝");
    }
  },
  //判断登录信息是否合法
  isValidLoginInfo: (accountInfo, password) => {
    if (!accountInfo) {
      throw new DgError(errorCode.UsernameNotFound, "用户名不存在!");
    }
    if (!bcrypt.compareSync(password, accountInfo.password)) {
      throw new DgError(errorCode.PasswordError, "密码错误!");
    }
    if (accountInfo.is_active === 0) {
      throw new DgError(errorCode.AccountDisable, "账户已被禁用，请联系业务经理!");
    }
  },
};
