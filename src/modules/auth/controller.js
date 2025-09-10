export default class AuthController {
  constructor(service) {
    this.service = service;
  }

  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await this.service.register({ username, password });
    } catch (error) {
      next(error);
    }
  }
}
