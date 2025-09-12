import { Router } from "express";
import AuthController from "./controller.js";
import AuthService from "./service.js";
import { RefreshToken, User } from "../../database/models/index.js";
import Token from "../../utils/tokenService.js";
import ErrorHandler from "../../errors/ErrorHandler.js";
import { authenticate } from "../../middlewares/authenticate.js";

const Handle = ErrorHandler.asyncHandler;
const tokenService = new Token();
const Service = new AuthService(User, tokenService, RefreshToken);
const Controller = new AuthController(Service);

export const router = Router();

router.post("/register", Handle(Controller.register));
router.post("/login", Handle(Controller.login));
router.post("/refresh", authenticate, Handle(Controller.refresh));
router.post("/logout", authenticate, Handle(Controller.logout));
router.post("/logoutAll", Handle(Controller.revokeAll));
