import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandler, NotFoundError } from "./errors/index.js";
import dbConnection from "./database/config/connection.js";
import { SetupSwagger } from "./docs/swagger.js";
import { indexRouter } from "./modules/index.routes.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to database
await dbConnection.connect();

//Setup routes
app.use("/api", indexRouter);

//Setup swagger
app.use("/api-docs", ...SetupSwagger);
app.get("/", (req, res) => res.send("Hello world"));

// 404 handler
app.use((req, res, next) => next(new NotFoundError("Endpoint")));

// Global error handler
app.use((error, req, res, next) => ErrorHandler.handleError(error, req, res));
export default app;
