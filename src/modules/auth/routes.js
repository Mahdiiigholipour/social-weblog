import { Router } from "express";
import AuthController from "./controller.js";
import AuthService from "./service.js";
import { User } from "../../database/models/index.js";

const Service = new AuthService(User);
const Controller = new AuthController(Service);

export const router = Router();

router.post("/register", Controller.register);
