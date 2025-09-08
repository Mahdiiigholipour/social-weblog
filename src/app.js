import express from "express";
import { ErrorHandler, NotFoundError } from "./errors/index.js";
import dbConnection from "./database/config/connection.js";

const app = express();

//Connect to database
await dbConnection.connect();
app.get("/", (req, res) => res.send("Hello world"));

// 404 handler
app.use((req, res, next) => next(new NotFoundError("Endpoint")));

// Global error handler
app.use((error, req, res, next) => ErrorHandler.handleError(error, req, res));
export default app;
