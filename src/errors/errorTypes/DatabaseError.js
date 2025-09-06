import { HTTP_STATUS } from "../../utils/constants.js";
import { ApiError } from "../ApiError.js";

export class DatabaseError extends ApiError {
  constructor(message = "Database operation failed", details = null) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details,
      "DATABASE_ERROR"
    );
    this.name = "DatabaseError";
  }

  static fromSequelize(error) {
    return new DatabaseError("Database operation failed", {
      originalError: error.message,
    });
  }
}
