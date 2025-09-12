import { RefreshToken, User } from "../../database/models/index.js";
import { AuthenticationError } from "../../errors/index.js";
import { hashPassword, verifyPassword } from "../../utils/passwordHashing.js";

export default class AuthService {
  constructor(userModel, token, tokenModel) {
    this.userModel = userModel;
    this.tokenModel = tokenModel;
    this.tokenService = token;
  }

  register = async ({ username, password }, reqData) => {
    await this.userModel.NotExist(username);

    // Create user
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      username: username,
      passwordHash: hashedPassword,
    });

    // Generate accessToken and create refreshToken
    const { accessToken, raw, hash } = this.tokenService.autoSign(user);

    await this.tokenModel.create({
      userId: user.id,
      tokenHash: hash,
      expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
      createdByIp: reqData.ip,
      userAgent: reqData.userAgent,
    });

    return { userId: user.id, refreshToken: raw, accessToken };
  };

  login = async ({ username, password }, reqData) => {
    // Check user exist
    const user = await User.findOne({ where: { username: username } });
    if (!user) throw new AuthenticationError.invalidCredentials();

    // Check password
    const isCorrect = await verifyPassword(password, user.hashedPassword);
    if (!isCorrect) throw new AuthenticationError.invalidCredentials();

    // Process Tokens
    const { accessToken, raw, hash } = this.tokenService.autoSign(user);
    await this.tokenModel.create({
      userId: user.id,
      tokenHash: hash,
      expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
      createdByIp: reqData.ip,
      userAgent: reqData.userAgent,
    });

    return { accessToken, refreshToken: raw };
  };
}
