import { AuthenticationError } from "../errors";
import Token from "../utils/tokenService";

export const authenticate = async (req, res, next) => {
  const tokenService = new Token();
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) throw AuthenticationError.noToken();

    const payload = tokenService.verifyAccessToken(token);

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (error) {
    next(error);
  }
};
