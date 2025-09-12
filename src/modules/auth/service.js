import { RefreshToken, User } from "../../database/models/index.js";
import { hashPassword } from "../../utils/passwordHashing.js";

export default class AuthService {
  constructor(userModel, token) {
    this.userModel = userModel;
    this.tokenService = token;
  }

  register = async (userData, reqData) => {
    // 1: user not exist [OK]
    // 2: hashing password [Ok]
    // 3: generate tokens

    await this.userModel.NotExist(userData.username);

    const hashedPassword = await hashPassword(userData.password);

    const user = await this.userModel.create({
      username: userData.username,
      passwordHash: hashedPassword,
    });

    const accessToken = this.tokenService.signAccessToken(user);
    const { raw, hash } = this.tokenService.genRefreshHash();

    await RefreshToken.create({
      userId: user.id,
      tokenHash: hash,
      expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
      createdByIp: reqData.ip,
      userAgent: reqData.userAgent,
    });

    return { userId: user.id, refreshToken: raw, accessToken };
  };
}
