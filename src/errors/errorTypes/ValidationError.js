import { ApiError } from "../ApiError.js";
import { ERROR_CODES, HTTP_STATUS } from "../../utils/constants/Errors.js";

export class ValidationError extends ApiError {
  constructor(message = "Validation failed", details = null) {
    super(message, HTTP_STATUS.BAD_REQUEST, details, ERROR_CODES.VALIDATION);
    this.name = "ValidationError";
  }

  static fromSequelize(sequelizeError) {
    const details = sequelizeError.errors?.map((error) => ({
      field: error.path,
      message: error.message,
      value: error.value,
    }));

    return new ValidationError("Database validation failed", details);
  }

  static fromJoi(JoiError) {
    const details = JoiError.details.map((error) => ({
      field: error.path.join("."),
      message: error.message,
      type: error.type,
    }));

    return new ValidationError("Input validation failed", details);
  }
}
