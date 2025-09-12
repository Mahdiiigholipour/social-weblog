import { OPTIONS } from "../../utils/constants/Shared.js";

export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    const { username, password } = req.body;
    const reqData = { ip: req.ip, userAgent: req.get("User-Agent") };

    const result = await this.authService.register(
      { username, password },
      reqData
    );

    res.cookie("refreshToken", result.refreshToken, OPTIONS.cookieOptions);
    res.status(201).json({
      message: "User registered succussfully",
      userId: result.userId,
      accessToken: result.accessToken,
    });
  };

  login = async (req, res, next) => {
    const { username, password } = req.body;
    const reqData = {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    };

    const result = await this.authService.login(
      { username, password },
      reqData
    );

    res.cookie("refreshToken", result.refreshToken, OPTIONS.cookieOptions);
    res.status(200).json({
      message: "User login successfully",
      userId: result.userId,
      accessToken: result.accessToken,
    });
  };

  refresh = async (req, res, next) => {
    const raw = req.cookies.refreshToken;
    const reqData = { ip: req.ip, userAgent: req.get("User-Agent") };
    const result = await this.authService.refresh(raw, reqData);

    res.cookie("refreshToken", result.refreshToken, OPTIONS.cookieOptions);
    res.status(200).json({ accessToken: result.accessToken });
  };

  logout = async (req, res, next) => {
    const raw = req.cookies.refreshToken;

    await this.authService.logout(raw);

    res.clearCookie("refreshToken", OPTIONS.cookieOptions);
    res.status(200).json({ message: "Logged out" });
  };

  revokeAll = async (req, res, next) => {
    const userId = req.user.id;

    await this.authService.revokeAll(userId);

    res.clearCookie("refreshToken", OPTIONS.cookieOptions);
    res.status(200).json({ message: "Logged out from all sessions" });
  };
}
