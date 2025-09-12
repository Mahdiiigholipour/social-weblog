import JWT from "jsonwebtoken";
import { env } from "../core/config/environment.config.js";
import crypto from "crypto";

export default class Token {
  constructor(
    accessTokenSecret,
    accessTokenExpires,
    refreshTokenHashSecret,
    refreshTokenExpiresDays
  ) {
    this.accessTokenSecret = accessTokenSecret || env.security.accessSec;
    this.accessTokenExp = accessTokenExpires || env.security.accessExp;
    this.refreshTokenHashSecret =
      refreshTokenHashSecret || env.security.refreshHashSec;
    this.refreshTokenExpDays =
      refreshTokenExpiresDays || env.security.refreshExp;
  }

  signAccessToken(user) {
    try {
      return {
        token: JWT.sign(
          { sub: user.id, role: user.role },
          this.accessTokenSecret,
          {
            expiresIn: this.accessTokenExp,
            jwtid: crypto.randomUUID(),
          }
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  verifyAccessToken(token) {
    return JWT.verify(token, this.accessTokenSecret);
  }

  genRefreshHash(providedRaw = null) {
    const raw = providedRaw || crypto.randomBytes(64).toString("hex");

    return {
      raw,
      hash: crypto
        .createHmac("sha256", this.refreshTokenHashSecret)
        .update(raw)
        .digest("hex"),
    };
  }

  getRefreshTokenExpiresAt() {
    return new Date(
      Date.now() + this.refreshTokenExpDays * 24 * 60 * 60 * 1000
    );
  }

  verifyRefreshHash(refreshToken, storedHash) {
    const computedHash = crypto
      .createHmac("sha256", this.refreshTokenHashSecret)
      .update(refreshToken)
      .digest("hex");

    return computedHash === storedHash;
  }

  autoSign(user, refreshToken = null) {
    const { token: accessToken } = this.signAccessToken(user);
    const { raw, hash } = this.genRefreshHash(refreshToken);

    return { accessToken, raw, hash };
  }
}
