export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
      };
      const reqData = { ip: req.ip, userAgent: req.get("User-Agent") };
      const result = await this.authService.register(userData, reqData);

      res.status(201).json({
        message: "User registered succussfully",
        userId: result.userId,
        refreshToken: result.refreshToken,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
