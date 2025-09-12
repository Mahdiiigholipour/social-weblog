import { Router } from "express";
import AuthController from "./controller.js";
import AuthService from "./service.js";
import { User } from "../../database/models/index.js";
import Token from "../../utils/tokenService.js";

const tokenService = new Token();
const Service = new AuthService(User, tokenService);
const Controller = new AuthController(Service);

export const router = Router();

router.post("/register", Controller.register);
