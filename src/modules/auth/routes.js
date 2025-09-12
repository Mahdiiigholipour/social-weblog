import { Router } from "express";
import AuthController from "./controller.js";
import AuthService from "./service.js";
import { RefreshToken, User } from "../../database/models/index.js";
import Token from "../../utils/tokenService.js";
import ErrorHandler from "../../errors/ErrorHandler.js";

const Handle = ErrorHandler.asyncHandler;
const tokenService = new Token();
const tokenModel = new RefreshToken();
const Service = new AuthService(User, tokenService, tokenModel);
const Controller = new AuthController(Service);

export const router = Router();

router.post("/register", Handle(Controller.register));
router.post("/login", Handle(Controller.login));
