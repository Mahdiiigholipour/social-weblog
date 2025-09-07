import express from "express";
import { ErrorHandler, NotFoundError } from "./errors/index.js";
import models, { sequelize } from "./database/models/index.js";

const app = express();

app.get("/", (req, res) => res.send("Hello world"));

// 404 handler
app.use((req, res, next) => next(new NotFoundError("Endpoint")));

// Global error handler
app.use((error, req, res, next) => ErrorHandler.handleError(error, req, res));
export default app;
