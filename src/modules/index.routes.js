import { Router } from "express";
import { default as AuthRouter } from "./auth/routes.js";

export const indexRouter = Router();

indexRouter.use("/auth", AuthRouter);
