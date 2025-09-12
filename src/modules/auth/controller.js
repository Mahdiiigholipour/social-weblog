import { OPTIONS } from "../../utils/constants.js";

export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      console.log(req.cookies.refreshToken);
      const userData = {
        username: req.body.username,
        password: req.body.password,
      };
      const reqData = { ip: req.ip, userAgent: req.get("User-Agent") };
      const result = await this.authService.register(userData, reqData);

      res.cookie("refreshToken", result.refreshToken, OPTIONS.cookieOptions);
      res.status(201).json({
        message: "User registered succussfully",
        userId: result.userId,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
