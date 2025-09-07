import { ApiError } from "./ApiError.js";
import { DatabaseError } from "./errorTypes/DatabaseError.js";
import { ValidationError } from "./errorTypes/ValidationError.js";
import { env } from "../core/config/environment.config.js";
import { EnvironmentVariableError } from "./errorTypes/EnvironmentVariableError.js";

export class ErrorHandler {
  static handleError(error, req, res) {
    let processedError = error;

    // Handle Sequelize errors
    if (error.name?.includes("Sequelize"))
      processedError = this.handleSequelizeError(error);

    // Handle JWT errors
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    )
      processedError = this.handleJwtError(error);

    // Handle validation errors
    if (error.name === "ValidationError")
      processedError = this.handleValidationError(error);

    // Handle environment errors
    if (
      error.name === "EnvironmentVariableError" ||
      error.code === "ENVIRONMENT_ERROR"
    )
      processedError = this.handleEnvironmentError(error);

    // Log error
    // soon ...

    // Send response
    this.sendErrorResponse(processedError, res);
  }

  static handleSequelizeError(error) {
    switch (error.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        return ValidationError.fromSequelize(error);

      case "SequelizeDatabaseError":
      case "SequelizeTimeoutError":
        return DatabaseError.fromSequelize(error);

      default:
        return new ApiError("Database operation failed", 500, {
          originalError: error.message,
        });
    }
  }

  static handleValidationError(error) {
    return new ValidationError(
      "Validation failed",
      400,
      error.details,
      "VALIDATION_ERROR"
    );
  }

  static handleEnvironmentError(error) {
    if (error.variableName)
      return EnvironmentVariableError.missingVariable(
        error.variableName,
        error.details
      );

    return new EnvironmentVariableError(error.message, null, error.details);
  }

  static sendErrorResponse(error, res) {
    const statusCode = error.statusCode || 500;
    const response = error.toJson
      ? error.toJson()
      : {
          success: false,
          message: error.message || "Internal Server Error",
          statusCode,
          ...(env.isDevelopment() && { stack: error.stack }),
        };

    res.status(statusCode).json(response);
  }

  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default ErrorHandler;
