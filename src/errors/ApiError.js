import { AppError } from "./AppError.js";
import { ERROR_CODES, HTTP_STATUS } from "../utils/constants/Errors.js";

export class ApiError extends AppError {
  constructor(
    message = "Internal Server Error",
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    details = null,
    errorCode = ERROR_CODES.INTERNAL
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
      ERROR_CODES.BAD_REQUEST
    );
  }

  static forbidden(message = "Forbidden", details = null) {
    return new ApiError(
      message,
      HTTP_STATUS.FORBIDDEN,
      details,
      ERROR_CODES.FORBIDDEN
    );
  }

  static conflict(message = "Conflict", details = null) {
    return new ApiError(
      message,
      HTTP_STATUS.CONFLICT,
      details,
      ERROR_CODES.CONFLICT
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
