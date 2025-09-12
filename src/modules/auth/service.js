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
    await this.userModel.NotExist(username.toLowerCase());

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
    const user = await User.findOne({
      where: { username: username.toLowerCase() },
    });
    if (!user) throw AuthenticationError.invalidCredentials();

    // Check password
    const isCorrect = await verifyPassword(password, user.passwordHash);

    if (!isCorrect) throw AuthenticationError.invalidCredentials();

    // Process Tokens
    const { accessToken, raw, hash } = this.tokenService.autoSign(user);
    await this.tokenModel.create({
      userId: user.id,
      tokenHash: hash,
      expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
      createdByIp: reqData.ip,
      userAgent: reqData.userAgent,
    });

    return { userId: user.id, accessToken, refreshToken: raw };
  };

  refresh = async (raw, reqData) => {
    if (!raw) throw AuthenticationError.noToken();

    const { hash } = this.tokenService.genRefreshHash(raw);
    const tokenRecord = await this.tokenModel.findByHash(hash);

    if (tokenRecord.revoked) {
      await this.tokenModel.revokeUserTokens(tokenRecord.userId);
      console.log("reuse detected!");
      throw AuthenticationError.invalidToken();
    }

    if (tokenRecord.expiresAt < new Date())
      throw AuthenticationError.tokenExpired();

    const { raw: newRaw, hash: newHash } = this.tokenService.genRefreshHash();
    const newRec = await this.tokenModel.create({
      userId: tokenRecord.userId,
      tokenHash: newHash,
      expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
      createdByIp: reqData.ip,
      userAgent: reqData.userAgent,
    });

    await tokenRecord.update({
      revoked: true,
      revokedByIp: reqData.ip,
      replacedBy: newRec.id,
    });

    const user = await this.userModel.findById(tokenRecord.userId);
    const { token: access } = this.tokenService.signAccessToken(user);

    return { refreshToken: newRaw, accessToken: access };
  };

  logout = async (raw, reqData) => {
    if (raw) {
      const { hash } = this.tokenService.genRefreshHash(raw);
      await this.tokenModel.update(
        { revoked: true, revokedByIp: reqData.ip },
        { where: { tokenHash: hash } }
      );
    }
    return true;
  };

  revokeAll = async (userId) => {
    await this.tokenModel.revokeUserTokens(userId);
  };
}
