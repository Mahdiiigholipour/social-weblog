export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await this.authService.register({ username, password });
      res.status(201).json({ message: "created.", userId: result.id });
    } catch (error) {
      next(error);
    }
  };
}
