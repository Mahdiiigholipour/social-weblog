import { AppError } from "./AppError.js";
import { HTTP_STATUS } from "../utils/constants.js";

export class ApiError extends AppError {
  constructor(
    message = "Internal Server Error",
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    details = null,
    errorCode = "INTERNAL_ERROR"
  ) {
    super(message, statusCode, details);
    this.errorCode = errorCode;
  }

  static catch(message, error) {
    if (error.name === this.constructor.name) return error;

    return new AppError(message, 500, error);
  }

  static badRequest(message = "Bad Request", details = null) {
    return new ApiError(
      message,
      HTTP_STATUS.BAD_REQUEST,
      details,
      "BAD_REQUEST"
    );
  }

  static forbidden(message = "Forbidden", details = null) {
    return new ApiError(message, HTTP_STATUS.FORBIDDEN, details, "FORBIDDEN");
  }

  static notFound(message = "Resource not found", details = null) {
    return new ApiError(message, HTTP_STATUS.NOT_FOUND, details, "NOT_FOUND");
  }

  static conflict(message = "Conflict", details = null) {
    return new ApiError(message, HTTP_STATUS.CONFLICT, details, "CONFLICT");
  }

  static validation(message = "Validation failed", details = null) {
    return new ApiError(
      message,
      HTTP_STATUS.BAD_REQUEST,
      details,
      "VALIDATION_ERROR"
    );
  }

  toJson() {
    return {
      ...super.toJson(),
      errorCode: this.errorCode,
      success: false,
    };
  }
}
